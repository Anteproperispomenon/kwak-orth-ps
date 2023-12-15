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
  )

-- لٔب

-- hamza above: \x654
-- hamza below: \x655

-- Idea: for letters that have extra
-- diacritics (usually labialisation),
-- use hamza below instead.

outputArabicI :: KwakLetter -> String
outputArabicI M   = "\x645" -- م
outputArabicI MY  = "\x645\x654"
outputArabicI N   = "\x646" -- ن
outputArabicI NY  = "\x646\x654" -- ن
outputArabicI P   = "\x67e" -- پ
outputArabicI T   = "\x62a" -- ت
outputArabicI B   = "\x628" -- ب
outputArabicI D   = "\x62f" -- د
outputArabicI PY  = "\x67e\x654"
outputArabicI TY  = "\x62a\x654"
outputArabicI TS  = "\x684" -- th ث \x62b OR Bosnian /ts/ ڄ \x684
outputArabicI TL  = "\x686" -- چ
outputArabicI DZ  = "\x62c" -- ج
outputArabicI DL  = "\x685" -- څ
outputArabicI TSY = "\x684\x654"
outputArabicI TLY = "\x686\x654" -- چٔ
outputArabicI S   = "\x633" -- س
outputArabicI LH  = "\x634" -- sh ش \x634 OR r  ر \x631
outputArabicI L   = "\x644" -- لٔ
outputArabicI LY  = "\x644\x654" 
outputArabicI J   = "\x64a\x652" -- يْ
outputArabicI JY  = "\x64a\x654"
outputArabicI K   = "\x643" -- ك
outputArabicI KW  = "\x643\x64f" -- كُ
outputArabicI G   = "\x6cb" -- ۋ
outputArabicI GW  = "\x6cb\x64f"
outputArabicI KY  = "\x643\x655" -- ك
outputArabicI KWY = "\x643\x64f\x655" -- كُ
outputArabicI Q   = "\x642" -- ق
outputArabicI QW  = "\x642\x64f" -- قُ
outputArabicI GU  = "\x63a" -- غ
outputArabicI GUW = "\x63a\x64f"
outputArabicI QY  = "\x642"
outputArabicI QWY = "\x642\x64f\x655" -- most problematic letter for rendering
outputArabicI X   = "\x62e" -- خ
outputArabicI XW  = "\x62e\x64f"
outputArabicI XU  = "\x62d" -- ح
outputArabicI XUW = "\x62d\x64f" -- حُ
outputArabicI W   = "\x64a\x652" -- وْ
outputArabicI WY  = "\x648\x654"
outputArabicI Y   = "\x621" -- hamza ء
outputArabicI H   = "\x647" -- ه
outputArabicI A   = "\x627\x64e"
outputArabicI E   = "\x627\x650" -- ai -> e
outputArabicI I   = "\x64a" 
outputArabicI O   = "\x627\x64f" -- aw -> o -- اُ
outputArabicI U   = "\x648"
outputArabicI AU  = "\x627"


outputArabicLetter :: CasedLetter -> String
outputArabicLetter (Maj x) = outputArabicI x
outputArabicLetter (Min x) = outputArabicI x

outputArabicChar :: CasedChar -> String
outputArabicChar (Kwak  x) = outputArabicLetter x
outputArabicChar (Punct x) = x

outputArabicWord :: CasedWord -> String
outputArabicWord (KwakW  x) = outputWord x
outputArabicWord (PunctW x) = x

outputWord :: List CasedLetter -> String
outputWord Nil = ""
outputWord (Cons (Maj Y) rst) = foldMap outputArabicLetter rst
outputWord (Cons (Min Y) rst) = foldMap outputArabicLetter rst
outputWord xs = foldMap outputArabicLetter xs

outputArabicWords :: List CasedWord -> String
outputArabicWords xs = foldMap outputArabicWord xs

-- outputNapaChars :: List CasedChar -> String
-- outputNapaChars xs = foldMap outputNapaChar xs

-- Copied from Umista version.
outputArabicChars' :: List CasedChar -> String
outputArabicChars' Nil = ""
outputArabicChars' (Cons (Punct x) (Cons y@(Kwak z) rst) )
  | (isCharLetter Y y) = x <> outputArabicChars' rst
  | otherwise          = x <> outputArabicLetter z <> outputArabicChars' rst
outputArabicChars' (Cons (Punct x) rst)
  = x <> outputArabicChars' rst
outputArabicChars' (Cons (Kwak  x) rst)
  = outputArabicLetter x <> outputArabicChars' rst

-- | Ouptut a list of `CasedChar`s in Umista.
outputArabicChars :: List CasedChar -> String
outputArabicChars Nil = ""
outputArabicChars (Cons y@(Kwak z) rst)
  | (isCharLetter Y y) = outputArabicChars' rst
  | otherwise = outputArabicLetter z <> outputArabicChars' rst
outputArabicChars xs = outputArabicChars' xs
