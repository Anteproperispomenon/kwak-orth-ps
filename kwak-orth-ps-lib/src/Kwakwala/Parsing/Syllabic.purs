module Kwakwala.Parsing.Syllabic
  ( parseSyllabicW
  , encodeFromSyllabicW
  ) where

import Prelude
import Parsing (Parser, runParser, fail)
import Parsing.String (char, anyChar, satisfy, anyCodePoint)
import Parsing.String.Basic (takeWhile1)
import Parsing.Combinators (many1, choice, many, try)

import Control.Alt ((<|>))

import Data.List (List(Nil, Cons), (:), concat, singleton)
import Data.List as List
import Data.List.NonEmpty (toList)
import Data.Either (fromRight)
import Data.Foldable (fold, foldMap)
import Data.Maybe (Maybe(..))

import Data.String.CodePoints (CodePoint, codePointFromChar)
import Data.String.CodePoints as CP
import Data.String as String
import Data.CodePoint.Unicode (isAlpha)
-- import Data.List.Types (toList)

import Kwakwala.Parsing.Helpers 
  ( isUpperC
  , parsePipe
  , parsePipeW
  , peekChar
  , peekChar'
  , peekCode
  , consumeMin
  , consumeMaj
  , continueMin
  , continueMaj
  )
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
    'ᐧ' -> anyChar *> (peekChar >>= continueGlot)
    -- Nasal Sounds
    'ᘍ' -> consumeSyl M A
    'ᘋ' -> consumeSyl M E
    'ᘌ' -> consumeSyl M I
    'ᘉ' -> consumeSyl M O
    'ᘈ' -> consumeSyl M U
    'ᘊ' -> consumeSyl M AU
    -- N
    'ᘇ' -> consumeSyl N A
    'ᘅ' -> consumeSyl N E
    'ᘆ' -> consumeSyl N I
    'ᘃ' -> consumeSyl N O
    'ᘂ' -> consumeSyl N U
    'ᘄ' -> consumeSyl M AU

    -- Simple Plosives
    'ᙅ' -> consumeSyl P A
    'ᙃ' -> consumeSyl P E
    'ᙄ' -> consumeSyl P I
    'ᙁ' -> consumeSyl P O
    'ᙀ' -> consumeSyl P U
    'ᙂ' -> consumeSyl P AU
    -- T
    'ᗡ' -> consumeSyl T A
    'ᗟ' -> consumeSyl T E
    'ᗠ' -> consumeSyl T I
    'ᗝ' -> consumeSyl T O
    'ᗜ' -> consumeSyl T U
    'ᗞ' -> consumeSyl T AU
    -- Bc  -> case vwl of  -- ^ Voiced Bilabial Plosive
    'ᗭ' -> consumeSyl B A
    'ᗫ' -> consumeSyl B E
    'ᗬ' -> consumeSyl B I
    'ᗩ' -> consumeSyl B O
    'ᗨ' -> consumeSyl B U
    'ᗪ' -> consumeSyl B AU
    -- Dc  -> case vwl of  -- ^ Voiced Alveolar Plosive
    'ᑕ' -> consumeSyl D A
    'ᑓ' -> consumeSyl D E
    'ᑔ' -> consumeSyl D I
    'ᑎ' -> consumeSyl D O
    'ᑌ' -> consumeSyl D U
    'ᑐ' -> consumeSyl D AU
    -- PYc -> case vwl of  -- ^ Ejective Bilabial Plosive
    'ᙍ' -> consumeSyl PY A -- "ᙠ"
    'ᙋ' -> consumeSyl PY E -- "ᙞ"
    'ᙌ' -> consumeSyl PY I -- "ᙟ"
    'ᙉ' -> consumeSyl PY O -- "ᙜ"
    'ᙈ' -> consumeSyl PY U -- "ᙛ"
    'ᙊ' -> consumeSyl PY AU -- "ᙝ"
    -- TYc -> case vwl of  -- ^ Ejective Alveolar Plosive
    'ᗧ' -> consumeSyl TY A 
    'ᗥ' -> consumeSyl TY E 
    'ᗦ' -> consumeSyl TY I 
    'ᗣ' -> consumeSyl TY O 
    'ᗢ' -> consumeSyl TY U 
    'ᗤ' -> consumeSyl TY AU
              
    -- Affricates
    -- TSc  -> case vwl of -- ^ Voiceless Alveolar Affricate
    'ᙦ' -> consumeSyl TS A 
    'ᙤ' -> consumeSyl TS E 
    'ᙥ' -> consumeSyl TS I 
    'ᙢ' -> consumeSyl TS O 
    'ᙡ' -> consumeSyl TS U 
    'ᙣ' -> consumeSyl TS AU
    -- TLc  -> case vwl of -- ^ Voiceless Alveolar Lateral Affricate
    'ᘹ' -> consumeSyl TL A 
    'ᘷ' -> consumeSyl TL E 
    'ᘸ' -> consumeSyl TL I 
    'ᘵ' -> consumeSyl TL O 
    'ᘴ' -> consumeSyl TL U 
    'ᘶ' -> consumeSyl TL AU
    -- DZc  -> case vwl of -- ^ Voiced Alveolar Affricate
    'ᙙ' -> consumeSyl DZ A  -- "ᙍ"
    'ᙗ' -> consumeSyl DZ E  -- "ᙋ"
    'ᙘ' -> consumeSyl DZ I  -- "ᙌ"
    'ᙕ' -> consumeSyl DZ O  -- "ᙉ"
    'ᙔ' -> consumeSyl DZ U  -- "ᙈ"
    'ᙖ' -> consumeSyl DZ AU -- "ᙊ"
    -- DLc  -> case vwl of -- ^ Voiced Alveolar Lateral Affricate
    'ᘭ' -> consumeSyl DL A 
    'ᘫ' -> consumeSyl DL E 
    'ᘬ' -> consumeSyl DL I 
    'ᘩ' -> consumeSyl DL O 
    'ᘨ' -> consumeSyl DL U 
    'ᘪ' -> consumeSyl DL AU
    -- TSYc -> case vwl of -- ^ Ejective Alveolar Affricate
    'ᙬ' -> consumeSyl TSY A 
    'ᙪ' -> consumeSyl TSY E 
    'ᙫ' -> consumeSyl TSY I 
    'ᙨ' -> consumeSyl TSY O 
    'ᙧ' -> consumeSyl TSY U 
    'ᙩ' -> consumeSyl TSY AU
    -- TLYc -> case vwl of -- ^ Ejective Alveolar Lateral Affricate
    'ᘿ' -> consumeSyl TLY A 
    'ᘽ' -> consumeSyl TLY E 
    'ᘾ' -> consumeSyl TLY I 
    'ᘻ' -> consumeSyl TLY O 
    'ᘺ' -> consumeSyl TLY U 
    'ᘼ' -> consumeSyl TLY AU
              
    -- Voiceless Fricatives
    -- Sc  -> case vwl of -- ^ Voiceless Alveolar (Sibilant) Fricative
    'ᙓ' -> consumeSyl S A 
    'ᙑ' -> consumeSyl S E 
    'ᙒ' -> consumeSyl S I 
    'ᙏ' -> consumeSyl S O 
    'ᙎ' -> consumeSyl S U 
    'ᙐ' -> consumeSyl S AU
    -- LHc -> case vwl of -- ^ Voiceless Alveolar Lateral Fricative
    'ᘳ' -> consumeSyl LH A 
    'ᘱ' -> consumeSyl LH E 
    'ᘲ' -> consumeSyl LH I 
    'ᘯ' -> consumeSyl LH O 
    'ᘮ' -> consumeSyl LH U 
    'ᘰ' -> consumeSyl LH AU
              
   -- Approximants
   -- Lc  -> case vwl of -- ^ Voiced Alveolar Approximant
    'ᘧ' -> consumeSyl L A 
    'ᘥ' -> consumeSyl L E 
    'ᘦ' -> consumeSyl L I 
    'ᘣ' -> consumeSyl L O 
    'ᘢ' -> consumeSyl L U 
    'ᘤ' -> consumeSyl L AU
   -- LYc -> case vwl of -- ^ Glottalized Voiced Alveolar Approximant
   --   Av  -> "ᐧᘧ"
   --   Ev  -> "ᐧᘥ"
   --   Iv  -> "ᐧᘦ"
   --   Ov  -> "ᐧᘣ"
   --   Uv  -> "ᐧᘢ"
   --   AUv -> "ᐧᘤ"
   -- Jc  -> case vwl of -- ^ Voiced Palatal Approximant
    'ᘓ' -> consumeSyl J A 
    'ᘑ' -> consumeSyl J E 
    'ᘒ' -> consumeSyl J I 
    'ᘏ' -> consumeSyl J O 
    'ᘎ' -> consumeSyl J U 
    'ᘐ' -> consumeSyl J AU
   -- JYc -> case vwl of -- ^ Glottalized Voiced Palatal Approximant
   --   Av  -> "ᐧᘓ"
   --   Ev  -> "ᐧᘑ"
   --   Iv  -> "ᐧᘒ"
   --   Ov  -> "ᐧᘏ"
   --   Uv  -> "ᐧᘎ"
   --   AUv -> "ᐧᘐ"
              
    -- Velar Plosives
    -- Kc   -> case vwl of -- ^ Voiceless (Palatalized) Velar Plosive
    'ᗺ' -> consumeLab K KW A 
    'ᗸ' -> consumeLab K KW E 
    'ᗹ' -> consumeLab K KW I 
    'ᗶ' -> consumeLab K KW O 
    'ᗵ' -> consumeLab K KW U 
    'ᗷ' -> consumeLab K KW AU
    -- Gc   -> case vwl of -- ^ Voiced (Palatalized) Velar Plosive
    'ᗴ' -> consumeLab G GW A 
    'ᗲ' -> consumeLab G GW E 
    'ᗳ' -> consumeLab G GW I 
    'ᗰ' -> consumeLab G GW O 
    'ᗯ' -> consumeLab G GW U 
    'ᗱ' -> consumeLab G GW AU
    -- KYc  -> case vwl of -- ^ Ejective (Palatalized) Velar Plosive
    'ᘀ' -> consumeLab KY KWY A 
    'ᗾ' -> consumeLab KY KWY E 
    'ᗿ' -> consumeLab KY KWY I 
    'ᗼ' -> consumeLab KY KWY O 
    'ᗻ' -> consumeLab KY KWY U 
    'ᗽ' -> consumeLab KY KWY AU
   -- KWYc -> case vwl of -- ^ Ejective Labialized Velar Plosive
   --   Av  -> "ᘀᐤ" -- "ᘁᗕ"
   --   Ev  -> "ᗾᐤ" -- "ᘁᗓ"
   --   Iv  -> "ᗿᐤ" -- "ᘁᗔ"
   --   Ov  -> "ᗼᐤ" -- "ᘁᗑ"
   --   Uv  -> "ᗻᐤ" -- "ᘁᗐ"
   --   AUv -> "ᗽᐤ" -- "ᘁᗒ"
              
   -- Uvular Plosives
   -- Note: Substituting J for Q
   -- Qc   -> case vwl of -- ^ Voiceless Uvular Plosive
    'ᘛ' -> consumeLab Q QW A 
    'ᘘ' -> consumeLab Q QW E 
    'ᘙ' -> consumeLab Q QW I 
    'ᘖ' -> consumeLab Q QW O 
    'ᘔ' -> consumeLab Q QW U 
    'ᘗ' -> consumeLab Q QW AU
   -- QWc  -> case vwl of -- ^ Voiveless Labialized Uvular Plosive
   --   Av  -> "ᘛᐤ" -- "ᒽᗕ"
   --   Ev  -> "ᘘᐤ" -- "ᒽᗓ"
   --   Iv  -> "ᘙᐤ" -- "ᒽᗔ"
   --   Ov  -> "ᘖᐤ" -- "ᒽᗑ"
   --   Uv  -> "ᘔᐤ" -- "ᒽᗐ"
   --   AUv -> "ᘗᐤ" -- "ᒽᗒ"
   -- GUc  -> case vwl of -- ^ Voiced Uvular Plosive
    'ᗏ' -> consumeLab GU GUW A 
    'ᗍ' -> consumeLab GU GUW E 
    'ᗎ' -> consumeLab GU GUW I 
    'ᗋ' -> consumeLab GU GUW O 
    'ᗊ' -> consumeLab GU GUW U 
    'ᗌ' -> consumeLab GU GUW AU
   -- GUWc -> case vwl of -- ^ Voiced Labialized Uvular Plosive
   --   Av  -> "ᗏᐤ"
   --   Ev  -> "ᗍᐤ"
   --   Iv  -> "ᗎᐤ"
   --   Ov  -> "ᗋᐤ"
   --   Uv  -> "ᗊᐤ"
   --   AUv -> "ᗌᐤ"
   -- QYc  -> case vwl of -- ^ Ejective Uvular Plosive
    'ᘡ' -> consumeLab QY QWY A 
    'ᘟ' -> consumeLab QY QWY E 
    'ᘠ' -> consumeLab QY QWY I 
    'ᘝ' -> consumeLab QY QWY O 
    'ᘜ' -> consumeLab QY QWY U 
    'ᘞ' -> consumeLab QY QWY AU
   -- QWYc -> case vwl of -- ^ Ejective Labialized Uvular Plosive
   --   Av  -> "ᘡᐤ"
   --   Ev  -> "ᘟᐤ"
   --   Iv  -> "ᘠᐤ"
   --   Ov  -> "ᘝᐤ"
   --   Uv  -> "ᘜᐤ"
   --   AUv -> "ᘞᐤ"
              
   -- Velar/Uvular Fricatives
   -- ᗄ ᗅ ᗆ ᗇ ᗈ ᗉ
   -- Xc   -> case vwl of -- ^ Voiceless (Palatalized) Velar Fricative
    'ᗉ' -> consumeLab X XW A 
    'ᗇ' -> consumeLab X XW E 
    'ᗈ' -> consumeLab X XW I 
    'ᗅ' -> consumeLab X XW O 
    'ᗄ' -> consumeLab X XW U 
    'ᗆ' -> consumeLab X XW AU
   -- XWc  -> case vwl of -- ^ Voiceless Labialized Velar Fricative
   --   Av  -> "ᗉᐤ"
   --   Ev  -> "ᗇᐤ"
   --   Iv  -> "ᗈᐤ"
   --   Ov  -> "ᗅᐤ"
   --   Uv  -> "ᗄᐤ"
   --   AUv -> "ᗆᐤ"
   -- XUc  -> case vwl of -- ^ Voiceless Uvular Fricative
    'ᗛ' -> consumeLab XU XUW A 
    'ᗙ' -> consumeLab XU XUW E 
    'ᗚ' -> consumeLab XU XUW I 
    'ᗗ' -> consumeLab XU XUW O 
    'ᗖ' -> consumeLab XU XUW U 
    'ᗘ' -> consumeLab XU XUW AU
   -- XUWc -> case vwl of -- ^ Voiceless Labialized Uvular Fricative
   --   Av  -> "ᗛᐤ"
   --   Ev  -> "ᗙᐤ"
   --   Iv  -> "ᗚᐤ"
   --   Ov  -> "ᗗᐤ"
   --   Uv  -> "ᗖᐤ"
   --   AUv -> "ᗘᐤ"
              
    -- Labial Sounds
    -- Wc  -> case vwl of -- ^ Voiced Labial-Velar Approximant
    'ᗕ' -> consumeSyl W A 
    'ᗓ' -> consumeSyl W E 
    'ᗔ' -> consumeSyl W I 
    'ᗑ' -> consumeSyl W O 
    'ᗐ' -> consumeSyl W U 
    'ᗒ' -> consumeSyl W AU
    -- WYc -> case vwl of -- ^ Glottalized Voiced Labial-Velar Approximant
    --   Av  -> "ᐧᗕ"
    --   Ev  -> "ᐧᗓ"
    --   Iv  -> "ᐧᗔ"
    --   Ov  -> "ᐧᗑ"
    --   Uv  -> "ᐧᗐ"
    --   AUv -> "ᐧᗒ"
    -- Hc -> case vwl of -- ^ Voiceless Glottal Fricative
    'ᐸ' -> consumeSyl H A 
    'ᐶ' -> consumeSyl H E 
    'ᐷ' -> consumeSyl H I 
    'ᐱ' -> consumeSyl H O 
    'ᐯ' -> consumeSyl H U 
    'ᐳ' -> consumeSyl H AU
    -- Vowels
    'ᐊ' -> anyChar *> (pure $ A  : Nil)
    'ᐈ' -> anyChar *> (pure $ E  : Nil)
    'ᐉ' -> anyChar *> (pure $ I  : Nil)
    'ᐃ' -> anyChar *> (pure $ O  : Nil)
    'ᐁ' -> anyChar *> (pure $ U  : Nil)
    'ᐅ' -> anyChar *> (pure $ AU : Nil)
    
    'ᑦ' -> consumeCoda M
    'ᐣ' -> consumeCoda N
    'ᗮ' -> consumeCoda2 'ᗮ' B P
    'ᐪ' -> consumeCoda2 'ᐪ' D T
    'ᐩ' -> consumeCoda PY
    'ᙾ' -> consumeCoda TY

    'ᙆ' -> consumeCoda2 'ᙆ' DZ TS
    'ᔾ' -> consumeCoda TL
    'ᕐ' -> consumeCoda DL
    'ᙇ' -> consumeCoda TSY
    'ᓫ' -> consumeCoda TLY

    'ᔆ' -> consumeCoda S
    'ᒡ' -> consumeCoda LH
    'ᑊ' -> consumeCoda L
    'ᕪ' -> consumeCoda J
    'ᐞ' -> consumeCoda W

    'ᐠ' -> consumeCoda2 'ᐤ' K KW
    'ᐜ' -> consumeCoda2 'ᐤ' G GW
    'ᘁ' -> consumeCoda2 'ᐤ' KY KWY
    'ᒽ' -> consumeCoda2 'ᐤ' Q QW
    'ᐟ' -> consumeCoda2 'ᐤ' GU GUW
    'ᒾ' -> consumeCoda2 'ᐤ' QY QWY
    'ᐥ' -> consumeCoda2 'ᐤ' X XW
    'ᐦ' -> consumeCoda2 'ᐤ' XU XUW

    'ᑋ' -> consumeCoda H


    -- Glottal Sounds
    -- Yc -> case vwl of -- ^ Voiceless Glottal Plosive
    --   Av  -> "ᐧᐊ"
    --   Ev  -> "ᐧᐈ"
    --   Iv  -> "ᐧᐉ"
    --   Ov  -> "ᐧᐃ"
    --   Uv  -> "ᐧᐁ"
    --   AUv -> "ᐧᐅ"
 
    -- Need to handle codas

    _ -> fail "Not a syllabic character."

