{-|
Module      : Kwakwala.Parsers.Boas
Description : Parser for texts written in Boas's orthographies.
Copyright   : (c) David Wilson, 2022
License     : BSD-3

-}

-- | This module has parsers that should cover
-- | most orthographies that Franz Boas has used.
-- | Since Boas's orthography isn't as phonemic
-- | as most other orthographies, it has more
-- | characters than others. This makes it more
-- | difficult to convert to Boas than converting
-- | from Boas.

module Kwakwala.Parsing.Boas
    ( encodeFromBoas
    , encodeFromBoasChunk
    , encodeFromBoasChunk'
    , encodeFromBoasWordsL
    , encodeFromBoasWordsR
    , parseBoas
    ) where

import Prelude

import Data.CodePoint.Unicode (isAlpha)
import Data.Maybe (Maybe(..), maybe)
import Kwakwala.Parsing.Helpers (eqCP, isUpperC, parsePipe, peekChar, satisfyMaybe)
import Kwakwala.Types
  ( CasedChar(..)
  , CasedLetter(..)
  , CasedWord
  , KwakLetter(..)
  , isKwkVow'
  , isKwkVow''
  , makeCase
  , toWordsL
  , toWordsR
  )

import Control.Alt ((<|>))
import Data.Either (fromRight)
import Data.List (List(Nil, Cons), (:), concat)
-- import Data.List as List
import Data.List.Types (toList)
import Data.String.CodePoints (CodePoint, codePointFromChar, singleton)
import Parsing (Parser, runParser)
import Parsing.Combinators (many1, choice, many)
import Parsing.String (anyChar, anyCodePoint, char, satisfy)
import Parsing.String.Basic (takeWhile1)

import Parsing.Chunking   (chunkifyText)
import Parsing.Chunkified (runParserChunk)

-------------------------------------------
-- Helper Functions

-- ʟ

-- Umlaut (or double line)
isUmlaut :: Char -> Boolean
isUmlaut '\x308' = true
isUmlaut '\x30e' = true -- double line above
isUmlaut '\x30b' = true -- double accute accent
isUmlaut '\x30f' = true -- double grave accent
isUmlaut _       = false

isUmlautCP :: CodePoint -> Boolean
isUmlautCP = (eqCP '\x308') || (eqCP '\x30e') || (eqCP '\x30b') || (eqCP '\x30f')

-- see also:
-- 0x2f5 (modifier letter middle double grave)
-- 0x2f6 (modifier letter middle double acute)

isDotBelow :: Char -> Boolean
isDotBelow '\x323' = true
isDotBelow _       = false

isDotBelowCP :: CodePoint -> Boolean
isDotBelowCP = eqCP '\x323'

isDotAfter :: Char -> Boolean
isDotAfter '\x0b7'  = true
isDotAfter '\x2d9'  = true -- dot above
isDotAfter '\x358'  = true -- combining dot above right
isDotAfter '\x18df' = true -- Canadian syllabics raised dot
isDotAfter '\x2022' = true -- bullet
isDotAfter '\x22c5' = true -- dot operator
isDotAfter _        = false

isCircumflex :: Char -> Boolean
isCircumflex '\x302' = true
isCircumflex _       = false

isGlottal :: Char -> Boolean
isGlottal '\x1d4b' = true -- ᵋ (modifier 'open e' (epsilon))
isGlottal '\x3b5'  = true -- ε (plain epsilon)
isGlottal _        = false

isLabial :: Char -> Boolean
isLabial '\x1d58' = true -- ᵘ (modifier u)
isLabial 'w'      = true
isLabial _        = false

isW :: Char -> Boolean
isW = isLabial

isEject :: Char -> Boolean
isEject = (_ == '!')

isEjectCP :: CodePoint -> Boolean
isEjectCP = eqCP '!'

-------------------------------------------
-- Final Parsers

-- Handles start of words,
-- where glottal stops aren't notated
-- (Taken from Umista Parser)
parseBoasWord :: Parser String (List CasedLetter)
parseBoasWord = parseBoasLetter >>= parseBoasWord'

