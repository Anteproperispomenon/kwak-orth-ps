{-|
Module      : Kwakwala.Parsing.Grubb
Description : Parser for the Grubb-ASCII orthography
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This is the module for parsing the Grubb-ASCII
-- | orthography. This orthography is a modified
-- | version of the original Grubb orthography
-- | (which is related to the U'mista orthography),
-- | that has been changed to make it encodeable in
-- | pure ASCII. This makes it useful for applications
-- | where using non-ASCII characters is considerably
-- | more difficult or even impossible.
-- | 
-- | Inspired by Grubb's usage of "eh" to represent
-- | /a/ and ASCII encodings of Esperanto, characters
-- | that are usually written with diacritics are
-- | instead written with an "h" following them. In
-- | newer versions, the "h" sound is instead written
-- | as "j" to prevent overlap/clashes.


module Kwakwala.Parsing.Grubb
    -- * Newer Parsers
    ( encodeFromGrubbAscii
    , encodeFromGrubbAsciiChunk
    , parseGrubbAscii
    -- * With `CasedWord`
    , encodeFromGrubbWordsL
    , encodeFromGrubbWordsR
    -- * Deprecated Parsers
    , encodeFromGrubbAsciiOld
    , parseGrubbAsciiOld
    ) where

import Prelude
import Parsing (Parser, runParser, fail)
import Parsing.String (char, anyChar, satisfy)
import Parsing.String.Basic (takeWhile1)
import Parsing.Combinators (many1, choice, many)

import Control.Alt ((<|>))

import Data.List (List(Nil, Cons), (:), concat)
import Data.List as List
-- import Data.List.NonEmpty (toList)
import Data.Either (fromRight)
import Data.Maybe (Maybe(..))

import Data.String.CodePoints (CodePoint, codePointFromChar, singleton)
import Data.CodePoint.Unicode (isAlpha)
import Data.List.Types (toList)

import Kwakwala.Parsing.Helpers (eqCP, isUpperC, liftP, parsePipe, peekChar)
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
isApost :: Char -> Boolean
isApost '\'' = true
isApost '`'  = true
isApost '̕'  = true
isApost '\x313' = true
isApost '\x2bc' = true
isApost '7' = true -- Careful with this one.
isApost _ = false

isApostCP :: CodePoint -> Boolean
isApostCP = (eqCP '\'') || (eqCP '`') || (eqCP '̕' ) || (eqCP '\x313') || (eqCP '\x2bc') || (eqCP '7')

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

-- ʷᵂ
isLabial :: Char -> Boolean
isLabial 'w' = true
isLabial 'W' = true
isLabial 'ᵂ' = true
isLabial 'ʷ' = true
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

-----------------------
-- Entry Point
parseK :: Parser String CasedLetter
parseK = do
  b <- isUpperC <$> satisfy (\x -> x == 'k' || x == 'K')
  peekChar >>= parseK' b

parseQ :: Parser String CasedLetter
parseQ = do
  b <- isUpperC <$> satisfy (\x -> x == 'q' || x == 'Q')
  peekChar >>= parseKH b
  

parseK' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseK' b Nothing = pure $ makeCase b K
parseK' b (Just x)
    | isApost x = anyChar *> peekChar >>= parseKY b
    | isW     x = anyChar *> peekChar >>= parseKW b
    | isH     x = anyChar *> peekChar >>= parseKH b
    | otherwise = pure $ makeCase b K

parseKH :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseKH b Nothing = pure $ makeCase b Q
parseKH b (Just x)
    | isApost x = anyChar *> peekChar >>= parseKHY b
    | isW     x = anyChar *> peekChar >>= parseKHW b
    | otherwise = pure $ makeCase b Q

parseKY :: Boolean -> Maybe Char -> Parser String CasedLetter
parseKY b Nothing = pure $ makeCase b KY
parseKY b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b KWY)
    | isH     x = anyChar *> peekChar >>= parseKHY b
    | otherwise = pure $ makeCase b KY

parseKHY :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseKHY b Nothing = pure $ makeCase b QY
parseKHY b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b QWY)
    | otherwise = pure $ makeCase b QY

parseKW :: Boolean -> Maybe Char -> Parser String CasedLetter
parseKW b Nothing = pure $ makeCase b KW
parseKW b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b KWY)
    | otherwise = pure $ makeCase b KW

parseKHW :: Boolean -> Maybe Char -> Parser String CasedLetter
parseKHW b Nothing = pure $ makeCase b KW
parseKHW b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b QWY)
    | otherwise = pure $ makeCase b QW

