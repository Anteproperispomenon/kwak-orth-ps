{-|
Module      : Kwakwala.Parsing.Arabic
Description : Parser for the Experimental Kwak'wala Arabic Orthography
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This is the module for parsing the experimental
-- | use of the Arabic Script to represent Kwak'wala.


module Kwakwala.Parsing.Arabic
    -- * Basic Parsers
    ( parseArabicWord
    , parseArabicWords
    , encodeFromArabicWords
    , parseTheLetter'
    , parseTheLetterAlt
    , parseTheLetter''
    ) where

import Prelude
import Parsing (Parser, runParser, fail)
import Parsing.String (char, anyChar, satisfy)
import Parsing.String.Basic (takeWhile1)
import Parsing.Combinators (many1, choice, many, try)

import Control.Alt ((<|>))

import Data.List (List(Nil, Cons), (:), concat, singleton)
import Data.List as List
import Data.List.NonEmpty (toList)
import Data.Either (fromRight)
import Data.Foldable (fold)
import Data.Maybe (Maybe(..))

import Data.String.CodePoints (CodePoint, codePointFromChar)
import Data.String.CodePoints as CP
import Data.String as String
import Data.CodePoint.Unicode (isAlpha)
-- import Data.List.Types (toList)

import Kwakwala.Parsing.Helpers (eqCP, isUpperC, liftP, parsePipe, peekChar, peekChar')
import Kwakwala.Types 
  ( CasedChar(..)
  , CasedLetter(..)
  , CasedWord(..)
  , KwakLetter(..)
  , isKwkVow'
  , makeCase
  , toWordsL
  , toWordsR
  )

import Parsing.Chunking   (chunkifyText)
import Parsing.Chunkified (runParserChunk)

-- These aren't really necessary;
-- They're just extras.
-- Apostrophe/Ejective Marker
isHamzah :: Char -> Boolean
isHamzah '\x621' = true
isHamzah '\x654' = true
isHamzah '\x655' = true
isHamzah _ = false
-- will probably have to add more

-- Excluding the full hamzah
-- (Necessary for sonorants)
isHamzah' :: Char -> Boolean
isHamzah' '\x654' = true
isHamzah' '\x655' = true
isHamzah' _ = false

isHamzahCP :: CodePoint -> Boolean
isHamzahCP = (eqCP '\x621') || (eqCP '\x654') || (eqCP '\x655')

isHamzahCP' :: CodePoint -> Boolean
isHamzahCP' = (eqCP '\x654') || (eqCP '\x655')

{-
isApost'  :: Char -> Boolean
isApost'  '\'' = true
isApost'  '`'  = true
isApost'  '̕'  = true
isApost'  '\x313' = true
isApost'  '\x2bc' = true
isApost'  '7' = true -- Careful with this one.
isApost'  _ = false
-}

-- i.e. the Arabic short vowel u
isLabial :: Char -> Boolean
isLabial '\x64f' = true
isLabial  _  = false

isW :: Char -> Boolean
isW = isLabial

-- To allow for more possibilities
-- Note: this is only for the 'h'
-- that is used as a modifier. It
-- is NOT used for the /h/ phoneme.
isH :: Char -> Boolean
isH 'h' = true
isH 'H' = true
isH  _  = false

---------------------------------------------------------------
-- Parsing K

-- Note: Copied from the Grubb version,
-- so that's what some of the names are
-- based on.

parseK' :: (Maybe Char) -> Parser String KwakLetter
parseK' Nothing = pure K
parseK' (Just x)
    | isHamzah' x = anyChar *> peekChar >>= parseKY
    | isW       x = anyChar *> peekChar >>= parseKW
    | otherwise   = pure K

parseKH :: (Maybe Char) -> Parser String KwakLetter
parseKH Nothing = pure Q
parseKH (Just x)
    | isHamzah' x = anyChar *> peekChar >>= parseKHY
    | isW       x = anyChar *> peekChar >>= parseKHW
    | otherwise   = pure Q

parseKY :: Maybe Char -> Parser String KwakLetter
parseKY Nothing = pure KY
parseKY (Just x)
    | isW     x = anyChar *> (pure KWY)
    | otherwise = pure KY

parseKHY :: (Maybe Char) -> Parser String KwakLetter
parseKHY Nothing = pure QY
parseKHY (Just x)
    | isW     x = anyChar *> (pure QWY)
    | otherwise = pure QY

parseKW :: Maybe Char -> Parser String KwakLetter
parseKW Nothing = pure KW
parseKW (Just x)
    | isHamzah' x = anyChar *> (pure KWY)
    | otherwise   = pure KW

parseKHW :: Maybe Char -> Parser String KwakLetter
parseKHW Nothing = pure KW
parseKHW (Just x)
    | isHamzah x = anyChar *> (pure QWY)
    | otherwise  = pure QW

parseG' :: (Maybe Char) -> Parser String KwakLetter
parseG' Nothing = pure G
parseG' (Just x)
    | isW     x = anyChar *> pure GW -- anyChar *> peekChar >>= parseGW
    | otherwise = pure G

parseGH :: (Maybe Char) -> Parser String KwakLetter
parseGH Nothing = pure GU
parseGH (Just x)
    | isW     x = anyChar *> (pure GUW)
    | otherwise = pure GU

{-
parseGW :: (Maybe Char) -> Parser String KwakLetter
parseGW Nothing = pure GW
parseGW (Just x)
    | isH     x = anyChar *> (pure GUW)
    | otherwise = pure GW
-}

---------------------------------------------------------------
-- Parsing X

parseX' :: (Maybe Char) -> Parser String KwakLetter
parseX' Nothing = pure X
parseX' (Just x)
    | isW     x = anyChar *> pure XW  -- (pure XW) -- peekChar >>= parseXW
    | otherwise = pure X

parseXU' :: Maybe Char -> Parser String KwakLetter
parseXU' Nothing = pure XU
parseXU' (Just x)
    | isW     x = anyChar *> (pure XUW)
    | otherwise = pure XU


---------------------------------------------------------------
-- Parsing P, T, C, and S  

parseP' :: Maybe Char -> Parser String KwakLetter
parseP' Nothing = pure P
parseP' (Just x)
    | isHamzah' x = anyChar *> (pure PY)
    | otherwise   = pure P

parseT' :: Maybe Char -> Parser String KwakLetter
parseT' Nothing = pure T
parseT' (Just x)
    -- | isApost x              = anyChar *> peekChar >>= parseTY -- (pure TY)
    | isHamzah' x = anyChar *> (pure TY)
    -- | (x == 's' || x == 'S') = anyChar *> peekChar >>= parseTS
    -- | (x == 'l' || x == 'L') = anyChar *> peekChar >>= parseTL
    | otherwise              = pure T

parseTS :: Maybe Char -> Parser String KwakLetter
parseTS Nothing = pure TS
parseTS (Just x)
    | isHamzah' x = anyChar *> (pure TSY)
    | otherwise   = pure TS

parseTL :: Maybe Char -> Parser String KwakLetter
parseTL Nothing = pure TL
parseTL (Just x)
    | isHamzah' x = anyChar *> (pure TLY)
    | otherwise   = pure TL

parseTY :: Maybe Char -> Parser String KwakLetter
parseTY Nothing = pure TY
parseTY (Just x)
    | (x == 's' || x == 'S') = anyChar *> (pure TSY)
    | (x == 'l' || x == 'L') = anyChar *> (pure TLY)
    | otherwise              = pure TY

-----------------------
-- Entry Point
-- (Equivalent to Ts)
parseC :: Parser String KwakLetter
parseC = do
  void $ satisfy (\x -> x == 'c' || x == 'C')
  peekChar >>= parseTS
  

---------------------------------------------------------------
-- Parsing M and N

parseM' :: Maybe Char -> Parser String KwakLetter
parseM' Nothing = pure M
parseM' (Just x)
    | isHamzah' x = anyChar *> (pure MY)
    | otherwise   = pure M

-- Version that doesn't accept
-- "m'" as a parse.
parseMonly :: Parser String KwakLetter
parseMonly = do
  void $ satisfy (\x -> x == 'm' || x == 'M')
  pure M

parseN' :: Maybe Char -> Parser String KwakLetter
parseN' Nothing = pure N
parseN' (Just x)
    | isHamzah' x = anyChar *> (pure NY)
    | otherwise   = pure N

-- Version that doesn't accept
-- "n'" as a parse.
parseNonly :: Parser String KwakLetter
parseNonly = do
  void $ satisfy (\x -> x == 'n' || x == 'N')
  pure N

---------------------------------------------------------------
-- Parsing J/Y, L, LH, and W

parseJ' :: Maybe Char -> Parser String KwakLetter
parseJ' Nothing = pure J
parseJ' (Just x)
    | isHamzah' x = anyChar *> (pure JY)
    | otherwise   = pure J

-- Version that doesn't accept
-- "y'" as a parse.
parseJonly :: Parser String KwakLetter
parseJonly = do
  void $ satisfy (\x -> x == 'y' || x == 'Y')
  pure J

parseL' :: Maybe Char -> Parser String KwakLetter
parseL' Nothing = pure L
parseL' (Just x)
    | isHamzah' x = anyChar *> (pure LY)
    | otherwise   = pure L

-- Version that doesn't accept
-- "l'" as a parse.
parseLonly :: Parser String KwakLetter
parseLonly = do
  void $ satisfy (\x -> x == 'l' || x == 'L')
  peekChar >>= parseLonly'

parseLonly' :: Maybe Char -> Parser String KwakLetter
parseLonly' Nothing = pure L
parseLonly' (Just x)
    | isH     x = anyChar *> (pure LH)
    | otherwise = pure L


parseW' :: Maybe Char -> Parser String KwakLetter
parseW' Nothing = pure W
parseW' (Just x)
    | isHamzah' x = anyChar *> (pure WY)
    | otherwise   = pure W

-- Version that doesn't accept
-- "w'" as a parse.
parseWonly :: Parser String KwakLetter
parseWonly = do
  void $ satisfy (\x -> x == 'w' || x == 'W')
  pure W

{-
-- Taken from U'mista parser, again
parseY :: Parser String KwakLetter
parseY = satisfy isHamzah *> peekChar >>= parseY'


parseY' :: (Maybe Char) -> Parser String KwakLetter
parseY' Nothing = pure (Min Y)
parseY' (Just x)
    | (x == 'm' || x == 'M') = anyChar *> (pure $ makeCase (isUpperC x) MY)
    | (x == 'n' || x == 'N') = anyChar *> (pure $ makeCase (isUpperC x) NY)
    | (x == 'y' || x == 'Y') = anyChar *> (pure $ makeCase (isUpperC x) JY)
    | (x == 'w' || x == 'W') = anyChar *> (pure $ makeCase (isUpperC x) WY)
    | (x == 'l' || x == 'L') = choice
        -- If the following character is an H, it should
        -- be interpretted as Y + LH, not LY + H.
        [ do
            void anyChar 
            y <- peekChar
            when (liftP isH y) (fail "\"'lh\" error")
            pure $ makeCase (isUpperC x) LY
        , (pure $ makeCase (isUpperC x) Y) -- i.e. interpret it as glottal stop + LH.
        ]
    | otherwise = pure Y -- i.e., the glottal stop takes on the case of the following letter
    where b = isUpperC x
-}

-- | Trying something different...
parseTheLetter :: Char -> Parser String (List KwakLetter)
parseTheLetter c =
  case c of
    -- Vowels
    '\x627' -> parseAlif
    '\x623' -> parseAlifHamzah
    '\x625' -> parseAlifHamzah
    
    '\x649' -> parseYeh
    '\x64a' -> parseYeh
    '\x649' -> parseYeh
    '\x6d2' -> parseYeh
    '\x626' -> parseYehHamzah
    '\x678' -> parseYehHamzah
    '\x6d3' -> parseYehHamzah
    '\x6ce' -> parseYehWedge

    '\x648' -> parseWaw
    '\x624' -> parseWawHamzah
    '\x676' -> parseWawHamzah
    '\x6c6' -> parseWawWedge
    '\x6c9' -> parseWawWedge
    '\x6cf' -> parseWawWedge

    -- Consonants
    '\x645' -> singleton <$> (peekChar >>= parseM')
    '\x646' -> singleton <$> (peekChar >>= parseN')
    '\x67e' -> singleton <$> (peekChar >>= parseP')
    '\x62a' -> singleton <$> (peekChar >>= parseT')
    '\x628' -> pure $ singleton B
    '\x62f' -> pure $ singleton D

    -- TS
    '\x684' -> singleton <$> (peekChar >>= parseTS)
    '\x62b' -> singleton <$> (peekChar >>= parseTS)

    '\x686' -> singleton <$> (peekChar >>= parseTL)
    '\x62c' -> pure $ singleton DZ
    '\x685' -> pure $ singleton DL
    '\x633' -> pure $ singleton S

    -- LH
    '\x634' -> pure $ singleton LH
    '\x631' -> pure $ singleton LH
    '\x6b5' -> pure $ singleton LH

    '\x644' -> singleton <$> (peekChar >>= parseL')

    -- K
    '\x643' -> singleton <$> (peekChar >>= parseK')
    '\x642' -> singleton <$> (peekChar >>= parseKH)

    -- G
    '\x6a7' -> singleton <$> (peekChar >>= parseG')
    '\x6ac' -> singleton <$> (peekChar >>= parseG')

    -- GU
    '\x63a' -> singleton <$> (peekChar >>= parseGH)
    '\x6a8' -> singleton <$> (peekChar >>= parseGH)

    -- X
    '\x62e' -> singleton <$> (peekChar >>= parseX')
    '\x62d' -> singleton <$> (peekChar >>= parseXU')

    -- H
    '\x647' -> pure $ singleton H

    -- Glottal Stop
    '\x621' -> pure $ singleton Y


    -- Others
    '\x640' -> pure Nil -- line extender
    _ -> fail "Not a workable character."

-- | Alternate version
parseTheLetterAlt :: Parser String (List KwakLetter)
parseTheLetterAlt = do
  c <- peekChar'
  case c of
    -- Vowels
    '\x627' -> anyChar *> parseAlif
    '\x623' -> anyChar *> parseAlifHamzah
    '\x625' -> anyChar *> parseAlifHamzah
    '\x649' -> anyChar *> parseYeh
    '\x64a' -> anyChar *> parseYeh
    '\x649' -> anyChar *> parseYeh
    '\x6d2' -> anyChar *> parseYeh
    '\x626' -> anyChar *> parseYehHamzah
    '\x678' -> anyChar *> parseYehHamzah
    '\x6d3' -> anyChar *> parseYehHamzah
    '\x6ce' -> anyChar *> parseYehWedge
    '\x648' -> anyChar *> parseWaw
    '\x624' -> anyChar *> parseWawHamzah
    '\x676' -> anyChar *> parseWawHamzah
    '\x6c6' -> anyChar *> parseWawWedge
    '\x6c9' -> anyChar *> parseWawWedge
    '\x6cf' -> anyChar *> parseWawWedge

    -- Consonants
    '\x645' -> anyChar *> (singleton <$> (peekChar >>= parseM'))
    '\x646' -> anyChar *> (singleton <$> (peekChar >>= parseN'))
    '\x67e' -> anyChar *> (singleton <$> (peekChar >>= parseP'))
    '\x62a' -> anyChar *> (singleton <$> (peekChar >>= parseT'))
    '\x628' -> anyChar *> (pure $ singleton B)
    '\x62f' -> anyChar *> (pure $ singleton D)
    -- TS
    '\x684' -> anyChar *> (singleton <$> (peekChar >>= parseTS))
    '\x62b' -> anyChar *> (singleton <$> (peekChar >>= parseTS))
    '\x686' -> anyChar *> (singleton <$> (peekChar >>= parseTL))
    '\x62c' -> anyChar *> (pure $ singleton DZ)
    '\x685' -> anyChar *> (pure $ singleton DL)
    '\x633' -> anyChar *> (pure $ singleton S)
    -- LH
    '\x634' -> anyChar *> (pure $ singleton LH)
    '\x631' -> anyChar *> (pure $ singleton LH)
    '\x6b5' -> anyChar *> (pure $ singleton LH)
    '\x644' -> anyChar *> (singleton <$> (peekChar >>= parseL'))

    -- K
    '\x643' -> anyChar *> (singleton <$> (peekChar >>= parseK'))
    '\x642' -> anyChar *> (singleton <$> (peekChar >>= parseKH))

    -- G
    '\x6a7' -> anyChar *> (singleton <$> (peekChar >>= parseG'))
    '\x6ac' -> anyChar *> (singleton <$> (peekChar >>= parseG'))

    -- GU
    '\x63a' -> anyChar *> (singleton <$> (peekChar >>= parseGH))
    '\x6a8' -> anyChar *> (singleton <$> (peekChar >>= parseGH))

    -- X
    '\x62e' -> anyChar *> (singleton <$> (peekChar >>= parseX'))
    '\x62d' -> anyChar *> (singleton <$> (peekChar >>= parseXU'))

    -- H
    '\x647' -> anyChar *> (pure $ singleton H)

    -- Glottal Stop
    '\x621' -> anyChar *> (pure $ singleton Y)

    -- Others
    '\x640' -> anyChar *> pure Nil -- line extender
    _ -> fail "Not a workable character."

parseTheLetter' :: Parser String (List CasedLetter)
parseTheLetter' = try $ do
  x <- anyChar
  c <- parseTheLetter x
  pure $ map Min c

parseTheLetter'' :: Parser String (List CasedLetter)
parseTheLetter'' = do
  c <- parseTheLetterAlt
  pure $ map Min c

fixArabicWord :: CasedWord -> CasedWord
fixArabicWord (PunctW x) = PunctW x
fixArabicWord orig@(KwakW Nil) = orig
fixArabicWord orig@(KwakW wd@(Cons x _rst))
  | isKwkVow' x = KwakW (Cons (Min Y) wd)
  | otherwise   = orig


parseArabicWord :: Parser String CasedWord
parseArabicWord 
  = (fixArabicWord <<< KwakW <<< fold <<< toList <$> many1 parseTheLetter'')
    <|> parseOutsideArabic
    <|> (PunctW <<< CP.singleton <<< codePointFromChar <$> anyChar)

parseArabicWords :: Parser String (List CasedWord)
parseArabicWords = many parseArabicWord

parseOutsideArabic :: Parser String CasedWord
parseOutsideArabic 
  = PunctW <$> takeWhile1 (\c -> not (arabicRange c))

encodeFromArabicWords :: String -> List CasedWord
encodeFromArabicWords txt = fromRight Nil $ runParser txt parseArabicWords

arabicRange :: CodePoint -> Boolean
arabicRange cp = (c1 <= cp) && (cp <= c2)
  where 
    c1 = codePointFromChar '\x600'
    c2 = codePointFromChar '\x6ff'


parseAlif :: Parser String (List KwakLetter)
parseAlif = do
  c <- peekChar 
  case c of
    (Just '\x654') -> anyChar *> parseAlifHamzah
    (Just '\x655') -> anyChar *> parseAlifHamzah
    
    (Just '\x64e') -> anyChar *> (pure $ singleton A)
    (Just '\x64f') -> anyChar *> parseWawWedge
    (Just '\x650') -> anyChar *> parseYehWedge

    _ -> pure $ singleton AU

parseAlifHamzah :: Parser String (List KwakLetter)
parseAlifHamzah = do
  c <- peekChar
  case c of
    (Just '\x64e') -> anyChar *> (pure $ Y : A : Nil)
    (Just '\x64f') -> anyChar *> (pure $ Y : O : Nil)
    (Just '\x650') -> anyChar *> (pure $ Y : E : Nil)
    _ -> pure $ Y : AU : Nil

parseYeh :: Parser String (List KwakLetter)
parseYeh = do
  c <- peekChar
  case c of
    (Just '\x652') -> anyChar *> (singleton <$> (peekChar >>= parseJ'))
    (Just '\x654') -> anyChar *> parseYehHamzah
    (Just '\x655') -> anyChar *> parseYehHamzah
    -- (Just '\x')
    _ -> pure $ I : Nil

parseYehHamzah :: Parser String (List KwakLetter)
parseYehHamzah = do
  c <- peekChar
  case c of
    (Just '\x652') -> anyChar *> pure (JY : Nil)
    -- (Just '\x') -> anyChar *> 
    _ -> pure $ Y : I : Nil

parseYehWedge :: Parser String (List KwakLetter)
parseYehWedge = do
  c <- peekChar
  case c of
    (Just '\x654') -> anyChar *> pure (Y : E : Nil)
    (Just '\x655') -> anyChar *> pure (Y : E : Nil)
    _ -> pure $ E : Nil

parseWaw :: Parser String (List KwakLetter)
parseWaw = do
  c <- peekChar
  case c of
    (Just '\x654') -> anyChar *> parseWawHamzah
    (Just '\x655') -> anyChar *> parseWawHamzah
    (Just '\x652') -> anyChar *> (singleton <$> (peekChar >>= parseW'))
    _ -> pure $ U : Nil

parseWawHamzah :: Parser String (List KwakLetter)
parseWawHamzah = do
  c <- peekChar
  case c of
    (Just '\x652') -> anyChar *> pure (WY : Nil)
    _ -> pure $ Y : U : Nil

parseWawWedge :: Parser String (List KwakLetter)
parseWawWedge = do
  c <- peekChar
  case c of
    (Just '\x654') -> anyChar *> pure (Y : O : Nil)
    (Just '\x655') -> anyChar *> pure (Y : O : Nil)
    _ -> pure $ O : Nil
