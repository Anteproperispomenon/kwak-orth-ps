{-|
Module      : Kwakwala.Output.Arabic
Description : Experimental Arabic Orthography
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | Experimental use of Arabic Script
-- | to write Kwak'wala.

module Kwakwala.Output.Arabic
  ( outputArabicWord
  , outputArabicWords
  , outputArabicChars
  , outputArabicWordsI
  , outputArabicCharsI
  , outputArabicWFR
  , ArabicOptions
  , defArabicOptions
  , ArabicLhOption(..)
  , ArabicGuOption(..)
  , ArabicGOption(..)
  , ArabicAOption(..)
  , ArabicEOption(..)
  , ArabicIOption(..)
  , ArabicOOption(..)
  , ArabicUOption(..)
  ) where

import Prelude

import Data.List (List(..))
import Data.Foldable (foldMap)

import Kwakwala.Types 
  ( CasedChar(..)
  , CasedLetter(..)
  , CasedWord(..)
  , KwakLetter(..)
  , isCharLetter
  , stripCase
  )

-- لٔب

-- hamza above: \x654
-- hamza below: \x655

-- Idea: for letters that have extra
-- diacritics (usually labialisation),
-- use hamza below instead.

-- Standard Arabic Characters
-- (By unicode codepoint)
-- alef    \x627 /a/ etc... ا
-- beh     \x628 /b/  ب
-- marbuta \x629 ???  ة
-- Teh     \x62a /t/  ت
-- Theh    \x62b /θ/  ث
-- Jeem    \x62c /d͡ʒ/ ج
-- Hah     \x62d /ħ/ ح
-- Khah    \x62e /x/ خ
-- Dal     \x62f /d/ د
-- Dhal    \x630 /ð/ ذ
-- Reh     \x631 /r/ ر
-- Zain    \x632 /z/ ز
-- Seen    \x633 /s/ س
-- Sheen   \x634 /ʃ/ ش
-- Sad     \x635 /sˤ/ ص
-- Dad     \x636 /dˤ/ ض
-- Tah     \x637 /tˤ/ ط
-- Zah     \x638 /ðˤ/ ظ
-- Ain     \x639 /ʕ/ ع
-- Ghain   \x63a /ɣ/ غ
-- Tatweel \x640 /-/ ـ (stylistic only)

-- Feh     \x641 /f/ ف
-- Qaf     \x642 /q/ ق
-- Kaf     \x643 /k/ ك
-- Lam     \x644 /l/ ل
-- Meem    \x645 /m/ م
-- Noon    \x646 /n/ ن
-- Heh     \x647 /h/ ه
-- Waw     \x648 /w/ or /u/ و
-- Maksura \x649 ??? ى
-- Yeh     \x64a /j/ or /i/ ي

-- Diacrtics:
-- Fathatan \x64b ??? ـً
-- Dammatan \x64c ??? ـٌ
-- Kasratan \x64d ??? ـٍ
-- Fatha    \x64e /a/ ـَ
-- Damma    \x64f /u/ ـُ
-- Kasra    \x650 /i/ ـِ
-- Shadda   \x651 gemination ـّ
-- Sukun    \x652 /ø/ ـْ
-- 
-- Hamza**  \x654 ـٔ
-- Hamza**  \x655 ـٕ
--
-- Aleph    \x670 ـٰ

-- Additional Letters
-- The   \x67a /ʈʰ/ ٺ
-- Beh   \x67b /ɓ/ ٻ (implosive)
-- Teh   \x67c /ʈ/ ټ (retroflex; Pashto)
-- Teh   \x67d /ʈ/ ٽ (refroflex; Shindhi)
-- Peh   \x67e /p/ پ
-- Teheh \x67f /t͡ɕʰ/ ٿ

-- Zim    \x681 /d͡z/ ځ
-- ???    \x682 ???? ڂ
-- Tshe*  \x683 /t͡ɕ/ ڃ
-- Tse*   \x684 /t͡s/ ڄ
-- Ce     \x685 /t͡s/ څ
-- Che    \x686 /t͡ʃ/ چ
-- Tchehe \x687 /t͡ʃʰ/, /ʈ͡ʂ/, etc...  ڇ
-- Ddal   \x688 /ɖ/ ڈ (retroflex)
-- Dal    \x689 /ɖ/ ډ (retroflex)
-- Dhal*  \x68a /ᶑ/ ڊ (implosive)
-- ???    \x68b ??? ڋ
-- Dhal   \x68c /d̪ʱ/ ڌ
-- Ddahal \x68d ??? ڍ
-- Dul    \x68e ??? ڎ
-- ???    \x68f ??? ڏ
-- ???    \x690 ??? ڐ
-- Re     \x691 /ɽ/ ڑ
-- ???    \x692 ??? ڒ
-- Re     \x693 /ɭ̆/ ړ
-- ???    \x694 ??? ڔ
-- Rehh   \x695 /r/ ڕ (Sorani dialect of Kurdish)
-- Gze    \x696 /ʐ/ or /ɡ/ or /ʝ/ ږ
-- ???    \x697 ??? ڗ
-- Zhe    \x698 /ʒ/ ژ
-- ???    \x699 ??? ڙ
-- Xin    \x69a /x/ or /ʂ/ or /ç/ ښ
-- ???    \x69b ??? ڛ
-- <none> \x69c /t͡ʃ/ ڜ
-- ???    \x69d ??? ڝ
-- Ci*    \x69e /tsʰ/ ڞ
-- ???    \x69f ??? ڟ
-- Nga    \x6a0 /ŋ/ ڠ
-- Fehh*  \x6a1 ??? ڡ
-- ???    \x6a2 ??? ڢ
-- ???    \x6a3 ??? ڣ
-- Veh    \x6a4 /v/ ڤ
-- Vi     \x6a5 /v/ ڥ
-- Peheh  \x6a6 ??? ڦ
-- Qaf'   \x6a7 /q?/ ڧ
-- Ga     \x6a8 /g/ ڨ
-- Kheh   \x6a9 /kʰ/ ک
-- Kaf    \x6aa /k/ ڪ (usually just a stylistic version of Kaf)
-- Gaf    \x6ab /g/ ګ
-- Gaf    \x6ac /g/ ڬ
-- Ng     \x6ad /ŋ/ ڭ
-- ???    \x6ae ??? ڮ
-- Gaf    \x6af /g/ گ
-- ???    \x6b0 ??? ڰ
-- Ngah*  \x6b1 /ŋ/ ڱ
-- ???    \x6b2 ??? ڲ
-- Gah*   \x6b3 /ɠ/ ڳ
-- ???    \x6b4 ??? ڴ
-- Lhah   \x6b5 /ɫ/ or /ʎ/ ڵ
-- ???    \x6b6 ??? ڶ
-- ???    \x6b7 ??? ڷ
-- ???**  \x6b8 ??? ڸ
-- ???**  \x6b9 ??? ڹ
-- Noon Ghunna \x6ba ??? ں
-- Njah*  \x6bb /ɳ/ ڻ
-- Njah*  \x6bc /ɳ/ or /ɲ/ ڼ
-- Nya    \x6bd /ɲ/ ڽ

-- Heh Doachashmee  \x6be /ʰ/ or /h/ ھ 
-- Tchekh* **       \x6bf ??? ڿ
-- Heh Hamza        \x6c0 ??? ۀ (noncombining, it seems)
-- Heh Goal         \x6c1 ??? ہ (combining)
-- Heh Goal Hamza   \x6c2 ??? ۂ
-- Teh Marbuta Goal \x6c3 ??? ۃ
-- Sod              \x6c4 /s/ ۄ

-- Oe        \x6c5 /ɵ/ ۅ
-- O         \x6c6 /o/ or /u/ or /ø/ ۆ
-- U         \x6c7 /u/ ۇ
-- 
-- O         \x6c9 /ɔ/ ۉ
-- 
-- V*        \x6cb /v/ or /w/ /ʊw/ /ʉw/ ۋ
-- Narina Ye \x6cc /ɑj/ or /j/ ی
-- Xezina Ye \x6cd /əi/ ۍ
-- E         \x6ce /e/  ێ
-- Va        \x6cf /v/? ۏ
-- Ye        \x6d0 /e/  ې
-- Nya       \x6d1 /ɲ/ ۑ
-- Big Ye    \x6d2 /ɛ/ or /e/ ے (end only)
-- Yeh-Hamza \x6d3 ??? ۓ
-- Full Stop \x6d4 ۔
-- Ae        \x6d5 /æ/ or /ɛ/ ە


-- * No listed name in article or Character Map
-- ** Not listed in Character Map
-- Sources: 
-- https://en.wikipedia.org/wiki/Arabic_alphabet
-- https://en.wikipedia.org/wiki/Arabic_script
-- https://www.compart.com/en/unicode/U+06B9 etc...
-- https://unicode-explorer.com/c/0670 etc... 

type ArabicOptions
  = { arbLhKind :: ArabicLhOption
    , arbGuKind :: ArabicGuOption
    , arbGKind  :: ArabicGOption
    , arbAKind  :: ArabicAOption
    , arbEKind  :: ArabicEOption
    , arbIKind  :: ArabicIOption
    , arbOKind  :: ArabicOOption
    , arbUKind  :: ArabicUOption
    , combHamza :: Boolean
    -- , arbEjectHamzah :: Boolean
    }

defArabicOptions :: ArabicOptions
defArabicOptions = 
  { arbLhKind : LhSheen
  , arbGuKind : GuLikeQ
  , arbGKind  : GLikeK
  , arbAKind  : AAlifDia
  , arbEKind  : EAlifDia
  , arbIKind  : IStandard
  , arbOKind  : OAlifDia
  , arbUKind  : UStandard
  , combHamza : true
  -- , arbEjectHamzah : true
  }

data ArabicLhOption = LhSheen | LhLhah
data ArabicGuOption = GuGhain | GuLikeQ
data ArabicGOption = GLikeQ | GLikeK

data ArabicAOption = AAlifDia
data ArabicEOption = EAlifDia | EWedgeI
data ArabicIOption = IStandard 
data ArabicOOption = OAlifDia | OWedgeU
data ArabicUOption = UStandard

derive instance eqArbLh :: Eq ArabicLhOption
derive instance eqArbGu :: Eq ArabicGuOption
derive instance eqArbG  :: Eq ArabicGOption
derive instance eqArbA  :: Eq ArabicAOption
derive instance eqArbE  :: Eq ArabicEOption
derive instance eqArbI  :: Eq ArabicIOption
derive instance eqArbO  :: Eq ArabicOOption
derive instance eqArbU  :: Eq ArabicUOption

outputArabicI :: KwakLetter -> String
outputArabicI = outputArabic defArabicOptions

outputArabic :: ArabicOptions -> KwakLetter -> String
outputArabic _ M   = "\x645" -- م
outputArabic _ MY  = "\x645\x654"
outputArabic _ N   = "\x646" -- ن
outputArabic _ NY  = "\x646\x654" -- ن
outputArabic _ P   = "\x67e" -- پ
outputArabic _ T   = "\x62a" -- ت
outputArabic _ B   = "\x628" -- ب
outputArabic _ D   = "\x62f" -- د
outputArabic _ PY  = "\x67e\x654"
outputArabic _ TY  = "\x62a\x654"
outputArabic _ TS  = "\x684" -- th ث \x62b OR Bosnian /ts/ ڄ \x684
outputArabic _ TL  = "\x686" -- چ
outputArabic _ DZ  = "\x62c" -- ج
outputArabic _ DL  = "\x685" -- څ
outputArabic _ TSY = "\x684\x654"
outputArabic _ TLY = "\x686\x654" -- چٔ
outputArabic _ S   = "\x633" -- س
outputArabic o LH  
  | o.arbLhKind == LhSheen = "\x634" -- sh ش \x634 OR r  ر \x631 or ڵ \x6b5
  | o.arbLhKind == LhLhah  = "\x6b5"
  | otherwise              = "\x634"
outputArabic _ L   = "\x644" -- ل
outputArabic _ LY  = "\x644\x654" -- لٔ
outputArabic _ J   = "\x64a\x652" -- يْ
outputArabic _ JY  = "\x626\x652" -- \x626 has integrated hamzah "\x64a\x654" -- or \x678 ٸ
outputArabic _ K   = "\x643" -- ك
outputArabic _ KW  = "\x643\x64f" -- كُ
outputArabic o G   
  | o.arbGKind == GLikeQ = "\x6a7" -- ڨ, originally \x6cb ۋ. Could also be \x6ab ګ or \x6ac ڬ now ڧ
  | o.arbGKind == GLikeK = "\x6ac"
  | otherwise            = "\x6ac"
outputArabic o GW -- originally \x6cb\x64f
  | o.arbGKind == GLikeQ = "\x6a7\x64f"
  | o.arbGKind == GLikeK = "\x6ac\x64f"
  | otherwise            = "\x6ac\x64f"
outputArabic _ KY  = "\x643\x655" -- ك
outputArabic _ KWY = "\x643\x64f\x655" -- كُ
outputArabic _ Q   = "\x642" -- ق
outputArabic _ QW  = "\x642\x64f" -- قُ
outputArabic o GU  
  | o.arbGuKind == GuGhain = "\x63a" -- غ
  | o.arbGuKind == GuLikeQ = "\x6a8" -- ڨ
  | otherwise              = "\x6a8" -- ڨ
outputArabic o GUW
  | o.arbGuKind == GuGhain = "\x63a\x64f" -- غ
  | o.arbGuKind == GuLikeQ = "\x6a8\x64f" -- ڨ
  | otherwise              = "\x6a8\x64f" -- ڨ
outputArabic _ QY  = "\x642\x655"
outputArabic _ QWY = "\x642\x64f\x655" -- most problematic letter for rendering
outputArabic _ X   = "\x62e" -- خ
outputArabic _ XW  = "\x62e\x64f"
outputArabic _ XU  = "\x62d" -- ح
outputArabic _ XUW = "\x62d\x64f" -- حُ
outputArabic _ W   = "\x64a\x652" -- وْ
outputArabic _ WY  = "\x624\x652" -- "\x648\x654"
outputArabic _ Y   = "\x621" -- hamza ء
outputArabic _ H   = "\x647" -- ه
outputArabic _ A   = "\x627\x64e"
outputArabic o E   
  | o.arbEKind == EAlifDia = "\x627\x650" -- ai -> e
  | o.arbEKind == EWedgeI  = "\x6ce" -- ێ
  | otherwise              = "\x627\x650"
outputArabic _ I   = "\x64a" 
outputArabic o O
  | o.arbOKind == OAlifDia = "\x627\x64f" -- aw -> o -- اُ
  | o.arbOKind == OWedgeU  = "\x6c9"
  | otherwise              = "\x627\x64f"
outputArabic _ U   = "\x648"
outputArabic _ AU  = "\x627"

--------------------------------
-- Fold-based

-- If we want to include the hamzah with the 
-- vowel following it, we can't use a straight
-- map. Instead, we have to use a fold where we
-- can look ahead one character. Normally, I 
-- might use a parser, but running parsers in
-- PureScript is MUCH slower than in Haskell,
-- whereas folds don't seem to experience as
-- much of a time bloat.

outputArabicWFR :: ArabicOptions -> CasedWord -> String
outputArabicWFR _ps (PunctW str) = str
outputArabicWFR ops (KwakW ltrs) = outputArabicFR ops ltrs

-- \x623 : Alif with hamzah above
-- \x625 : Alif with hamzah below

outputArabicFR :: ArabicOptions -> List CasedLetter -> String
outputArabicFR ops Nil = ""
outputArabicFR ops (Cons x rs1@(Cons z rst))
  | (x == (Maj Y)) || (x == (Min Y))
  = case (stripCase z) of
    A  -> "\x625\x64e" <> outputArabicFR ops rst
    E  -> case ops.arbEKind of
      EAlifDia -> "\x623\x650" <> outputArabicFR ops rst
      EWedgeI  -> "\x6ce\x655" <> outputArabicFR ops rst -- check
    I  -> "\x626" <> outputArabicFR ops rst
    O  -> case ops.arbOKind of
      OAlifDia -> "\x625\x64f" <> outputArabicFR ops rst
      OWedgeU  -> "\x6c9\x654" <> outputArabicFR ops rst -- check
    U  -> "\x624" <> outputArabicFR ops rst
    AU -> "\x625" <> outputArabicFR ops rst
    _c -> "\x621" <> outputArabicFR ops rs1
    -- c  -> "\x621" <> (outputArabic ops c) <> (outputArabicFR ops rst)
  | otherwise = (outputArabic ops (stripCase x)) <> (outputArabicFR ops rs1)
outputArabicFR ops (Cons x Nil)
  = outputArabic ops (stripCase x)

-- outputArabicWordsF :: ArabicOptions -> List CasedWord -> String
-- outputArabicWordsF ops xs = foldMap (outputArabicWFR ops) xs

--------------------------------
-- Derived Functions

outputArabicLetterI :: CasedLetter -> String
outputArabicLetterI (Maj x) = outputArabicI x
outputArabicLetterI (Min x) = outputArabicI x

outputArabicLetter :: ArabicOptions -> CasedLetter -> String
outputArabicLetter ops (Maj x) = outputArabic ops x
outputArabicLetter ops (Min x) = outputArabic ops x

outputArabicCharI :: CasedChar -> String
outputArabicCharI (Kwak  x) = outputArabicLetterI x
outputArabicCharI (Punct x) = x

outputArabicChar :: ArabicOptions -> CasedChar -> String
outputArabicChar ops (Kwak  x) = outputArabicLetter ops x
outputArabicChar _ps (Punct x) = x

outputArabicWordI :: CasedWord -> String
outputArabicWordI (KwakW  x) = outputWordI x
outputArabicWordI (PunctW x) = x

outputArabicWord :: ArabicOptions -> CasedWord -> String
outputArabicWord ops (KwakW  x) 
  | ops.combHamza = outputArabicFR ops x
  | otherwise     = outputWord ops x
outputArabicWord _ps (PunctW x) = x

outputWordI :: List CasedLetter -> String
outputWordI Nil = ""
outputWordI (Cons (Maj Y) rst) = foldMap outputArabicLetterI rst
outputWordI (Cons (Min Y) rst) = foldMap outputArabicLetterI rst
outputWordI xs = foldMap outputArabicLetterI xs

outputWord :: ArabicOptions -> List CasedLetter -> String
outputWord _ps Nil = ""
outputWord ops (Cons (Maj Y) rst) = foldMap (outputArabicLetter ops) rst
outputWord ops (Cons (Min Y) rst) = foldMap (outputArabicLetter ops) rst
outputWord ops xs = foldMap (outputArabicLetter ops) xs

outputArabicWordsI :: List CasedWord -> String
outputArabicWordsI xs = foldMap outputArabicWordI xs

outputArabicWords :: ArabicOptions -> List CasedWord -> String
outputArabicWords ops xs = foldMap (outputArabicWord ops) xs

-- outputNapaChars :: List CasedChar -> String
-- outputNapaChars xs = foldMap outputNapaChar xs

-- Copied from Umista version.
outputArabicCharsI' :: List CasedChar -> String
outputArabicCharsI' Nil = ""
outputArabicCharsI' (Cons (Punct x) (Cons y@(Kwak z) rst) )
  | (isCharLetter Y y) = x <> outputArabicCharsI' rst
  | otherwise          = x <> outputArabicLetterI z <> outputArabicCharsI' rst
outputArabicCharsI' (Cons (Punct x) rst)
  = x <> outputArabicCharsI' rst
outputArabicCharsI' (Cons (Kwak  x) rst)
  = outputArabicLetterI x <> outputArabicCharsI' rst

outputArabicChars' :: ArabicOptions -> List CasedChar -> String
outputArabicChars' ops Nil = ""
outputArabicChars' ops (Cons (Punct x) (Cons y@(Kwak z) rst) )
  | (isCharLetter Y y) = x <> outputArabicChars' ops rst
  | otherwise          = x <> outputArabicLetter ops z <> outputArabicChars' ops rst
outputArabicChars' ops (Cons (Punct x) rst)
  = x <> outputArabicChars' ops rst
outputArabicChars' ops (Cons (Kwak  x) rst)
  = outputArabicLetter ops x <> outputArabicChars' ops rst

-- | Ouptut a list of `CasedChar`s in Umista.
outputArabicCharsI :: List CasedChar -> String
outputArabicCharsI Nil = ""
outputArabicCharsI (Cons y@(Kwak z) rst)
  | (isCharLetter Y y) = outputArabicCharsI' rst
  | otherwise = outputArabicLetterI z <> outputArabicCharsI' rst
outputArabicCharsI xs = outputArabicCharsI' xs

outputArabicChars :: ArabicOptions -> List CasedChar -> String
outputArabicChars _op Nil = ""
outputArabicChars ops (Cons y@(Kwak z) rst)
  | (isCharLetter Y y) = (outputArabicChars' ops) rst
  | otherwise = outputArabicLetter ops z <> outputArabicChars' ops rst
outputArabicChars ops xs = outputArabicChars' ops xs
