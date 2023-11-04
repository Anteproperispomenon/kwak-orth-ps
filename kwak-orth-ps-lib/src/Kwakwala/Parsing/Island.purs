{-|
Module      : Kwakwala.Parsing.Island
Description : Parser for the Island Font Orthography.
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This is the module for parsing the "Southern"
-- | or NAPA orthography, encoded for the "Island"
-- | font.

module Kwakwala.Parsing.Island
    -- * Direct Encoder
    ( encodeFromIsland
    , encodeFromIslandOld
    -- * Parser
    , parseIsland
    , parseIslandOld
    ) where

import Data.CodePoint.Unicode
import Data.Maybe
import Kwakwala.Parsing.Helpers
import Kwakwala.Types
import Prelude

import Control.Alt (alt, (<|>))
import Data.Either (fromRight)
import Data.List (List(Nil, Cons), (:), concat)
import Data.List as List
import Data.List.Types (toList)
import Data.String.CodePoints (CodePoint, codePointFromChar, singleton)
import Parsing (Parser, runParser, fail)
import Parsing.Combinators (many1, choice, many)
import Parsing.String (anyChar, anyCodePoint, char, eof, satisfy, satisfyCodePoint, string)
import Parsing.String.Basic (takeWhile1)

-- Primarily copied over from the NAPA parser file.

-- Apostrophe/Ejective Marker
isApost :: Char -> Boolean
isApost '{' = true
isApost '`' = true
isApost '|' = true -- hopefully won't cause trouble
isApost _ = false

isApostCP :: CodePoint -> Boolean
isApostCP = (eqCP '{') || (eqCP '`') || (eqCP '|')

-- ʷᵂ
isLabial :: Char -> Boolean
isLabial '#' = true
isLabial 'w' = true
isLabial  _  = false

isLabialCP :: CodePoint -> Boolean
isLabialCP = (eqCP '#') || (eqCP 'w')

isW :: Char -> Boolean
isW = isLabial

isWedge :: Char -> Boolean
isWedge '}' = true
isWedge '^' = true
isWedge  _  = false

isWedgeCP :: CodePoint -> Boolean
isWedgeCP = (eqCP '}') || (eqCP '^')

isMacron :: Char -> Boolean
isMacron '-' = true
isMacron '=' = true
isMacron  _  = false

isMacronCP = (eqCP '-') || (eqCP '=')

-- For characters that are used
-- as letters in "Island".
isOtherAlph :: Char -> Boolean
isOtherAlph '[' = true
isOtherAlph ']' = true
isOtherAlph '{' = true
isOtherAlph '}' = true
isOtherAlph '%' = true
isOtherAlph '>' = true
isOtherAlph '<' = true
isOtherAlph '+' = true
isOtherAlph '@' = true
isOtherAlph '#' = true
isOtherAlph '^' = true
isOtherAlph  _  = false

isOtherAlphCP :: CodePoint -> Boolean
isOtherAlphCP
  = (eqCP '[')
    || (eqCP ']')
    || (eqCP '{')
    || (eqCP '}')
    || (eqCP '%')
    || (eqCP '>')
    || (eqCP '<')
    || (eqCP '+')
    || (eqCP '@')
    || (eqCP '#')
    || (eqCP '^')

isAnyAlphaCP :: CodePoint -> Boolean
isAnyAlphaCP = isAlpha || isOtherAlphCP

---------------------------------------------------------------
-- Parsing K

-----------------------
-- Entry Point
parseK :: Parser String CasedLetter
parseK = do
  b <- isUpperC <$> satisfy (\x -> x == 'k' || x == 'K')
  peekChar >>= parseK' b

parseK' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseK' b Nothing = pure $ makeCase b K
parseK' b (Just x)
    | isApost x = anyChar *> peekChar >>= parseKY b
    | isW     x = anyChar *> peekChar >>= parseKW b
    | otherwise = pure $ makeCase b K

parseKY :: Boolean -> Maybe Char -> Parser String CasedLetter
parseKY b Nothing = pure $ makeCase b KY
parseKY b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b KWY)
    | otherwise = pure $ makeCase b KY

parseKW :: Boolean -> Maybe Char -> Parser String CasedLetter
parseKW b Nothing = pure $ makeCase b KW
parseKW b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b KWY)
    | otherwise = pure $ makeCase b KW

---------------------------------------------------------------
-- Parsing Q

-----------------------
-- Entry Point
parseQ :: Parser String CasedLetter
parseQ = do
  b <- isUpperC <$> satisfy (\x -> x == 'q' || x == 'Q')
  peekChar >>= parseQ' b

