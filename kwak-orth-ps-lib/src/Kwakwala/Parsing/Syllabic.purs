module Kwakwala.Parsing.Syllabic
  ( parseSyllabicW
  , encodeFromSyllabicW
  , encodeFromSyllabicChunkW
  ) where

import Prelude
import Parsing (Parser, runParser, fail)
import Parsing.String (anyChar, anyCodePoint)
import Parsing.String.Basic (takeWhile1)
import Parsing.Combinators (many1, many)

import Control.Alt ((<|>))

import Data.List (List(Nil), (:))
-- import Data.List as List
-- import Data.List.NonEmpty (toList)
import Data.Either (fromRight)
import Data.Foldable (foldMap) -- , fold)
import Data.Maybe (Maybe(..))

import Data.String.CodePoints (CodePoint, codePointFromChar)
import Data.String.CodePoints as CP
-- import Data.String as String
-- import Data.CodePoint.Unicode (isAlpha)
-- import Data.List.Types (toList)

import Kwakwala.Parsing.Helpers 
  -- ( isUpperC
  -- , parsePipe
  ( parsePipeW
  , peekChar
  , peekChar'
  -- , peekCode
  )
import Kwakwala.Types 
  ( CasedChar(..)
  , CasedLetter(..)
  , CasedWord(..)
  , KwakLetter(..)
  )

import Parsing.Chunking   (chunkifyText)
import Parsing.Chunkified (runParserChunk)


-- | A direct encoder for input in the
-- | experimental Syllabic orthography.
-- | Like `parseSyllabicW`, this version
-- | groups letters into words as it 
-- | parses.
-- | 
-- | Like other direct encoders, if any
-- | errors occur, the output will just
-- | be empty. If you want to see errors,
-- | you'll have to use `parseSyllabicW`
-- | together with `runParser`.
encodeFromSyllabicW :: String -> List CasedWord
encodeFromSyllabicW str = fromRight Nil $ runParser str parseSyllabicW

encodeFromSyllabicChunkW :: String -> List CasedWord
encodeFromSyllabicChunkW txt = fromRight Nil $ runParserChunk (chunkifyText 512 256 txt) parseSyllabicW

-- | A parser for converting from the 
-- | experimental Syllabic orthography.
-- | This version gathers letters into
-- | words as it parses input. At the
-- | moment, there isn't a version that
-- | *doesn't* group letters into words
-- | as it parses, since most input
-- | characters represent multiple 
-- | phonemes.
-- |
-- | Like other parsers, you'll need to
-- | run this with `runParser` to 
-- | actually parse things. 
parseSyllabicW :: Parser String (List CasedWord)
parseSyllabicW = many parseSyllabicW1

parseSyllabicW1 :: Parser String CasedWord
parseSyllabicW1 = parseSyllabicWord <|> parsePipeW <|> parsePunctsW <|> (PunctW <<< CP.singleton <$> anyCodePoint)

----------------------------------------------------------------
----------------------------------------------------------------
----------------------------------------------------------------

-- | Parse a Syllabic Word.
-- TODO : handle cases for words that start with
-- a vowel without a preceding glottal stop.
parseSyllabicWord :: Parser String CasedWord
parseSyllabicWord = KwakW <<< foldMap (map Min) <$> (many1 parseTheLetter)

-- Lower-level parsers.
parsePuncts :: Parser String CasedChar
parsePuncts = Punct <$> takeWhile1 (\x -> isNotCAS' x && (x /= mkCP '|'))

parsePunctsW :: Parser String CasedWord
parsePunctsW = PunctW <$> takeWhile1 (\x -> isNotCAS' x && (x /= mkCP '|'))

isCasBlock :: Char -> Boolean
isCasBlock c
  = ('\x1400' <= c) && (c <= '\x167F')

isCasBlockX :: Char -> Boolean
isCasBlockX c
  = ('\x18B0' <= c) && (c <= '\x18FF')

-- | Check if a character is in one of the
-- | two main CAS blocks.
isCAS :: Char -> Boolean
isCAS c = (isCasBlock c) || (isCasBlockX c)

mkCP :: Char -> CodePoint
mkCP = codePointFromChar

-- | Faster variant of (not isCAS) by
-- | first just checking if the code
-- | point is less than U+1400
isNotCAS :: Char -> Boolean
isNotCAS c = (c < '\x1400') || (not $ isCAS c)

isCasBlock' :: CodePoint -> Boolean
isCasBlock' c
  = (mkCP '\x1400' <= c) && (c <= mkCP '\x167F')

isCasBlockX' :: CodePoint -> Boolean
isCasBlockX' c
  = (mkCP '\x18B0' <= c) && (c <= mkCP '\x18FF')

-- | Check if a character is in one of the
-- | two main CAS blocks.
isCAS' :: CodePoint -> Boolean
isCAS' c = (isCasBlock' c) || (isCasBlockX' c)

-- | Faster variant of (not isCAS) by
-- | first just checking if the code
-- | point is less than U+1400
isNotCAS' :: CodePoint -> Boolean
isNotCAS' c = (c < mkCP '\x1400') || (not $ isCAS' c)

----------------------------------------------------------------

-- | Consume a simple Syllable.
consumeSyl :: KwakLetter -> KwakLetter -> Parser String (List KwakLetter)
consumeSyl cns vwl = anyChar *> (pure (cns : vwl : Nil))

-- | Consume a syllable that might be followed
-- | by a labialisation marker.
consumeLab :: KwakLetter -> KwakLetter -> KwakLetter -> Parser String (List KwakLetter)
consumeLab cnsJ cnsW vwl = do
  _ <- anyChar
  x <- peekChar
  case x of
    (Just 'ᐤ') -> anyChar *> pure (cnsW : vwl : Nil)
    _ -> pure (cnsJ : vwl : Nil) 

-- | Consume a simple coda.
consumeCoda :: KwakLetter -> Parser String (List KwakLetter)
consumeCoda coda = anyChar *> (pure (coda : Nil))

-- | Consume a character that might be
-- | part of a multi-codepoint coda.
consumeCoda2 :: Char -> KwakLetter -> KwakLetter -> Parser String (List KwakLetter)
consumeCoda2 chr coda1 coda2 = do
  _ <- anyChar
  x <- peekChar
  case x of
    (Just z) | z == chr -> anyChar *> pure (coda2 : Nil)
    _ -> pure (coda1 : Nil)

-- | Parse the syllable.
parseTheLetter :: Parser String (List KwakLetter)
parseTheLetter = do
  c <- peekChar'
  case c of
    -- Glottal Sound
    'ᐧ' -> anyChar *> (peekChar >>= continueGlot) -- U+1427
    -- Nasal Sounds
    'ᘍ' -> consumeSyl M A  -- U+160D
    'ᘋ' -> consumeSyl M E  -- U+160B
    'ᘌ' -> consumeSyl M I  -- U+160C
    'ᘉ' -> consumeSyl M O  -- U+1609
    'ᘈ' -> consumeSyl M U  -- U+1608
    'ᘊ' -> consumeSyl M AU -- U+160A
    -- N
    'ᘇ' -> consumeSyl N A  -- U+1607
    'ᘅ' -> consumeSyl N E  -- U+1605
    'ᘆ' -> consumeSyl N I  -- U+1606
    'ᘃ' -> consumeSyl N O  -- U+1603
    'ᘂ' -> consumeSyl N U  -- U+1602
    'ᘄ' -> consumeSyl N AU -- U+1604

    -- Simple Plosives
    -- P ^ Voiceless Bilabial Plosive
    'ᙅ' -> consumeSyl P A  -- U+1645
    'ᙃ' -> consumeSyl P E  -- U+1643
    'ᙄ' -> consumeSyl P I  -- U+1644
    'ᙁ' -> consumeSyl P O  -- U+1641
    'ᙀ' -> consumeSyl P U  -- U+1640
    'ᙂ' -> consumeSyl P AU -- U+1642
    -- T ^ Voiceless Alveolar Plosive
    'ᗡ' -> consumeSyl T A  -- U+15E1
    'ᗟ' -> consumeSyl T E  -- U+15DF
    'ᗠ' -> consumeSyl T I  -- U+15E0
    'ᗝ' -> consumeSyl T O  -- U+15DD
    'ᗜ' -> consumeSyl T U  -- U+15DC
    'ᗞ' -> consumeSyl T AU -- U+15DE
    -- Bc  -> case vwl of  -- ^ Voiced Bilabial Plosive
    'ᗭ' -> consumeSyl B A  -- U+15ED
    'ᗫ' -> consumeSyl B E  -- U+15EB
    'ᗬ' -> consumeSyl B I  -- U+15EC
    'ᗩ' -> consumeSyl B O  -- U+15E9
    'ᗨ' -> consumeSyl B U  -- U+15E8
    'ᗪ' -> consumeSyl B AU -- U+15EA
    -- Dc  -> case vwl of  -- ^ Voiced Alveolar Plosive
    'ᑕ' -> consumeSyl D A  -- U+1455
    'ᑓ' -> consumeSyl D E  -- U+1453
    'ᑔ' -> consumeSyl D I  -- U+1454
    'ᑎ' -> consumeSyl D O  -- U+144E
    'ᑌ' -> consumeSyl D U  -- U+144C
    'ᑐ' -> consumeSyl D AU -- U+1450
    -- PYc -> case vwl of  -- ^ Ejective Bilabial Plosive
    'ᙍ' -> consumeSyl PY A  -- U+164D -- "ᙠ"
    'ᙋ' -> consumeSyl PY E  -- U+164B -- "ᙞ"
    'ᙌ' -> consumeSyl PY I  -- U+164C -- "ᙟ"
    'ᙉ' -> consumeSyl PY O  -- U+1649 -- "ᙜ"
    'ᙈ' -> consumeSyl PY U  -- U+1648 -- "ᙛ"
    'ᙊ' -> consumeSyl PY AU -- U+164A -- "ᙝ"
    -- TYc -> case vwl of  -- ^ Ejective Alveolar Plosive
    'ᗧ' -> consumeSyl TY A  -- U+15E7
    'ᗥ' -> consumeSyl TY E  -- U+15E5
    'ᗦ' -> consumeSyl TY I  -- U+15E6
    'ᗣ' -> consumeSyl TY O  -- U+15E3
    'ᗢ' -> consumeSyl TY U  -- U+15E2
    'ᗤ' -> consumeSyl TY AU -- U+15E4
              
    -- Affricates
    -- TSc  -> case vwl of -- ^ Voiceless Alveolar Affricate
    'ᙦ' -> consumeSyl TS A  -- U+1666
    'ᙤ' -> consumeSyl TS E  -- U+1664
    'ᙥ' -> consumeSyl TS I  -- U+1665
    'ᙢ' -> consumeSyl TS O  -- U+1662
    'ᙡ' -> consumeSyl TS U  -- U+1661
    'ᙣ' -> consumeSyl TS AU -- U+1663
    -- TLc  -> case vwl of -- ^ Voiceless Alveolar Lateral Affricate
    'ᘹ' -> consumeSyl TL A  -- U+1639
    'ᘷ' -> consumeSyl TL E  -- U+1637
    'ᘸ' -> consumeSyl TL I  -- U+1638
    'ᘵ' -> consumeSyl TL O  -- U+1635
    'ᘴ' -> consumeSyl TL U  -- U+1634
    'ᘶ' -> consumeSyl TL AU -- U+1636
    -- DZc  -> case vwl of -- ^ Voiced Alveolar Affricate
    'ᙙ' -> consumeSyl DZ A  -- U+1659 -- "ᙍ"
    'ᙗ' -> consumeSyl DZ E  -- U+1657 -- "ᙋ"
    'ᙘ' -> consumeSyl DZ I  -- U+1658 -- "ᙌ"
    'ᙕ' -> consumeSyl DZ O  -- U+1655 -- "ᙉ"
    'ᙔ' -> consumeSyl DZ U  -- U+1654 -- "ᙈ"
    'ᙖ' -> consumeSyl DZ AU -- U+1656 -- "ᙊ"
    -- DLc  -> case vwl of -- ^ Voiced Alveolar Lateral Affricate
    'ᘭ' -> consumeSyl DL A  -- U+162D
    'ᘫ' -> consumeSyl DL E  -- U+162B
    'ᘬ' -> consumeSyl DL I  -- U+162C
    'ᘩ' -> consumeSyl DL O  -- U+1629
    'ᘨ' -> consumeSyl DL U  -- U+1628
    'ᘪ' -> consumeSyl DL AU -- U+162A
    -- TSYc -> case vwl of -- ^ Ejective Alveolar Affricate
    'ᙬ' -> consumeSyl TSY A  -- U+166C
    'ᙪ' -> consumeSyl TSY E  -- U+166A
    'ᙫ' -> consumeSyl TSY I  -- U+166B
    'ᙨ' -> consumeSyl TSY O  -- U+1668
    'ᙧ' -> consumeSyl TSY U  -- U+1667
    'ᙩ' -> consumeSyl TSY AU -- U+1669
    -- TLYc -> case vwl of -- ^ Ejective Alveolar Lateral Affricate
    'ᘿ' -> consumeSyl TLY A  -- U+163F
    'ᘽ' -> consumeSyl TLY E  -- U+163D
    'ᘾ' -> consumeSyl TLY I  -- U+163E
    'ᘻ' -> consumeSyl TLY O  -- U+163B
    'ᘺ' -> consumeSyl TLY U  -- U+163A
    'ᘼ' -> consumeSyl TLY AU -- U+163C
              
    -- Voiceless Fricatives
    -- Sc  -> case vwl of -- ^ Voiceless Alveolar (Sibilant) Fricative
    'ᙓ' -> consumeSyl S A  -- U+1653
    'ᙑ' -> consumeSyl S E  -- U+1651
    'ᙒ' -> consumeSyl S I  -- U+1652
    'ᙏ' -> consumeSyl S O  -- U+164F
    'ᙎ' -> consumeSyl S U  -- U+164E
    'ᙐ' -> consumeSyl S AU -- U+1650
    -- LHc -> case vwl of -- ^ Voiceless Alveolar Lateral Fricative
    'ᘳ' -> consumeSyl LH A  -- U+1633
    'ᘱ' -> consumeSyl LH E  -- U+1631
    'ᘲ' -> consumeSyl LH I  -- U+1632
    'ᘯ' -> consumeSyl LH O  -- U+162F
    'ᘮ' -> consumeSyl LH U  -- U+162E
    'ᘰ' -> consumeSyl LH AU -- U+1630
              
   -- Approximants
   -- Lc  -> case vwl of -- ^ Voiced Alveolar Approximant
    'ᘧ' -> consumeSyl L A  -- U+1627
    'ᘥ' -> consumeSyl L E  -- U+1625
    'ᘦ' -> consumeSyl L I  -- U+1626
    'ᘣ' -> consumeSyl L O  -- U+1623
    'ᘢ' -> consumeSyl L U  -- U+1622
    'ᘤ' -> consumeSyl L AU -- U+1624
   -- Jc  -> case vwl of -- ^ Voiced Palatal Approximant
    'ᘓ' -> consumeSyl J A  -- U+1613
    'ᘑ' -> consumeSyl J E  -- U+1611
    'ᘒ' -> consumeSyl J I  -- U+1612
    'ᘏ' -> consumeSyl J O  -- U+160F
    'ᘎ' -> consumeSyl J U  -- U+160E
    'ᘐ' -> consumeSyl J AU -- U+1610
              
    -- Velar Plosives
    -- Kc   -> case vwl of -- ^ Voiceless Palatalized/Labialized Velar Plosive
    'ᗺ' -> consumeLab K KW A  -- U+15FA
    'ᗸ' -> consumeLab K KW E  -- U+15F8
    'ᗹ' -> consumeLab K KW I  -- U+15F9
    'ᗶ' -> consumeLab K KW O  -- U+15F6
    'ᗵ' -> consumeLab K KW U  -- U+15F5
    'ᗷ' -> consumeLab K KW AU -- U+15F7
    -- Gc   -> case vwl of -- ^ Voiced Palatalized/Labialized Velar Plosive
    'ᗴ' -> consumeLab G GW A  -- U+15F4
    'ᗲ' -> consumeLab G GW E  -- U+15F2
    'ᗳ' -> consumeLab G GW I  -- U+15F3
    'ᗰ' -> consumeLab G GW O  -- U+15F0
    'ᗯ' -> consumeLab G GW U  -- U+15EF
    'ᗱ' -> consumeLab G GW AU -- U+15F1
    -- KYc  -> case vwl of -- ^ Ejective Palatalized/Labialized Velar Plosive
    'ᘀ' -> consumeLab KY KWY A  -- U+1600
    'ᗾ' -> consumeLab KY KWY E  -- U+15FE
    'ᗿ' -> consumeLab KY KWY I  -- U+15FF
    'ᗼ' -> consumeLab KY KWY O  -- U+15FC
    'ᗻ' -> consumeLab KY KWY U  -- U+15FB
    'ᗽ' -> consumeLab KY KWY AU -- U+15FD
              
   -- Uvular Plosives
   -- Note: Substituting J for Q
   -- Qc   -> case vwl of -- ^ Voiceless [Labialized] Uvular Plosive
    'ᘛ' -> consumeLab Q QW A  -- U+161B
    'ᘘ' -> consumeLab Q QW E  -- U+1618
    'ᘙ' -> consumeLab Q QW I  -- U+1619
    'ᘖ' -> consumeLab Q QW O  -- U+1616
    'ᘔ' -> consumeLab Q QW U  -- U+1614
    'ᘗ' -> consumeLab Q QW AU -- U+1617
   -- GUc  -> case vwl of -- ^ Voiced [Labialized] Uvular Plosive
    'ᗏ' -> consumeLab GU GUW A  -- U+15CF
    'ᗍ' -> consumeLab GU GUW E  -- U+15CD
    'ᗎ' -> consumeLab GU GUW I  -- U+15CE
    'ᗋ' -> consumeLab GU GUW O  -- U+15CB
    'ᗊ' -> consumeLab GU GUW U  -- U+15CA
    'ᗌ' -> consumeLab GU GUW AU -- U+15CC
   -- QYc  -> case vwl of -- ^ Ejective [Labialized] Uvular Plosive
    'ᘡ' -> consumeLab QY QWY A  -- U+1621
    'ᘟ' -> consumeLab QY QWY E  -- U+161F
    'ᘠ' -> consumeLab QY QWY I  -- U+1620
    'ᘝ' -> consumeLab QY QWY O  -- U+161D
    'ᘜ' -> consumeLab QY QWY U  -- U+161C
    'ᘞ' -> consumeLab QY QWY AU -- U+161E
              
   -- Velar/Uvular Fricatives
   -- ᗄ ᗅ ᗆ ᗇ ᗈ ᗉ
   -- Xc   -> case vwl of -- ^ Voiceless Palatalized/Labialized Velar Fricative
    'ᗉ' -> consumeLab X XW A  -- U+15C9
    'ᗇ' -> consumeLab X XW E  -- U+15C7
    'ᗈ' -> consumeLab X XW I  -- U+15C8
    'ᗅ' -> consumeLab X XW O  -- U+15C5
    'ᗄ' -> consumeLab X XW U  -- U+15C4
    'ᗆ' -> consumeLab X XW AU -- U+15C6
   -- XUc  -> case vwl of -- ^ Voiceless [Labialized] Uvular Fricative
    'ᗛ' -> consumeLab XU XUW A  -- U+15DB
    'ᗙ' -> consumeLab XU XUW E  -- U+15D9
    'ᗚ' -> consumeLab XU XUW I  -- U+15DA
    'ᗗ' -> consumeLab XU XUW O  -- U+15D7
    'ᗖ' -> consumeLab XU XUW U  -- U+15D6
    'ᗘ' -> consumeLab XU XUW AU -- U+15D8
              
    -- Labial Sounds
    -- Wc  -> case vwl of -- ^ Voiced Labial-Velar Approximant
    'ᗕ' -> consumeSyl W A  -- U+15D5
    'ᗓ' -> consumeSyl W E  -- U+15D3
    'ᗔ' -> consumeSyl W I  -- U+15D4
    'ᗑ' -> consumeSyl W O  -- U+15D1
    'ᗐ' -> consumeSyl W U  -- U+15D0
    'ᗒ' -> consumeSyl W AU -- U+15D2
    -- Hc -> case vwl of -- ^ Voiceless Glottal Fricative
    'ᐸ' -> consumeSyl H A  -- U+1438
    'ᐶ' -> consumeSyl H E  -- U+1436
    'ᐷ' -> consumeSyl H I  -- U+1437
    'ᐱ' -> consumeSyl H O  -- U+1431
    'ᐯ' -> consumeSyl H U  -- U+142F
    'ᐳ' -> consumeSyl H AU -- U+1433
    -- Vowels
    'ᐊ' -> anyChar *> (pure $ A  : Nil) -- U+140A
    'ᐈ' -> anyChar *> (pure $ E  : Nil) -- U+1408
    'ᐉ' -> anyChar *> (pure $ I  : Nil) -- U+1409
    'ᐃ' -> anyChar *> (pure $ O  : Nil) -- U+1403
    'ᐁ' -> anyChar *> (pure $ U  : Nil) -- U+1401
    'ᐅ' -> anyChar *> (pure $ AU : Nil) -- U+1405
    
    'ᑦ' -> consumeCoda M        -- U+1466
    'ᐣ' -> consumeCoda N        -- U+1423
    'ᗮ' -> consumeCoda2 'ᗮ' B P -- U+15EE
    'ᐪ' -> consumeCoda2 'ᐪ' D T -- U+142A
    'ᐩ' -> consumeCoda PY       -- U+1429
    'ᙾ' -> consumeCoda TY       -- U+167E

    'ᙆ' -> consumeCoda2 'ᙆ' DZ TS -- U+1646
    'ᔾ' -> consumeCoda TL         -- U+153E
    'ᕐ' -> consumeCoda DL         -- U+1550
    'ᙇ' -> consumeCoda TSY        -- U+1647
    'ᓫ' -> consumeCoda TLY        -- U+14EB

    'ᔆ' -> consumeCoda S  -- U+1506
    'ᒡ' -> consumeCoda LH -- U+14A1
    'ᑊ' -> consumeCoda L  -- U+144A
    'ᕪ' -> consumeCoda J  -- U+156A
    'ᐞ' -> consumeCoda W  -- U+141E

    -- 'ᐤ' -- U+1424
    'ᐠ' -> consumeCoda2 'ᐤ' K  KW  -- U+1420
    'ᐜ' -> consumeCoda2 'ᐤ' G  GW  -- U+141C
    'ᘁ' -> consumeCoda2 'ᐤ' KY KWY -- U+1601
    'ᒽ' -> consumeCoda2 'ᐤ' Q  QW  -- U+14BD
    'ᐟ' -> consumeCoda2 'ᐤ' GU GUW -- U+141F
    'ᒾ' -> consumeCoda2 'ᐤ' QY QWY -- U+14BE
    'ᐥ' -> consumeCoda2 'ᐤ' X  XW  -- U+1425
    'ᐦ' -> consumeCoda2 'ᐤ' XU XUW -- U+1426

    'ᑋ' -> consumeCoda H -- U+144B

    _ -> fail "Not a syllabic character."

continueGlot :: (Maybe Char) -> Parser String (List KwakLetter)
continueGlot Nothing = pure $ (Y : Nil)
continueGlot (Just c) = case c of
  -- 'M
  'ᘍ' -> consumeSyl MY A  -- U+160D
  'ᘋ' -> consumeSyl MY E  -- U+160B
  'ᘌ' -> consumeSyl MY I  -- U+160C
  'ᘉ' -> consumeSyl MY O  -- U+1609
  'ᘈ' -> consumeSyl MY U  -- U+1608
  'ᘊ' -> consumeSyl MY AU -- U+160A
  -- 'N
  'ᘇ' -> consumeSyl NY A  -- U+1607
  'ᘅ' -> consumeSyl NY E  -- U+1605
  'ᘆ' -> consumeSyl NY I  -- U+1606
  'ᘃ' -> consumeSyl NY O  -- U+1603
  'ᘂ' -> consumeSyl NY U  -- U+1602
  'ᘄ' -> consumeSyl NY AU -- U+1604  

  -- 'L
  'ᘧ' -> consumeSyl LY A  -- U+1627
  'ᘥ' -> consumeSyl LY E  -- U+1625
  'ᘦ' -> consumeSyl LY I  -- U+1626
  'ᘣ' -> consumeSyl LY O  -- U+1623
  'ᘢ' -> consumeSyl LY U  -- U+1622
  'ᘤ' -> consumeSyl LY AU -- U+1624
  -- 'J
  'ᘓ' -> consumeSyl JY A   -- U+1613
  'ᘑ' -> consumeSyl JY E   -- U+1611
  'ᘒ' -> consumeSyl JY I   -- U+1612
  'ᘏ' -> consumeSyl JY O   -- U+160F
  'ᘎ' -> consumeSyl JY U   -- U+160E
  'ᘐ' -> consumeSyl JY AU  -- U+1610

  -- 'W
  'ᗕ' -> consumeSyl WY A   -- U+15D5
  'ᗓ' -> consumeSyl WY E   -- U+15D3
  'ᗔ' -> consumeSyl WY I   -- U+15D4
  'ᗑ' -> consumeSyl WY O   -- U+15D1
  'ᗐ' -> consumeSyl WY U   -- U+15D0
  'ᗒ' -> consumeSyl WY AU  -- U+15D2

  -- Glottalised Codas
  'ᑦ' -> consumeCoda MY -- U+1466
  'ᐣ' -> consumeCoda NY -- U+1423
  'ᑊ' -> consumeCoda LY -- U+144A
  'ᕪ' -> consumeCoda JY -- U+156A
  'ᐞ' -> consumeCoda WY -- U+141E

  _ -> pure (Y : Nil)