-----------------------
-- Entry Point For G
parseG :: Parser String CasedLetter
parseG = do
  b <- isUpperC <$> satisfy (\x -> x == 'g' || x == 'G')
  peekChar >>= parseG' b
  

parseG' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseG' b Nothing = pure $ makeCase b G
parseG' b (Just x)
    | isH     x = anyChar *> peekChar >>= parseGH b
    | isW     x = anyChar *> peekChar >>= parseGW b -- (pure $ makeCase b GW) -- peekChar >>= parseGW b
    | otherwise = pure $ makeCase b G

parseGH :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseGH b Nothing = pure $ makeCase b GU
parseGH b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b GUW)
    | otherwise = pure $ makeCase b GU

parseGW :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseGW b Nothing = pure $ makeCase b GW
parseGW b (Just x)
    | isH     x = anyChar *> (pure $ makeCase b GUW)
    | otherwise = pure $ makeCase b GW

---------------------------------------------------------------
-- Parsing X

-----------------------
-- Entry Point
parseX :: Parser String CasedLetter
parseX = do
  b <- isUpperC <$> satisfy (\x -> x == 'x' || x == 'X')
  peekChar >>= parseX' b
  

parseX' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseX' b Nothing = pure $ makeCase b X
parseX' b (Just x)
    | isH     x = anyChar *> peekChar >>= parseXU b
    | isW     x = anyChar *> peekChar >>= parseXW b  -- (pure $ makeCase b XW) -- peekChar >>= parseXW b
    | otherwise = pure $ makeCase b X

parseXU :: Boolean -> Maybe Char -> Parser String CasedLetter
parseXU b Nothing = pure $ makeCase b XU
parseXU b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b XUW)
    | otherwise = pure $ makeCase b XU

parseXW :: Boolean -> Maybe Char -> Parser String CasedLetter
parseXW b Nothing = pure $ makeCase b XW
parseXW b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b XUW)
    | otherwise = pure $ makeCase b XW

-----------------------
-- Entry Point
parseD :: Parser String CasedLetter
parseD = do
  b <- isUpperC <$> satisfy (\x -> x == 'd' || x == 'D')
  peekChar >>= parseD' b

-- ᶻ
parseD' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseD' b Nothing = pure $ makeCase b D
parseD' b (Just x)
    | (x == 'z' || x == 'Z' || x == 'ᶻ') = anyChar *> (pure $ makeCase b DZ)
    | (x == 'l' || x == 'L'            ) = anyChar *> (pure $ makeCase b DL)
    | otherwise                          = pure $ makeCase b D

-----------------------
-- Entry Point
parseZ :: Parser String CasedLetter
parseZ = do
  b <- isUpperC <$> satisfy (\x -> x == 'z' || x == 'Z' || x == 'ǳ' || x == 'Ǳ' || x == 'ǲ')
  pure $ makeCase b DZ

---------------------------------------------------------------
-- Parsing B, P, T, C, and S

-----------------------
-- Entry Point
parseB :: Parser String CasedLetter
parseB = do
  b <- isUpperC <$> satisfy (\x -> x == 'b' || x == 'B')
  pure $ makeCase b B
  

-----------------------
-- Entry Point
parseP :: Parser String CasedLetter
parseP = do
  b <- isUpperC <$> satisfy (\x -> x == 'p' || x == 'P')
  peekChar >>= parseP' b
  

parseP' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseP' b Nothing = pure $ makeCase b P
parseP' b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b PY)
    | otherwise = pure $ makeCase b P

-----------------------
-- Entry Point
parseT :: Parser String CasedLetter
parseT = do
  b <- isUpperC <$> satisfy (\x -> x == 't' || x == 'T')
  peekChar >>= parseT' b


parseT' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseT' b Nothing = pure $ makeCase b T
parseT' b (Just x)
    | isApost x              = anyChar *> peekChar >>= parseTY b -- (pure $ makeCase b TY)
    | (x == 's' || x == 'S') = anyChar *> peekChar >>= parseTS b
    | (x == 'l' || x == 'L') = anyChar *> peekChar >>= parseTL b
    | otherwise              = pure $ makeCase b T

parseTS :: Boolean -> Maybe Char -> Parser String CasedLetter
parseTS b Nothing = pure $ makeCase b TS
parseTS b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b TSY)
    | otherwise = pure $ makeCase b TS

parseTL :: Boolean -> Maybe Char -> Parser String CasedLetter
parseTL b Nothing = pure $ makeCase b TL
parseTL b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b TLY)
    | otherwise = pure $ makeCase b TL