continueGlot :: (Maybe Char) -> Parser String (List KwakLetter)
continueGlot Nothing = pure $ (Y : Nil)
continueGlot (Just c) = case c of
  -- 'M
  'ᘍ' -> consumeSyl MY A
  'ᘋ' -> consumeSyl MY E
  'ᘌ' -> consumeSyl MY I
  'ᘉ' -> consumeSyl MY O
  'ᘈ' -> consumeSyl MY U
  'ᘊ' -> consumeSyl MY AU
  -- 'N
  'ᘇ' -> consumeSyl NY A
  'ᘅ' -> consumeSyl NY E
  'ᘆ' -> consumeSyl NY I
  'ᘃ' -> consumeSyl NY O
  'ᘂ' -> consumeSyl NY U
  'ᘄ' -> consumeSyl MY AU  

  -- 'L
  'ᘧ' -> consumeSyl LY A 
  'ᘥ' -> consumeSyl LY E 
  'ᘦ' -> consumeSyl LY I 
  'ᘣ' -> consumeSyl LY O 
  'ᘢ' -> consumeSyl LY U 
  'ᘤ' -> consumeSyl LY AU
  -- 'J
  'ᘓ' -> consumeSyl JY A 
  'ᘑ' -> consumeSyl JY E 
  'ᘒ' -> consumeSyl JY I 
  'ᘏ' -> consumeSyl JY O 
  'ᘎ' -> consumeSyl JY U 
  'ᘐ' -> consumeSyl JY AU

  -- 'W
  'ᗕ' -> consumeSyl WY A 
  'ᗓ' -> consumeSyl WY E 
  'ᗔ' -> consumeSyl WY I 
  'ᗑ' -> consumeSyl WY O 
  'ᗐ' -> consumeSyl WY U 
  'ᗒ' -> consumeSyl WY AU

  -- Glottalised Codas
  'ᑦ' -> consumeCoda MY
  'ᐣ' -> consumeCoda NY
  'ᑊ' -> consumeCoda LY
  'ᕪ' -> consumeCoda JY
  'ᐞ' -> consumeCoda WY

  _ -> pure (Y : Nil)

