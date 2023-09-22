{-|
Module      : Kwakwala.Parsing.Umista
Description : Parser for the U'mista Orthography for Kwak'wala.
Copyright   : (c) David Wilson, 2023
License     : BSD-3

This is the module for parsing the U'mista
orthography. Note that there are two versions
for each function. Try using the "-old" functions
if you're having issues with parsing text.
-}

module Kwakwala.Parsing.Umista
    -- * Parsers
    ( parseUmista
    , parseUmistaOld
    -- * Direct Encoders
    , encodeFromUmista
    , encodeFromUmistaOld
    ) where


import Prelude
import Parsing (Parser, runParser, fail)
import Parsing.String
  ( char
  , string
  , anyChar
  , anyCodePoint
  , satisfy
  , satisfyCodePoint
  , eof
  )
import Parsing.String.Basic (takeWhile1)
import Parsing.Combinators (many1, choice, many)

import Control.Alt (alt, (<|>))

import Data.List (List(Nil, Cons), (:), concat)
import Data.List as List
-- import Data.List.NonEmpty (toList)
import Data.Either (fromRight)
import Data.Maybe

import Data.String.CodePoints (CodePoint, codePointFromChar, singleton)
import Data.CodePoint.Unicode
import Data.List.Types (toList)

import Kwakwala.Types
import Kwakwala.Parsing.Helpers

-----------------------------------------
-- a̱

-- precombined : ǤǥḴḵ