parseTY :: Boolean -> Maybe Char -> Parser String CasedLetter
parseTY b Nothing = pure $ makeCase b TY
parseTY b (Just x)
    | (x == 's' || x == 'S') = anyChar *> (pure $ makeCase b TSY)
    | (x == 'l' || x == 'L') = anyChar *> (pure $ makeCase b TLY)
    | otherwise              = pure $ makeCase b TY

-----------------------
-- Entry Point
-- (Equivalent to Ts)
parseC :: Parser String CasedLetter
parseC = do
  b <- isUpperC <$> satisfy (\x -> x == 'c' || x == 'C')
  peekChar >>= parseTS b
  

---------------------------------------------------------------
-- Parsing M and N

-----------------------
-- Entry Point
parseM :: Parser String CasedLetter
parseM = do
  b <- isUpperC <$> satisfy (\x -> x == 'm' || x == 'M')
  peekChar >>= parseM' b

parseM' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseM' b Nothing = pure $ makeCase b M
parseM' b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b MY)
    | otherwise = pure $ makeCase b M

-- Version that doesn't accept
-- "m'" as a parse.
parseMonly :: Parser String CasedLetter
parseMonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'm' || x == 'M')
  pure $ makeCase b M

-----------------------
-- Entry Point

parseN :: Parser String CasedLetter
parseN = do
  b <- isUpperC <$> satisfy (\x -> x == 'n' || x == 'N')
  peekChar >>= parseN' b

parseN' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseN' b Nothing = pure $ makeCase b N
parseN' b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b NY)
    | otherwise = pure $ makeCase b N

-- Version that doesn't accept
-- "n'" as a parse.
parseNonly :: Parser String CasedLetter
parseNonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'n' || x == 'N')
  pure $ makeCase b N

---------------------------------------------------------------
-- Parsing J/Y, L, LH, and W

-----------------------
-- Entry Point
parseJ :: Parser String CasedLetter
parseJ = do
  b <- isUpperC <$> satisfy (\x -> x == 'y' || x == 'Y')
  peekChar >>= parseJ' b

parseJ' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseJ' b Nothing = pure $ makeCase b J
parseJ' b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b JY)
    | otherwise = pure $ makeCase b J

-- Version that doesn't accept
-- "y'" as a parse.
parseJonly :: Parser String CasedLetter
parseJonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'y' || x == 'Y')
  pure $ makeCase b J

-----------------------
-- Entry Point
parseL :: Parser String CasedLetter
parseL = do
  b <- isUpperC <$> satisfy (\x -> x == 'l' || x == 'L')
  peekChar >>= parseL' b

parseL' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseL' b Nothing = pure $ makeCase b L
parseL' b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b LY)
    | isH     x = anyChar *> (pure $ makeCase b LH)
    | otherwise = pure $ makeCase b L

-- Version that doesn't accept
-- "l'" as a parse.
parseLonly :: Parser String CasedLetter
parseLonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'l' || x == 'L')
  peekChar >>= parseLonly' b

parseLonly' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseLonly' b Nothing = pure $ makeCase b L
parseLonly' b (Just x)
    | isH     x = anyChar *> (pure $ makeCase b LH)
    | otherwise = pure $ makeCase b L

-----------------------
-- Entry Point
parseW :: Parser String CasedLetter
parseW = do
  b <- isUpperC <$> satisfy (\x -> x == 'w' || x == 'W')
  peekChar >>= parseW' b

parseW' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseW' b Nothing = pure $ makeCase b W
parseW' b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b WY)
    | otherwise = pure $ makeCase b W

-- Version that doesn't accept
-- "w'" as a parse.
parseWonly :: Parser String CasedLetter
parseWonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'w' || x == 'W')
  pure $ makeCase b W

-- Taken from U'mista parser, again
parseY :: Parser String CasedLetter
parseY = satisfy isApost *> peekChar >>= parseY'

parseY' :: (Maybe Char) -> Parser String CasedLetter
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
    | otherwise = pure $ makeCase b Y -- i.e., the glottal stop takes on the case of the following letter
    where b = isUpperC x

----------------------------------------------------
-- Other stuff

-----------------------
-- Entry Point
parseS :: Parser String CasedLetter
parseS = do
  b <- isUpperC <$> satisfy (\x -> x == 's' || x == 'S')
  pure $ makeCase b S

parseH :: Parser String CasedLetter
parseH = do
  b <- isUpperC <$> satisfy (\x -> x == 'h' || x == 'H' || x == 'j' || x == 'J')
  pure $ makeCase b H

----------------------------------------------------
-- Vowels

parseA  :: Parser String CasedLetter
parseA  = (char 'a' $> Min  A) <|> (char 'A' $> Maj  A)