parseQ' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseQ' b Nothing = pure $ makeCase b Q
parseQ' b (Just x)
    | isApost     x = anyChar *> peekChar >>= parseQY b
    | isW         x = anyChar *> peekChar >>= parseQW b
    | otherwise     = pure $ makeCase b Q

parseQY :: Boolean -> Maybe Char -> Parser String CasedLetter
parseQY b Nothing = pure $ makeCase b QY
parseQY b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b QWY)
    | otherwise = pure $ makeCase b QY

parseQW :: Boolean -> Maybe Char -> Parser String CasedLetter
parseQW b Nothing = pure $ makeCase b QW
parseQW b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b QWY)
    | otherwise = pure $ makeCase b QW

---------------------------------------------------------------
-- Parsing G

-----------------------
-- Entry Point
parseG :: Parser String CasedLetter
parseG = do
  b <- isUpperC <$> satisfy (\x -> x == 'g' || x == 'G')
  peekChar >>= parseG' b

parseG' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseG' b Nothing = pure $ makeCase b G
parseG' b (Just x)
    | isWedge     x = anyChar *> peekChar >>= parseGU b
    | isW         x = anyChar *> (pure $ makeCase b GW) -- peekChar >>= parseGW b
    | otherwise     = pure $ makeCase b G

parseGU :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseGU b Nothing = pure $ makeCase b GU
parseGU b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b GUW)
    | otherwise = pure $ makeCase b GU
-- asfdzxcv

-----------------------
-- Entry Point
{-
parseGUB :: Parser String CasedLetter
parseGUB = do
    { b <- isUpper <$> satisfy (\x -> x == 'ǧ' || x == 'Ǧ')
    ; peekChar >>= parseGU b
    }
-- asdfzxc
-}

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
    | isWedge     x = anyChar *> peekChar >>= parseXU b
    | isW         x = anyChar *> (pure $ makeCase b XW) -- peekChar >>= parseXW b
    | otherwise     = pure $ makeCase b X

parseXU :: Boolean -> Maybe Char -> Parser String CasedLetter
parseXU b Nothing = pure $ makeCase b XU
parseXU b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b XUW)
    | otherwise = pure $ makeCase b XU

---------------------------------------------------------------
-- Parsing D

-----------------------
-- Entry Point
parseD :: Parser String CasedLetter
parseD = do
  b <- isUpper <$> satisfyCodePoint (eqCP 'd' || eqCP 'D')
  peekChar >>= parseD' b

-- ᶻ
parseD' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseD' b Nothing = pure $ makeCase b D
parseD' b (Just x)
    | (x == 'z' || x == 'Z' || x == '+') = anyChar *> (pure $ makeCase b DZ)
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
    | isApost x = anyChar *> (pure $ makeCase b TY)
    | otherwise = pure $ makeCase b T

-----------------------
-- Entry Point
parseC :: Parser String CasedLetter
parseC = do
  b <- isUpperC <$> satisfy (\x -> x == 'c' || x == 'C')
  peekChar >>= parseC' b

parseC' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseC' b Nothing = pure $ makeCase b TS
parseC' b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b TSY)
    | otherwise = pure $ makeCase b TS

-----------------------
-- Entry Point
parseS :: Parser String CasedLetter
parseS = (char 's' $> Min S) <|> (char 'S' $> Maj S)

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

---------------------------------------------------------------
-- Parsing J/Y, L, LH, and W

-----------------------
-- Entry Point
parseJ :: Parser String CasedLetter
parseJ = do
  b <- isUpperC <$> satisfy (\x -> x == 'y' || x == 'Y' || x == 'j' || x == 'J')
  peekChar >>= parseJ' b

parseJ' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseJ' b Nothing = pure $ makeCase b J
parseJ' b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b JY)
    | otherwise = pure $ makeCase b J

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
    | otherwise = pure $ makeCase b L

-----------------------
-- Entry Point
-- Taken directly from the Umista parser
-- (Then added alternative for upper-case tilde-L)
parseLH :: Parser String CasedLetter
parseLH = ((char '>') $> (Min LH)) <|> ((char '<') $> (Maj LH))
    -- (satisfy (\x -> x == '>')) $> (Min LH)
-- parseLH = ((satisfy (\x -> x == 'ł' || x == 'ƚ' || x == 'ɫ' || x == 'ɬ')) $> Min LH) <|> (char 'Ł' $> Maj LH) <|> (char 'Ɫ' $> Maj LH)
-- Ɫ == U+2C62 == \x2c62

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

---------------------------------------------------------------
-- Parsing λ and ƛ

-----------------------
-- Entry Point
parseDL :: Parser String CasedLetter
parseDL = (char ']' $> Min DL)

