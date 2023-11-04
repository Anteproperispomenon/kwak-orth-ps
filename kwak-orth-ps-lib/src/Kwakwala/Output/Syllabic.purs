{-|
Module      : Kwakwala.Output.Syllabic
Description : Syllabic Output for Kwak'wala using Carrier Syllabics.
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This module is based on an experimental
-- | syllabic/abugida orthography that uses
-- | Carrier syllabics as the basis. Carrier
-- | was chosen owing to the large amount of
-- | overlap in phonemes.
-- | 
-- | Note that since syllabics requires that
-- | multiple phonemes be encoded in a single
-- | grapheme, it cannot be implemented as
-- | simply as other orthographies for output.
-- | Instead, it is implemented as a `Parser`
-- | over `CasedChar`s.
-- | 
-- | This also means that, unlike other
-- | emitters, the syllabic emitter can
-- | fail (at least in theory).


module Kwakwala.Output.Syllabic
  ( outputSyllabics
  , outputSyllabicsE
  ) where

import Prelude

import Kwakwala.Output.Syllabic.Tables (letterCoda, makeVowel, mergeLetters)

import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Foldable (foldr)

import Parsing (ParseError, Parser, ParserT, fail, initialPos, runParser)
import Parsing.Combinators as PC
import Parsing.Combinators ((<|>))
import Parsing.Token as PT

import Data.List (List, someRec)
-- import Data.List as List
-- import Data.List.NonEmpty (toList)

import Kwakwala.Types (CasedChar(..), KwakConsonant, KwakVowel)
import Kwakwala.Types.Tables (tryConsCC, tryVowelCC)

-- import Control.Monad
import Control.Monad.Trans.Class (lift)
import Control.Monad.State.Trans (StateT, evalStateT, get, put)

------------------------------------
-- Specialised Types

data KwakState
  = WordStart
  | AfterVowel
  | AfterLetter KwakConsonant
  | EndOfFile

derive instance  eqKwakState :: Eq  KwakState
derive instance ordKwakState :: Ord KwakState

type SyllabicEmitter a = StateT KwakState (Parser (List CasedChar)) a

runSyllabicEmitter :: forall a. (List CasedChar) -> (SyllabicEmitter a) -> (Either ParseError a)
runSyllabicEmitter chrs sem = runParser chrs (evalStateT sem WordStart)

liftEmit :: forall a. (Parser (List CasedChar) a) -> SyllabicEmitter a
liftEmit = lift

-- | Convert a list of `CasedChar`s into
-- | a `String` of syllables. Note that
-- | this will ignore case, as case
-- | works differently in syllabaics.
-- |
-- | If the emitter encounters an error,
-- | this will instead return a `ParseError`.
outputSyllabicsE :: (List CasedChar) -> Either ParseError String
outputSyllabicsE lst = runSyllabicEmitter lst emitSyllabics

-- | Convert a list of `CasedChar`s into
-- | a `String` of syllables. Note that
-- | this will ignore case, as case
-- | works differently in syllabaics.
-- |
-- | Also note that this will not give
-- | an error if the emitter can't 
-- | output the syllables.
outputSyllabics :: (List CasedChar) -> String
outputSyllabics lst = case (runSyllabicEmitter lst emitSyllabics) of
  (Left  pe) -> show pe
  (Right sy) -> sy

------------------------------------
-- Helper Functions

peek :: forall tok m. ParserT (List tok) m (Maybe tok)
peek = PC.lookAhead (PC.optionMaybe (PT.token (\_ -> initialPos)))

-- many1 :: forall m s a. ParserT s m a -> ParserT s m (List a)
-- many1 prs = toList <$> PC.many1 prs

many1 :: forall a. SyllabicEmitter a -> SyllabicEmitter (List a)
many1 = someRec

many1ThenFold :: forall a. (Semigroup a) => SyllabicEmitter a -> SyllabicEmitter a -> SyllabicEmitter a
many1ThenFold rpt fnl = do
  xs <- many1 rpt
  x  <- fnl
  pure $ foldr (<>) x xs

------------------------------------
-- More Specific Helper Functions

getPunct :: SyllabicEmitter String
getPunct = do
  rslt <- lift $ peek
  case rslt of
    Nothing -> lift $ fail "Can't get Punctuation; End of File."
    (Just (Punct str)) -> do
      void $ lift $ PT.token (\_ -> initialPos)
      pure str
    _ -> lift $ fail "Expected Punctuation; got Letter."

-- | Checks if the next element is a vowel,
-- | and if so, consumes it. This does not
-- | alter the state of the emitter at all;
-- | this is just a lower-level helper.
getVowel :: SyllabicEmitter KwakVowel
getVowel = do
  rslt <- lift $ peek
  case rslt of
    Nothing -> lift $ fail "Can't get vowel; End of File."
    (Just x) -> case (tryVowelCC x) of
      Nothing -> lift $ fail "Next character is not a vowel."
      (Just v) -> do
        void $ lift $ PT.token (\_ -> initialPos)
        pure v

-- | Checks if the next element is a consonant,
-- | and if so, consumes it. This does not
-- | alter the state of the emitter at all;
-- | this is just a lower-level helper.
getCons :: SyllabicEmitter KwakConsonant
getCons = do
  rslt <- lift $ peek
  case rslt of
    Nothing -> lift $ fail "Can't get Consonant; End of File."
    (Just x) -> case (tryConsCC x) of
      Nothing -> lift $ fail "Next character is not a consonant."
      (Just c) -> do
        void $ lift $ PT.token (\_ -> initialPos)
        pure c

------------------------------------
-- Actual Parsers/Emitters

emitSyllabics :: SyllabicEmitter String
emitSyllabics = many1ThenFold emitSyllabic parseEOF
-- emitSyllabics = fold <$> many1 emitSyllabic

emitSyllabic :: SyllabicEmitter String
emitSyllabic
  = parseCons
    <|> parseVowel
    <|> parsePuncts
    -- <|> parseEOF

parsePuncts :: SyllabicEmitter String
parsePuncts = do
  str <- getPunct
  st  <- get
  case st of
    WordStart  -> pure $ str
    AfterVowel -> do
      put $ WordStart
      pure $ str
    AfterLetter x -> do
      put $ WordStart
      pure $ (letterCoda x) <> str
    -- Shouldn't occur; for safety only
    EndOfFile -> do
      put $ WordStart
      pure $ str

parseVowel :: SyllabicEmitter String
parseVowel = do
  v <- getVowel
  c <- get
  case c of
    AfterVowel      -> pure $ makeVowel v
    (AfterLetter x) -> do
      put AfterVowel
      pure $ mergeLetters x v
    WordStart  -> do 
      put AfterVowel
      pure $ makeVowel v
    EndOfFile -> lift $ fail "Already reached End of File"

parseCons :: SyllabicEmitter String
parseCons = do
  c <- getCons
  s <- get
  case s of
    AfterVowel      -> put (AfterLetter c) $> ""
    WordStart       -> put (AfterLetter c) $> ""
    (AfterLetter x) -> put (AfterLetter c) $> (letterCoda x)
    EndOfFile       -> lift $ fail "Already reached End of File."

parseEOF :: SyllabicEmitter String
parseEOF = do
  liftEmit PT.eof
  st <- get
  case st of
    WordStart       -> put EndOfFile $> ""
    AfterVowel      -> put EndOfFile $> ""
    (AfterLetter x) -> put EndOfFile $> (letterCoda x)
    EndOfFile       -> lift $ fail "Already reached EOF."

-- The reason to have an EOF state is
-- to prevent a parser like `PC.many`
-- from successfully parsing the EOF
-- infinitely many times. This way,
-- it can only parse EOF once.