parseE :: Parser String CasedLetter
parseE = do
  b <- isUpperC <$> satisfy (\x -> x == 'e' || x == 'E')
  peekChar >>= parseE' b

parseE' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseE' b Nothing = pure $ makeCase b AU
parseE' b (Just x)
    | isH     x = anyChar *> (pure $ makeCase b E)
    | otherwise = pure $ makeCase b AU

parseI  :: Parser String CasedLetter
parseI  = (char 'i' $> Min  I) <|> (char 'I' $> Maj  I)

parseO  :: Parser String CasedLetter
parseO  = (char 'o' $> Min  O) <|> (char 'O' $> Maj  O)

parseU  :: Parser String CasedLetter
parseU  = (char 'u' $> Min  U) <|> (char 'U' $> Maj  U)

--------------------------------------------------
-- Taken from U'mista parser

parseGrubbLetterOld :: Parser String CasedLetter
parseGrubbLetterOld = 
    choice [parseA,parseE,parseI,parseO,parseU
           ,parseK,parseQ,parseG,parseX
           ,parseP,parseT,parseM,parseN,parseC
           ,parseL,parseW,parseY,parseB
           ,parseD,parseJ,parseS
           ,parseZ,parseH
           ]

-- Disallowing glottal markers after sonorants.
parseGrubbLetter :: Parser String CasedLetter
parseGrubbLetter = 
    choice [parseA,parseE,parseI,parseO,parseU
           ,parseK,parseQ,parseG,parseX
           ,parseP,parseT,parseMonly,parseNonly,parseC
           ,parseLonly,parseWonly,parseY,parseB
           ,parseD,parseJonly,parseS
           ,parseZ,parseH
           ]

parseGrubbWord :: Parser String (List CasedLetter)
parseGrubbWord = parseGrubbLetter >>= parseGrubbWord'