parseBoasWord' :: CasedLetter -> Parser String (List CasedLetter)
parseBoasWord' ltr
    | (isKwkVow' ltr) = ((caseOf ltr Y : ltr : Nil) <> _) <$> many parseBoasLetter
    | otherwise       = (ltr:_)                  <$> many parseBoasLetter

caseOf :: CasedLetter -> KwakLetter -> CasedLetter
caseOf (Maj _) = Maj
caseOf (Min _) = Min

parseBoasLetter :: Parser String CasedLetter
parseBoasLetter = choice 
  [parseA,parseE,parseI,parseO,parseU,parseAU
  ,parseY,parseTL
  ,parseQ
  ,parseK,parseG,parseX
  ,parseP,parseT,parseM,parseN
  ,parseL,parseW,parseY,parseB,parseH
  ,parseD,parseLH,parseJ,parseS
  ,parseZ
  ]

-- These next 5 functions are all from
-- the Umista parser
parsePuncts :: Parser String CasedChar
parsePuncts = Punct <$> takeWhile1 (\x -> (x /= pip && (not $ isAlpha x))) -- (not . isAlpha)
  where pip = codePointFromChar '|'

parseBoasChar :: Parser String CasedChar
parseBoasChar = (Kwak <$> parseBoasLetter) <|> parsePipe <|> parsePuncts <|> (Punct <$> singleton <$> anyCodePoint)

parseBoasMain :: Parser String (List CasedChar)
parseBoasMain = (map Kwak <$> parseBoasWord) <|> ((_:Nil) <$> parsePipe) <|> ((_:Nil) <$> parsePuncts) <|> ((_:Nil) <$> Punct <$> singleton <$> anyCodePoint)

-- | Parser for Boas orthographies for Kwak'wala.
-- | Use this together with `runParser` or similar
-- | functions if you want error messages.
parseBoas :: Parser String (List CasedChar)
parseBoas = concat <<< toList <$> many1 parseBoasMain

-- | Direct encoder for Boas's othographies.
-- | Note that if the parser runs into any errors,
-- | this just pures an empty list. If you want
-- | error messages, use `parseBoas`.
encodeFromBoas :: String -> (List CasedChar)
encodeFromBoas txt = fixVowels $ fromRight Nil $ runParser txt parseBoas

-- | Direct encoder for Boas's othographies.
-- | Variant of `encodeFromBoas` that uses
-- | chunks to (hopefully) reduce stack
-- | usage.
encodeFromBoasChunk :: String -> List CasedChar
encodeFromBoasChunk txt = fromRight Nil $ runParserChunk (chunkifyText 512 256 txt) (fixVowels <$> parseBoas)

-- | Direct encoder for Boas's othographies.
-- | Variant of `encodeFromBoas` that uses
-- | chunks to (hopefully) reduce stack
-- | usage.
encodeFromBoasChunk' :: String -> List CasedChar
encodeFromBoasChunk' txt = fixVowels $ fromRight Nil $ runParserChunk (chunkifyText 512 256 txt) parseBoas

-- | Direct encoder for Boas's othographies.
-- | Variant of `encodeFromBoas` that uses
-- | chunks and `CasedWord`s to (hopefully)
-- | reduce stack usage.
encodeFromBoasWordsL :: String -> List CasedWord
encodeFromBoasWordsL txt = fromRight Nil $ runParserChunk (chunkifyText 512 256 txt) (toWordsL <<< fixVowels <$> parseBoas)

-- | Direct encoder for Boas's othographies.
-- | Variant of `encodeFromBoas` that uses
-- | chunks and `CasedWord`s to (hopefully)
-- | reduce stack usage.
encodeFromBoasWordsR :: String -> List CasedWord
encodeFromBoasWordsR txt = fromRight Nil $ runParserChunk (chunkifyText 512 256 txt) (toWordsR <<< fixVowels <$> parseBoas)

-- Adds a glottal stop between vowels
fixVowels :: (List CasedChar) -> (List CasedChar)
fixVowels Nil = Nil
fixVowels (Cons x Nil) = (Cons x Nil)
fixVowels (x:y:xs)
    | (isKwkVow'' x && isKwkVow'' y) = (x:(Kwak(Min Y)):(fixVowels (y:xs)) )
    | otherwise                      = (x:(fixVowels (y:xs)))

-------------------------------------------
-- Main Parsers

---------------------------
-- Simple Plosives

parseB :: Parser String CasedLetter
parseB = (char 'b' $> Min B) <|> (char 'B' $> Maj B)

parseP :: Parser String CasedLetter
parseP = do
  b <- isUpperC <$> satisfy (\x -> x == 'p' || x == 'P')
  z <- satisfyMaybe isEject
  maybe (pure $ makeCase b P) (const $ pure $ makeCase b PY) z

---------------------------
-- Plain Sonorants (and fricatives)

parseL :: Parser String CasedLetter
parseL = (char 'l' $> Min L) <|> (char 'L' $> Maj L)

parseW :: Parser String CasedLetter
parseW = (char 'w' $> Min W) <|> (char 'W' $> Maj W)

parseM :: Parser String CasedLetter
parseM = (char 'm' $> Min M) <|> (char 'M' $> Maj M)

parseN :: Parser String CasedLetter
parseN = (char 'n' $> Min N) <|> (char 'N' $> Maj N)

parseJ :: Parser String CasedLetter
parseJ = (char 'y' $> Min J) <|> (char 'Y' $> Maj J)

parseS :: Parser String CasedLetter
parseS = (char 's' $> Min S) <|> (char 'S' $> Maj S)

parseH :: Parser String CasedLetter
parseH = (char 'h' $> Min H) <|> (char 'H' $> Maj H)

-- ł
parseLH :: Parser String CasedLetter
parseLH = (char 'ł' $> Min LH) <|> (char 'Ł' $> Maj LH)

---------------------------
-- D etc...

parseD :: Parser String CasedLetter
parseD = do
  b <- isUpperC <$> satisfy (\x -> x == 'd' || x == 'D')
  peekChar >>= parseD' b

parseD' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseD' b Nothing = pure $ makeCase b D
parseD' b (Just x)
    | (x == 'z' || x == 'Z') = anyChar $> (makeCase b DZ)
    | otherwise              = pure $ makeCase b D

parseZ :: Parser String CasedLetter
parseZ = (char 'z' $> Min DZ) <|> (char 'Z' $> Maj DZ)

---------------------------
-- T etc...

parseT :: Parser String CasedLetter
parseT = do
  b <- isUpperC <$> satisfy (\x -> x == 't' || x == 'T')
  peekChar >>= parseT' b

parseT' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseT' b Nothing = pure $ makeCase b T
parseT' b (Just x)
    | (x == 's' || x == 'S') = anyChar *> peekChar >>= parseTS b
    | (isEject x           ) = anyChar *> peekChar >>= parseTY b
    | otherwise              = pure $ makeCase b T

parseTS :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseTS b Nothing = pure $ makeCase b TS
parseTS b (Just x)
    | (isEject x) = anyChar $> (makeCase b TSY)
    | (otherwise) = pure $ makeCase b TS

parseTY :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseTY b Nothing = pure $ makeCase b TY
parseTY b (Just x)
    | (x == 's' || x == 'S') = anyChar $> (makeCase b TSY)
    | otherwise              = pure $ makeCase b TY

---------------------------
-- K etc...

parseK :: Parser String CasedLetter
parseK = do
  b <- isUpperC <$> satisfy (\x -> x == 'k' || x == 'K')
  peekChar >>= parseK' b

parseK' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseK' b Nothing = pure $ makeCase b K -- technically incorrect
parseK' b (Just x)
    | isLabial   x = anyChar *> peekChar >>= parseKW b -- incorrect only
    | isEject    x = anyChar *> peekChar >>= parseKE b
    | isDotAfter x = anyChar *> peekChar >>= parseKD b
    | otherwise    = pure $ makeCase b K -- technically incorrect

parseKD :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseKD b Nothing = pure $ makeCase b K
parseKD b (Just x)
    | isEject x = anyChar $> (makeCase b KY)
    | otherwise = pure $ makeCase b K

parseKE :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseKE b Nothing = pure $ makeCase b KY
parseKE b (Just x)
    | isLabial x = anyChar $> (makeCase b KWY)
    | otherwise  = pure $ makeCase b KY

parseKW :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseKW b Nothing = pure $ makeCase b KW
parseKW b (Just x)
    | isEject x = anyChar $> (makeCase b KWY)
    | otherwise = pure $ makeCase b KW

---------------------------
-- Q etc... (copied from K)

parseQ :: Parser String CasedLetter
parseQ = do
  b <- isUpperC <$> satisfy (\x -> x == 'q' || x == 'Q')
  peekChar >>= parseQ' b

parseQ' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseQ' b Nothing = pure $ makeCase b Q
parseQ' b (Just x)
    | isLabial   x = anyChar *> peekChar >>= parseQW b
    | isEject    x = anyChar *> peekChar >>= parseQE b
    | otherwise    = pure $ makeCase b Q

parseQE :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseQE b Nothing = pure $ makeCase b QY
parseQE b (Just x)
    | isLabial x = anyChar $> (makeCase b QWY)
    | otherwise  = pure $ makeCase b QY

parseQW :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseQW b Nothing = pure $ makeCase b QW
parseQW b (Just x)
    | isEject x = anyChar $> (makeCase b QWY)
    | otherwise = pure $ makeCase b QW

---------------------------
-- G etc... (copied from k)

parseG :: Parser String CasedLetter
parseG = do
  b <- isUpperC <$> satisfy (\x -> x == 'g' || x == 'G')
  peekChar >>= parseG' b

parseG' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseG' b Nothing = pure $ makeCase b G -- technically incorrect
parseG' b (Just x)
    | isLabial   x = anyChar *> peekChar >>= parseGW b -- incorrect only
    | isDotBelow x = anyChar *> peekChar >>= parseGU b
    | isDotAfter x = anyChar $> (makeCase b G)
    | otherwise    = pure $ makeCase b G -- technically incorrect
-- asdfzxcv

parseGU :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseGU b Nothing = pure $ makeCase b GU
parseGU b (Just x)
    | isLabial x = anyChar $> (makeCase b GUW)
    | otherwise  = pure $ makeCase b GU

parseGW :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseGW b Nothing = pure $ makeCase b GW
parseGW b (Just x)
    | isDotBelow x = anyChar $> (makeCase b GUW)
    | otherwise    = pure $ makeCase b GW

---------------------------
-- X etc...

parseX :: Parser String CasedLetter
parseX = do
  b <- isUpperC <$> satisfy (\x -> x == 'x' || x == 'X')
  peekChar >>= parseX' b

parseX' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseX' b Nothing = pure $ makeCase b XU
parseX' b (Just x)
    | isDotBelow x = anyChar *> peekChar >>= parseXU b
    | isLabial   x = anyChar *> (pure $ makeCase b XUW) -- peekChar >>= parseXW b
    | isDotAfter x = anyChar *> (pure $ makeCase b X)
    | otherwise     = pure $ makeCase b XU

parseXU :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseXU b Nothing = pure $ makeCase b X
parseXU b (Just x)
    | isLabial x = anyChar $> (makeCase b XW)
    | otherwise  = pure $ makeCase b X

---------------------------
-- TL/DL (smallcaps L)

parseTL :: Parser String CasedLetter
parseTL = do
  b <- isUpperC <$> satisfy (\x -> x == 'ʟ' || x == 'Ⱡ' || x == 'Ƚ')
  peekChar >>= parseTL' b

parseTL' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseTL' b Nothing = pure $ makeCase b TL
parseTL' b (Just x)
    | (  x == '!'  ) = anyChar $> (makeCase b TLY)
    | (isDotBelow x) = anyChar $> (makeCase b DL )
    | otherwise      = pure $ makeCase b TL

---------------------------
-- Glottal Stop

-- Taken from the Umista Parser
parseY :: Parser String CasedLetter
parseY = satisfy isGlottal *> peekChar >>= parseY'

parseY' :: (Maybe Char) -> Parser String CasedLetter
parseY' Nothing = pure (Min Y)
parseY' (Just x)
    | (x == 'm' || x == 'M') = anyChar *> (pure $ makeCase (isUpperC x) MY)
    | (x == 'n' || x == 'N') = anyChar *> (pure $ makeCase (isUpperC x) NY)
    | (x == 'l' || x == 'L') = anyChar *> (pure $ makeCase (isUpperC x) LY)
    | (x == 'y' || x == 'Y') = anyChar *> (pure $ makeCase (isUpperC x) JY)
    | (x == 'w' || x == 'W') = anyChar *> (pure $ makeCase (isUpperC x) WY)
    | otherwise              = pure $ makeCase (isUpperC x) Y -- i.e., the glottal stop takes on the case of the following letter

---------------------------
-- Vowels

parseA :: Parser String CasedLetter
parseA = do
  b <- isUpperC <$> satisfy (\x -> x == 'a' || x == 'A' || x == 'á' || x == 'Á' || x == 'à' || x == 'À')
  peekChar >>= parseA' b

parseA' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseA' b Nothing = pure $ makeCase b A
parseA' b (Just x)
    | (isUmlaut     x) = anyChar $> (makeCase b E)
    | (isCircumflex x) = anyChar $> (makeCase b O)
    | otherwise        = pure $ makeCase b A

parseE  :: Parser String CasedLetter
parseE  = (char 'ä' $> Min  E) <|> (char 'Ä' $> Maj  E)

parseI :: Parser String CasedLetter
parseI = do
  b <- isUpperC <$> satisfy (\x -> x == 'i' || x == 'I')
  peekChar >>= parseI' b

parseI' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseI' b Nothing = pure $ makeCase b I
parseI' b (Just x)
    | (isCircumflex x) = anyChar $> (makeCase b AU)
    | otherwise        = pure $ makeCase b I

parseO  :: Parser String CasedLetter
parseO  = (char 'â' $> Min  O) <|> (char 'Â' $> Maj  O)

parseU :: Parser String CasedLetter
parseU = do
  b <- isUpperC <$> satisfy (\x -> x == 'u' || x == 'U')
  peekChar >>= parseU' b

parseU' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseU' b Nothing = pure $ makeCase b U
parseU' b (Just x)
    | (isCircumflex x) = anyChar $> (makeCase b AU)
    | otherwise        = pure $ makeCase b U

parseAU :: Parser String CasedLetter
parseAU = (satisfy (\x -> x == 'ᴇ' || x == 'î' || x == 'û') $> Min AU) <|> (satisfy (\x -> x == 'Î' || x == 'Û') $> Maj AU)