-----------------------
-- Entry Point
parseTL :: Parser String CasedLetter
parseTL = do
  b <- isUpperC <$> satisfy (\x -> x == '[') -- (\x -> (toLower x) == '[')
  peekChar >>= parseTL' b

parseTL' :: Boolean -> Maybe Char -> Parser String CasedLetter
parseTL' b Nothing = pure $ makeCase b TL
parseTL' b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b TLY)
    | otherwise = pure $ makeCase b TL

---------------------------------------------------------------
-- Parsing ʔ and H

-----------------------
-- Entry Point
parseY :: Parser String CasedLetter
parseY = do
  void $ char '%'
  b <- tstm isUpperC <$> peekChar
  pure $ makeCase b Y

tstm :: forall a. (a -> Boolean) -> (Maybe a) -> Boolean
tstm p Nothing  = false
tstm p (Just x) = p x

-----------------------
-- Entry Point
parseH :: Parser String CasedLetter
parseH = (char 'h' $> Min H) <|> (char 'H' $> Maj H)

---------------------------------------------------------------
-- Parsing Vowels

parseA  :: Parser String CasedLetter
parseA  = (char 'a' $> Min  A) <|> (char 'A' $> Maj  A)

parseAU :: Parser String CasedLetter
parseAU = (char '@' $> Min AU)

parseE  :: Parser String CasedLetter
parseE  = (char 'e' $> Min  E) <|> (char 'E' $> Maj  E)

parseI  :: Parser String CasedLetter
parseI  = (char 'i' $> Min  I) <|> (char 'I' $> Maj  I)

parseO  :: Parser String CasedLetter
parseO  = (char 'o' $> Min  O) <|> (char 'O' $> Maj  O)

parseU  :: Parser String CasedLetter
parseU  = (char 'u' $> Min  U) <|> (char 'U' $> Maj  U)

-- Convert to a unicode macron
parseMacron :: Parser String CasedChar
parseMacron = (satisfy isMacron) $> (Punct "\x304")

---------------------------------------------------------------
-- The Full Parser

parseIslandLetter :: Parser String CasedLetter
parseIslandLetter = choice 
  [parseA,parseE,parseI,parseO,parseU,parseAU
  ,parseK,parseQ,parseG,parseX
  ,parseP,parseT,parseM,parseN
  ,parseL,parseW,parseY,parseB,parseH
  ,parseD,parseLH,parseJ,parseS
  ,parseZ,parseDL,parseTL
  ,parseC
  ]

parseIslandLetter' :: Parser String CasedChar
parseIslandLetter' = (Kwak <$> parseIslandLetter) <|> parseMacron

-- Parse non-alphabetical and non-apostrophe characters
-- until next letter.
parsePuncts :: Parser String CasedChar
parsePuncts = Punct <$> takeWhile1 (\x -> not (isAlpha x || isApostCP x || isOtherAlphCP x || (x == pip)))
  where pip = codePointFromChar '|'

parseIslandChar :: Parser String CasedChar
parseIslandChar = parseIslandLetter' <|> parsePipe <|> (Punct <$> singleton <$> anyCodePoint)
-- parseIslandChar = (Kwak <$> parseIslandLetter) <|> parsePipe <|> (Punct <$> T.singleton <$> anyChar)

parseIslandCharNew :: Parser String CasedChar
parseIslandCharNew = parseIslandLetter' <|> parsePipe <|> parsePuncts <|> (Punct <$> singleton <$> anyCodePoint)
-- parseIslandCharNew = (Kwak <$> parseIslandLetter) <|> parsePipe <|> parsePuncts <|> (Punct <$> T.singleton <$> anyChar)

-- | `Parser` for the Island font/NAPA orthography.
-- | 
-- | Use this function together with functions
-- | like `runParser` if you want error messages.
-- | Otherwise, just use `encodeFromIsland`.
parseIsland :: Parser String (List CasedChar)
parseIsland = toList <$> many1 parseIslandCharNew

-- | Older version of `parseIsland`.
parseIslandOld :: Parser String (List CasedChar)
parseIslandOld = toList <$> many1 parseIslandChar

-- | Direct encoder for the Island font/NAPA orthography.
-- | 
-- | Note that if the parser runs into any errors,
-- | this just returns an empty list. If you want
-- | error messages, use `parseIsland` together
-- | with `runParser` or other `Parser` runners.
encodeFromIsland :: String -> (List CasedChar)
encodeFromIsland txt = fromRight Nil $ runParser txt parseIsland

-- | Older version of `encodeFromIsland`.
encodeFromIslandOld :: String -> (List CasedChar)
encodeFromIslandOld txt = fromRight Nil $ runParser txt parseIslandOld