parseGrubbWord' :: CasedLetter -> Parser String (List CasedLetter)
parseGrubbWord' ltr
    | (isKwkVow' ltr) = (append ((caseOf ltr Y):ltr:Nil)) <$> many parseGrubbLetter
    | otherwise       = (Cons ltr)                        <$> many parseGrubbLetter

-- 
caseOf (Maj _) x = Maj x
caseOf (Min _) x = Min x

parseGrubbWordOld :: Parser String (List CasedLetter)
parseGrubbWordOld = parseGrubbLetterOld >>= parseGrubbWordOld'

parseGrubbWordOld' :: CasedLetter -> Parser String (List CasedLetter)
parseGrubbWordOld' ltr
    | (isKwkVow' ltr) = (append ((caseOf ltr Y):ltr:Nil)) <$> many parseGrubbLetterOld
    | otherwise       = (Cons ltr)                        <$> many parseGrubbLetterOld

parsePuncts :: Parser String CasedChar
parsePuncts = Punct <$> takeWhile1 (\x -> not (isAlpha x || isApostCP x || (x == pip)))
  where pip = codePointFromChar '|'

parsePunctsA :: Parser String CasedWord
parsePunctsA = PunctW <$> takeWhile1 (\x -> not (isAlpha x || isApostCP x))

parseGrubbChar :: Parser String CasedChar
parseGrubbChar = (Kwak <$> parseGrubbLetter) <|> parsePipe <|> (Punct <$> singleton <$> codePointFromChar <$> anyChar)

parseGrubbMain :: Parser String (List CasedChar)
parseGrubbMain = (map Kwak <$> parseGrubbWord) <|> (List.singleton <$> parsePipe) <|> (List.singleton <$> parsePuncts) <|> (List.singleton <$> Punct <$> singleton <$> codePointFromChar <$> anyChar)

parseGrubbMainOld :: Parser String (List CasedChar)
parseGrubbMainOld = (map Kwak <$> parseGrubbWordOld) <|> (List.singleton <$> parsePipe) <|> (List.singleton <$> parsePuncts) <|> (List.singleton <$> Punct <$> singleton <$> codePointFromChar <$> anyChar)


-- | `Parser` for newer Grubb-ASCII variants
-- |
-- | Use this function together with functions
-- | like `runParser` if you want error messages.
-- | Otherwise, just use `encodeFromGrubbAscii`.
-- | 
-- | Note that this doesn't work on variants of 
-- | Grubb-ASCII where the /j/ phoneme (usually
-- | written as "y") is written as "j".
parseGrubbAscii :: Parser String (List CasedChar)
parseGrubbAscii = concat <$> toList <$> many1 parseGrubbMain

-- | Direct encoder for newer Grubb-ASCII variants.
-- | 
-- | Note that this doesn't work on variants of 
-- | Grubb-ASCII where the /j/ phoneme (usually
-- | written as "y") is written as "j".
-- | 
-- | Note that if the parser runs into any errors,
-- | this just returns an empty list. If you want
-- | error messages, use `parseGrubbAscii` together
-- | with `runParser` or other `Parser` runners.
encodeFromGrubbAscii :: String -> List CasedChar
encodeFromGrubbAscii txt = fromRight Nil $ runParser txt parseGrubbAscii

-- | `Parser` for older Grubb-ASCII variants
-- | 
-- | This parser interprets apostrophes after 
-- | sonorants as glottalization markers. However,
-- | this is incorrect behaviour, as glottal stops
-- | following sonorants/nasals do exist. This
-- | version will incorrectly interpret such
-- | instances.
-- | 
-- | Use this function together with functions
-- | like `runParser` if you want error messages.
-- | Otherwise, just use `encodeFromGrubbAscii`.
-- | 
-- | Note that this doesn't work on variants of 
-- | Grubb-ASCII where the /j/ phoneme (usually
-- | written as "y") is written as "j".
parseGrubbAsciiOld :: Parser String (List CasedChar)
parseGrubbAsciiOld = concat <$> toList <$> many1 parseGrubbMainOld

-- | Direct encoder for older Grubb-ASCII variants.
-- | 
-- | This parser interprets apostrophes after 
-- | sonorants as glottalization markers. However,
-- | this is incorrect behaviour, as glottal stops
-- | following sonorants/nasals do exist. This
-- | version will incorrectly interpret such
-- | instances.
-- | 
-- | Note that this doesn't work on variants of 
-- | Grubb-ASCII where the /j/ phoneme (usually
-- | written as "y") is written as "j".
-- | 
-- | Note that if the parser runs into any errors,
-- | this just returns an empty list. If you want
-- | error messages, use `parseGrubbAscii` together
-- | with `runParser` or other `Parser` runners.
encodeFromGrubbAsciiOld :: String -> List CasedChar
encodeFromGrubbAsciiOld txt = fromRight Nil $ runParser txt parseGrubbAsciiOld


-- | Direct encoder for newer Grubb-ASCII variants.
-- | This version is chunkified.
-- | 
-- | Note that this doesn't work on variants of 
-- | Grubb-ASCII where the /j/ phoneme (usually
-- | written as "y") is written as "j".
-- | 
-- | Note that if the parser runs into any errors,
-- | this just returns an empty list. If you want
-- | error messages, use `parseGrubbAscii` together
-- | with `runParser` or other `Parser` runners.
encodeFromGrubbAsciiChunk :: String -> List CasedChar
encodeFromGrubbAsciiChunk txt = fromRight Nil $ runParserChunk (chunkifyText 1024 512 txt) parseGrubbAscii

-- | Direct encoder for newer Grubb-ASCII variants.
-- | This version is chunkified and uses `CasedWord`.
-- | 
-- | Note that this doesn't work on variants of 
-- | Grubb-ASCII where the /j/ phoneme (usually
-- | written as "y") is written as "j".
-- | 
-- | Note that if the parser runs into any errors,
-- | this just returns an empty list. If you want
-- | error messages, use `parseGrubbAscii` together
-- | with `runParser` or other `Parser` runners.
-- |
-- | Converting to `CasedWord`s is done before
-- | being grouped from Chunks into a single
-- | `List`, which should improve space performance.
encodeFromGrubbWordsL :: String -> List CasedWord
encodeFromGrubbWordsL txt = fromRight Nil $ runParserChunk (chunkifyText 1024 512 txt) (toWordsL <$> parseGrubbAscii)

-- | Direct encoder for newer Grubb-ASCII variants.
-- | This version is chunkified and uses `CasedWord`.
-- | 
-- | Note that this doesn't work on variants of 
-- | Grubb-ASCII where the /j/ phoneme (usually
-- | written as "y") is written as "j".
-- | 
-- | Note that if the parser runs into any errors,
-- | this just returns an empty list. If you want
-- | error messages, use `parseGrubbAscii` together
-- | with `runParser` or other `Parser` runners.
-- |
-- | Converting to `CasedWord`s is done before
-- | being grouped from Chunks into a single
-- | `List`, which should improve space performance.
encodeFromGrubbWordsR :: String -> List CasedWord
encodeFromGrubbWordsR txt = fromRight Nil $ runParserChunk (chunkifyText 1024 512 txt) (toWordsR <$> parseGrubbAscii)

