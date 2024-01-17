{-|
Module      : Kwakwala.Parsing.Helpers
Description : Various helper functions for PureScript parsing
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | Some helper functions for Parsing in PureScript.

module Kwakwala.Parsing.Helpers
  ( codePoint
  , codePoint'
  , codePointC
  , eqCP
  , isUpperC
  , liftP
  , parsePipe
  , peek
  , peekChar
  , peekChar'
  , peekCode
  , satisfyC
  , satisfyMaybe
  , consumeMin
  , consumeMaj
  , continueMin
  , continueMaj
  )
  where

import Prelude

import Control.Apply (lift2)
import Control.Monad.Rec.Class (class MonadRec)
import Data.Maybe (Maybe(..), maybe)
import Parsing.Combinators (lookAhead)

import Control.Alt ((<|>))
import Data.CodePoint.Unicode as Uni
import Data.String.CodePoints (codePointFromChar, CodePoint, singleton)
import Parsing (Parser, ParserT)
import Parsing.String (anyChar, satisfy, eof, satisfyCodePoint, anyCodePoint)
import Parsing.String.Basic as Basic

import Kwakwala.Types (CasedChar(..), CasedLetter(..), KwakLetter)


-- | Peek ahead at the next character.
-- | Returns `Nothing` if at EOF.
peek :: forall m. MonadRec m => ParserT String m (Maybe Char)
peek = (Just <$> lookAhead anyChar) <|> (eof $> Nothing)

-- | Synonym for `peek`.
peekChar :: forall m. MonadRec m => ParserT String m (Maybe Char)
peekChar = peek

peekChar' :: forall m. ParserT String m Char
peekChar' = lookAhead anyChar

-- | Like `peek`, but returns a `CodePoint`
-- | rather than a `Char`.
peekCode :: forall m. MonadRec m => ParserT String m (Maybe CodePoint)
peekCode = (Just <$> lookAhead anyCodePoint) <|> (eof $> Nothing)

-- | Check whether a `Char`'s `CodePoint`
-- | is considered upper-case.
isUpperC :: Char -> Boolean
isUpperC c = Uni.isUpper (codePointFromChar c)

-- takeWhile1 :: forall m. (Char -> Boolean) -> ParserT String m String
-- takeWhile1 p = Basic.takeWhile1 (p <<< codePointFromChar)

-- | For Parsing 'Escaped' Text.
parsePipe :: Parser String CasedChar
parsePipe = Punct <$> ((codePointC '|') `comb1` (Basic.takeWhile1 (\x -> notEq x pip)) `comb2` (codePointC '|'))
    where comb1 = lift2 (consC)
          comb2 = lift2 (snocC)
          pip = codePointFromChar '|'

-- | Consume a character if the next character
-- | satisfies a predicate.
satisfyMaybe :: (Char -> Boolean) -> Parser String (Maybe Char)
satisfyMaybe p = (fx <$> peekChar) >>= (maybe (pure Nothing) (\x -> anyChar $> Just x))
    where fx Nothing  = Nothing
          fx (Just x) = if (p x) then (Just x) else Nothing


-- | Lift a predicate over a maybe.
liftP :: forall a. (a -> Boolean) -> (Maybe a) -> Boolean
liftP _ Nothing  = false
liftP p (Just x) = p x

-- | Like `char`, but for `CodePoint`s.
codePoint :: forall m. CodePoint -> ParserT String m CodePoint
codePoint cp = satisfyCodePoint (eq cp)

-- | Like `codePoint`, but uses a `Char` as input,
-- | which is much easier when using literals.
codePoint' :: forall m. Char -> ParserT String m CodePoint
codePoint' c = satisfyCodePoint (\x -> eq (codePointFromChar c) x)

-- | Like `codePoint`, but uses a `Char` as input,
-- | which is much easier when using literals.
-- | This is the same as `codePoint'`, but won't
-- | cause lexing errors in the IDE. e.g.
-- |
-- | ```purescript
-- | codePoint' 'x' ...
-- | ```
-- |
-- | Can be incorrectly parsed as
-- |
-- | ```purescript
-- | codePoint ' ' x'
-- | ```
codePointC :: forall m. Char -> ParserT String m CodePoint
codePointC c = satisfyCodePoint (\x -> eq (codePointFromChar c) x)

-- | Like `satisfyCodePoint`, but the predicate
-- | is over `Char`s rather than `CodePoint`s.
satisfyC :: forall m. (Char -> Boolean) -> ParserT String m CodePoint
satisfyC p = codePointFromChar <$> satisfy p

-- | Add a `CodePoint` to the start of a `String`.
consC :: CodePoint -> String -> String
consC c str = (singleton c) <> str

-- | Add a `CodePoint` to the end of a `String`.
snocC :: String -> CodePoint -> String
snocC str c = str <> (singleton c)

-- | Check whether a `CodePoint` is equal
-- | to a given `Char`. Meant for higher
-- | level usage, e.g.
-- |
-- | ```purescript
-- | satisfyCodePoint (eqCP 'h' || eqCP 'j')
-- | ```
eqCP :: Char -> CodePoint -> Boolean
eqCP chr cp = (codePointFromChar chr) == cp

-- Helpers for the new style of choosing a sub-parser.
-- All of these assume that the user has already run
-- `peekChar` or `peekChar'` and has found a matching
-- output/parser.

-- | Consume the next character and output
-- | a lower-case letter.
consumeMin :: KwakLetter -> Parser String CasedLetter
consumeMin kl = anyChar *> (pure $ Min kl)

-- | Consume the next character and output
-- | a upper-case letter
consumeMaj :: KwakLetter -> Parser String CasedLetter
consumeMaj kl = anyChar *> (pure $ Maj kl)

-- | Consume the next character and continue
-- | with a parser that expects an `isUpper`
-- | value and a peeked `Char`. This version
-- | works if the consumed character is
-- | lower-case.
continueMin :: (Boolean -> Maybe Char -> Parser String CasedLetter) -> Parser String CasedLetter
continueMin prsr = anyChar *> (peekChar >>= (prsr false))

-- | Consume the next character and continue
-- | with a parser that expects an `isUpper`
-- | value and a peeked `Char`. This version
-- | works if the consumed character is
-- | upper-case.
continueMaj :: (Boolean -> Maybe Char -> Parser String CasedLetter) -> Parser String CasedLetter
continueMaj prsr = anyChar *> (peekChar >>= (prsr true))