-- Update when more possibilities are found
isUnderline :: Char -> Boolean
isUnderline '̱' = true
-- isUnderline '̱' = true
-- isUnderline '_' = true (needed this when console was wrong
isUnderline _ = false

-- Apostrophe/Ejective Marker
isApost :: Char -> Boolean
isApost '\'' = true
isApost '`'  = true
isApost '̕'  = true
isApost '\x313' = true
-- isApost '\x315' = true
isApost '\x2019' = true
isApost '\x2bc' = true
isApost _ = false

isApostCP :: CodePoint -> Boolean
isApostCP = (eqCP '\'') || (eqCP '`') || (eqCP '̕' ) || (eqCP '\x313') || (eqCP '\x2019') || (eqCP '\x2bc')

-- For checking after an m/n/etc...
isApost' :: Char -> Boolean
-- isApost' '\'' = true -- since this would be a glottal stop
isApost' '`'  = true
isApost' '̕'  = true
isApost' '\x313' = true
-- isApost' '\x315' = true
isApost' _ = false

-- ʷᵂ
isLabial :: Char -> Boolean
isLabial 'w' = true
isLabial 'W' = true
isLabial 'ᵂ' = true
isLabial 'ʷ' = true
-- isLabial 'ᵂ' = true -- maybe redundant?
isLabial  _  = false

isW ∷ Char → Boolean
isW = isLabial

-----------------------------------------------------------

parseK :: Parser String CasedLetter
parseK = do
  b <- isUpperC <$> satisfy (\x -> x == 'k' || x == 'K')
  peekChar >>= parseK' b

-- x̱

parseK' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseK' b Nothing = pure $ makeCase b K
parseK' b (Just x)
    | isUnderline x = anyChar *> peekChar >>= parseQ  b
    | isApost     x = anyChar *> peekChar >>= parseKY b
    | isW         x = anyChar *> peekChar >>= parseKW b
    | otherwise     = pure $ makeCase b K

parseKUN :: Parser String CasedLetter
parseKUN = do
  b <- isUpperC <$> satisfy (\x -> x == 'ḵ' || x == 'Ḵ' || x == 'q' || x == 'Q')
  peekChar >>= parseQ b

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

-- Resultant Parser
parseQ :: Boolean -> Maybe Char -> Parser String CasedLetter
parseQ b Nothing = pure $ makeCase b Q
parseQ b (Just x)
    | isApost x = anyChar *> peekChar >>= parseQY b
    | isW     x = anyChar *> peekChar >>= parseQW b
    | otherwise = pure $ makeCase b Q

parseQW :: Boolean -> Maybe Char -> Parser String CasedLetter
parseQW b Nothing = pure $ makeCase b QW
parseQW b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b QWY)
    | otherwise = pure $ makeCase b QW

parseQY :: Boolean -> Maybe Char -> Parser String CasedLetter
parseQY b Nothing = pure $ makeCase b QW
parseQY b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b QWY)
    | otherwise = pure $ makeCase b QY

------------------------------------------------------------------------

parseG :: Parser String CasedLetter
parseG = do
  b <- isUpperC <$> satisfy (\x -> x == 'g' || x == 'G')
  peekChar >>= parseG' b

parseG' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseG' b Nothing = pure $ makeCase b G
parseG' b (Just x)
    | isUnderline x = anyChar *> peekChar >>= parseGU b
    | isW         x = anyChar *> (pure $ makeCase b GW)
    | otherwise     = pure $ makeCase b G

-- Ǥǥ
parseGUN :: Parser String CasedLetter
parseGUN = do
  b <- isUpperC <$> satisfy (\x -> x == 'ǥ' || x == 'Ǥ')
  peekChar >>= parseGU b

-- Resultant Parser
parseGU :: Boolean -> Maybe Char -> Parser String CasedLetter
parseGU b Nothing = pure $ makeCase b GU
parseGU b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b GUW)
    | otherwise = pure $ makeCase b GU

-----------------------------------------------------------------

parseP :: Parser String CasedLetter
parseP = do
  b <- isUpperC <$> satisfy (\x -> x == 'p' || x == 'P')
  x <- peekChar
  case x of
    (Just y) -> if isApost y then (anyChar *> (pure $ makeCase b PY)) else (pure $ makeCase b P)
    _        -> pure $ makeCase b P

parseT :: Parser String CasedLetter
parseT = do
  b <- isUpperC <$> satisfy (\x -> x == 't' || x == 'T')
  peekChar >>= parseT' b
--  ; case x of
--      { (Just y) -> if isApost y then (anyChar *> pure TY) else pure T
--      ;       _  -> pure T
--      }

-- ŁłƚǱǲǳɫɬ

parseT' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseT' b Nothing = pure $ makeCase b T
parseT' b (Just x)
    | (isApost x)        = anyChar *> peekChar >>= parseTY b
    | (x == 's' || x == 'S') = anyChar *> peekChar >>= parseTS b
    | (x == 'l' || x == 'L' || x == 'ł' || x == 'ƚ' || x == 'ɫ' || x == 'ɬ' || x == 'Ł') = anyChar *> peekChar >>= parseTL b
    | otherwise = pure $ makeCase b T

parseTS' :: Parser String CasedLetter
parseTS' = char 'ʦ' *> peekChar >>= parseTS false

parseTY :: Boolean -> Maybe Char -> Parser String CasedLetter
parseTY b Nothing = pure $ makeCase b TY
parseTY b (Just x)
    | (x == 's' || x == 'S') = anyChar *> (pure $ makeCase b TSY)
    | (x == 'l' || x == 'L' || x == 'ł' || x == 'ƚ' || x == 'ɫ' || x == 'ɬ' || x == 'Ł') = anyChar *> (pure $ makeCase b TLY)
    | otherwise = (pure $ makeCase b TY)

parseTS :: Boolean -> Maybe Char -> Parser String CasedLetter
parseTS b Nothing = pure $ makeCase b TS
parseTS b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b TSY)
    | otherwise = pure $ makeCase b TS

parseTL :: Boolean -> Maybe Char -> Parser String CasedLetter
parseTL b Nothing = pure $ makeCase b TS
parseTL b (Just x)
    | isApost x = anyChar *> (pure $ makeCase b TLY)
    | otherwise = pure $ makeCase b TL

--------------------------

parseM :: Parser String CasedLetter
parseM = do
  b <- isUpperC <$> satisfy (\x -> x == 'm' || x == 'M')
  x <- peekChar
  case x of
    (Just y) -> if isApost' y then (anyChar *> (pure $ makeCase b MY)) else (pure $ makeCase b M)
    _        -> pure $ makeCase b M

parseMonly :: Parser String CasedLetter
parseMonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'm' || x == 'M')
  pure $ makeCase b M

parseN :: Parser String CasedLetter
parseN = do
  b <- isUpperC <$> satisfy (\x -> x == 'n' || x == 'N')
  x <- peekChar
  case x of
    (Just y) -> if isApost' y then (anyChar *> (pure $ makeCase b NY)) else (pure $ makeCase b N)
    _        -> pure $ makeCase b N

parseNonly :: Parser String CasedLetter
parseNonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'n' || x == 'N')
  pure $ makeCase b N

-- ŁłƚǱǲǳɫɬ

-- might want to look at '\313' (NOT \x313), which is an
-- upper-case L with an acute accent.
parseL :: Parser String CasedLetter
parseL = do
  b <- isUpperC <$> satisfy (\x -> x == 'l' || x == 'L')
  x <- peekChar
  case x of
    (Just y) -> if isApost' y then (anyChar *> (pure $ makeCase b LY)) else (pure $ makeCase b L)
    _        -> pure $ makeCase b L

parseLonly :: Parser String CasedLetter
parseLonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'l' || x == 'L')
  pure $ makeCase b L

parseJ :: Parser String CasedLetter
parseJ = do
  b <- isUpperC <$> satisfy (\x -> x == 'j' || x == 'J' || x == 'y' || x == 'Y')
  x <- peekChar
  case x of
    (Just y) -> if isApost' y then (anyChar *> (pure $ makeCase b JY)) else (pure $ makeCase b J)
    _        -> pure $ makeCase b J

parseJonly :: Parser String CasedLetter
parseJonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'j' || x == 'J' || x == 'y' || x == 'Y')
  pure $ makeCase b J

parseW :: Parser String CasedLetter
parseW = do
  b <- isUpperC <$> satisfy (\x -> x == 'w' || x == 'W')
  x <- peekChar
  case x of
    (Just y) -> if isApost' y then (anyChar *> (pure $ makeCase b WY)) else (pure $ makeCase b W)
    _        -> pure $ makeCase b W

parseWonly :: Parser String CasedLetter
parseWonly = do
  b <- isUpperC <$> satisfy (\x -> x == 'w' || x == 'W')
  pure $ makeCase b W

-------------------------------------

parseD :: Parser String CasedLetter
parseD = do
  x <- satisfy (\x -> x == 'd' || x == 'D')
  peekChar >>= parseD' (isUpperC x)

parseDZ :: Parser String CasedLetter
parseDZ = do
  b <- isUpperC <$> satisfy (\x -> x == 'z' || x == 'Z' || x == 'ǳ' || x == 'Ǳ' || x == 'ǲ')
  pure $ makeCase b DZ

-- ŁłƚǱǲǳɫɬ

parseD' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseD' b Nothing = pure $ makeCase b T
parseD' b (Just x)
--  | (isApost x)            = anyChar *> peekChar >>= parseTY
    | (x == 'z' || x == 'Z') = anyChar *> (pure $ makeCase b DZ)
    | (x == 'l' || x == 'L' || x == 'ł' || x == 'ƚ' || x == 'ɫ' || x == 'ɬ' || x == 'Ł') = anyChar *> (pure $ makeCase b DL)
    | otherwise = pure $ makeCase b D

-- maybe deal with Ǳǲǳ later

-----------------------------------------------------------

parseX :: Parser String CasedLetter
parseX = do
  x <- satisfy (\x -> x == 'x' || x == 'X')
  peekChar >>= parseX' (isUpperC x)

parseX' :: Boolean -> (Maybe Char) -> Parser String CasedLetter
parseX' b Nothing  = pure $ makeCase b X
parseX' b (Just x)
    | isUnderline x = anyChar *> peekChar >>= parseXU b
    | isW         x = anyChar *> peekChar >>= parseXW b
    | otherwise     = pure $ makeCase b X

parseXW :: Boolean -> Maybe Char -> Parser String CasedLetter
parseXW b Nothing = pure $ makeCase b XW
parseXW b (Just x)
    | isUnderline x = peekChar *> (pure $ makeCase b XUW)
    | otherwise     = pure $ makeCase b XW

-- Resultant Parser
parseXU :: Boolean -> Maybe Char -> Parser String CasedLetter
parseXU b Nothing = pure $ makeCase b XU
parseXU b (Just x)
    | isW     x = anyChar *> (pure $ makeCase b XUW)
    | otherwise = pure $ makeCase b XU

--------------------------------------------------------

-- || x == 'B'

parseB :: Parser String CasedLetter
parseB = (char 'b' $> Min B) <|> (char 'B' $> Maj B)

parseH :: Parser String CasedLetter
parseH = (char 'h' $> Min H) <|> (char 'H' $> Maj H)

parseS :: Parser String CasedLetter
parseS = (char 's' $> Min S) <|> (char 'S' $> Maj S)

-- ŁłƚǱǲǳɫɬ

parseLH :: Parser String CasedLetter
parseLH = ((satisfy (\x -> x == 'ł' || x == 'ƚ' || x == 'ɫ' || x == 'ɬ')) $> Min LH) <|> (char 'Ł' $> Maj LH)

parseY :: Parser String CasedLetter
parseY = satisfy isApost *> peekChar >>= parseY'

parseY' :: (Maybe Char) -> Parser String CasedLetter
parseY' Nothing = pure (Min Y)
parseY' (Just x)
    | (x == 'm' || x == 'M') = anyChar *> (pure $ makeCase (isUpperC x) MY)
    | (x == 'n' || x == 'N') = anyChar *> (pure $ makeCase (isUpperC x) NY)
    | (x == 'l' || x == 'L') = anyChar *> (pure $ makeCase (isUpperC x) LY)
    | (x == 'y' || x == 'Y') = anyChar *> (pure $ makeCase (isUpperC x) JY)
    | (x == 'w' || x == 'W') = anyChar *> (pure $ makeCase (isUpperC x) WY)
    | otherwise              = pure $ makeCase (isUpperC x) Y -- i.e., the glottal stop takes on the case of the following letter

--------------------------------------
-- Vowels

parseA :: Parser String CasedLetter
parseA = do
  b <- isUpperC <$> satisfy (\x -> x == 'a' || x == 'A')
  x <- peekChar
  case x of
    (Just y) -> if (isUnderline y) then (anyChar *> (pure $ makeCase b AU)) else (pure $ makeCase b A)
    _        -> pure $ makeCase b A
-- a̱
-- x̱

-- 'a̱' == '\x0101'
-- 'Ā' == '\x0100'
parseAU :: Parser String CasedLetter
parseAU = (char '\x0101' $> Min AU) <|> (char '\x0100' $> Maj AU)

parseE :: Parser String CasedLetter
parseE = (char 'e' $> Min E) <|> (char 'E' $> Maj E)

parseI :: Parser String CasedLetter
parseI = (char 'i' $> Min I) <|> (char 'I' $> Maj I)

parseO :: Parser String CasedLetter
parseO = (char 'o' $> Min O) <|> (char 'O' $> Maj O)

parseU :: Parser String CasedLetter
parseU = (char 'u' $> Min U) <|> (char 'U' $> Maj U)

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

-- Handles start of words,
-- where glottal stops aren't notated
parseUmistaWord :: Parser String (List CasedLetter)
parseUmistaWord = parseUmistaLetter >>= parseUmistaWord'

parseUmistaWord' :: CasedLetter -> Parser String (List CasedLetter)
parseUmistaWord' ltr
    | (isKwkVow' ltr) = (append ((caseOf ltr Y):ltr:Nil)) <$> many parseUmistaLetter
    | otherwise       = (Cons ltr)                        <$> many parseUmistaLetter

parseUmistaWordX :: Parser String (List CasedLetter)
parseUmistaWordX = parseUmistaLetterNew >>= parseUmistaWordX'

parseUmistaWordX' :: CasedLetter -> Parser String (List CasedLetter)
parseUmistaWordX' ltr
    | (isKwkVow' ltr) = (append ((caseOf ltr Y):ltr:Nil)) <$> many parseUmistaLetterNew
    | otherwise       = (Cons ltr)                        <$> many parseUmistaLetterNew


caseOf ∷ CasedLetter → KwakLetter → CasedLetter
caseOf (Maj _) x = Maj x
caseOf (Min _) x = Min x

parseUmistaWordA :: Parser String CasedWord
parseUmistaWordA = parseUmistaLetter >>= parseUmistaWordA'

parseUmistaWordA' :: CasedLetter -> Parser String CasedWord
parseUmistaWordA' ltr
    | (isKwkVow' ltr) = KwakW <$> (append ((caseOf ltr Y):ltr:Nil)) <$> many parseUmistaLetter
    | otherwise       = KwakW <$> (Cons ltr)                        <$> many parseUmistaLetter

parseUmistaWordAX :: Parser String CasedWord
parseUmistaWordAX = parseUmistaLetterNew >>= parseUmistaWordAX'

parseUmistaWordAX' :: CasedLetter -> Parser String CasedWord
parseUmistaWordAX' ltr
    | (isKwkVow' ltr) = KwakW <$> (append ((caseOf ltr Y):ltr:Nil)) <$> many parseUmistaLetterNew
    | otherwise       = KwakW <$> (Cons ltr)                        <$> many parseUmistaLetterNew

parseUmistaLetter :: Parser String CasedLetter
parseUmistaLetter = choice 
  [parseA,parseAU,parseE,parseI,parseO,parseU
  ,parseK,parseG,parseKUN,parseGUN,parseX
  ,parseP,parseT,parseM,parseN
  ,parseL,parseW,parseY,parseB,parseH
  ,parseD,parseLH,parseJ,parseS
  ,parseDZ
  ,parseTS'
  ]

parseUmistaLetterNew :: Parser String CasedLetter
parseUmistaLetterNew = choice 
  [parseA,parseAU,parseE,parseI,parseO,parseU
  ,parseK,parseG,parseKUN,parseGUN,parseX
  ,parseP,parseT,parseMonly,parseNonly
  ,parseLonly,parseWonly,parseY,parseB,parseH
  ,parseD,parseLH,parseJonly,parseS
  ,parseDZ
  ,parseTS'
  ]

-- Parse non-alphabetical and non-apostrophe characters
-- until next Umista Char.
parsePuncts :: Parser String CasedChar
parsePuncts = Punct <$> takeWhile1 (\x -> not (isAlpha x || isApostCP x || (x == pip)))
  where pip = codePointFromChar '|'

parsePunctsA :: Parser String CasedWord
parsePunctsA = PunctW <$> takeWhile1 (\x -> not (isAlpha x || isApostCP x))

parseUmistaChar :: Parser String CasedChar
parseUmistaChar = (Kwak <$> parseUmistaLetter) <|> parsePipe <|> (Punct <$> singleton <$> anyCodePoint)

parseUmistaCharX :: Parser String CasedChar
parseUmistaCharX = (Kwak <$> parseUmistaLetterNew) <|> parsePipe <|> (Punct <$> singleton <$> anyCodePoint)

parseUmistaCharNew :: Parser String CasedChar
parseUmistaCharNew = (Kwak <$> parseUmistaLetter) <|> parsePipe <|> parsePuncts <|> (Punct <$> singleton <$> anyCodePoint)

parseUmistaCharNewX :: Parser String CasedChar
parseUmistaCharNewX = (Kwak <$> parseUmistaLetterNew) <|> parsePipe <|> parsePuncts <|> (Punct <$> singleton <$> anyCodePoint)


parseUmistaMain :: Parser String (List CasedChar)
parseUmistaMain = (map Kwak <$> parseUmistaWord) <|> (List.singleton <$> parsePipe) <|> (List.singleton <$> parsePuncts) <|> (List.singleton <$> Punct <$> singleton <$> anyCodePoint)

parseUmistaMainNew :: Parser String (List CasedChar)
parseUmistaMainNew = (map Kwak <$> parseUmistaWordX) <|> (List.singleton <$> parsePipe) <|> (List.singleton <$> parsePuncts) <|> (List.singleton <$> Punct <$> singleton <$> anyCodePoint)

parseUmistaWords :: Parser String (List CasedWord)
parseUmistaWords = toList <$> many1 (parseUmistaWordA <|> parsePunctsA <|> (PunctW <$> singleton <$> anyCodePoint))

parseUmistaWordsNew :: Parser String (List CasedWord)
parseUmistaWordsNew = toList <$> many1 (parseUmistaWordAX <|> parsePunctsA <|> (PunctW <$> singleton <$> anyCodePoint))

-- | The main parser for U'mista. Non-U'mista characters
-- are parsed with `AT.takeWhile1`, so this version is
-- more efficient.
parseUmista :: Parser String (List CasedChar)
parseUmista = concat <$> toList <$> many1 parseUmistaMainNew
-- parseUmista = AT.many1 parseUmistaCharNew

-- | Directly convert some U'mista text to a
-- list of `CasedChar`. Note that if the
-- parser fails, this just returns an empty
-- list. If you want actual error handling,
-- use `parseUmista` together with `AT.parseOnly`.
encodeFromUmista :: String -> (List CasedChar)
encodeFromUmista txt = fromRight Nil $ runParser txt parseUmista

-- | An alternate parser for U'mista. Non-U'mista
-- characters are parsed one at a time. Use this
-- if `parseUmista` is having issues.
parseUmistaOld :: Parser String (List CasedChar)
parseUmistaOld = toList <$> many1 parseUmistaChar

-- | Directly convert some U'mista text to a
-- list of `CasedChar`. Like `parseUmistaOld`,
-- this parses non-U'mista characters one
-- at a time. Note that if the parser fails,
-- this just returns an empty list. If you
-- want actual error handling, use `parseUmista`
-- together with `AT.parseOnly`.
encodeFromUmistaOld :: String -> (List CasedChar)
encodeFromUmistaOld txt = fromRight Nil $ runParser txt parseUmistaOld
-- Əə


