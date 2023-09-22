{-|
Module      : Kwakwala.Output.Umista
Description : U'mista output for Kwak'wala.
Copyright   : (c) David Wilson, 2023
License     : BSD-3

This module contains output functions for
the U'mista orthography for Kwak'wala. 
U'mista is the most commonly used orthography
for northern dialects of Kwak'wala. This is
one of the most commonly used output modules
in this library.

For more information about the U'mista orthography,
see <http://www.languagegeek.com/wakashan/kwakwala.html>.

Converted from code from kwak-orth.

-}

module Kwakwala.Output.Umista
  ( outputUmistaChar
  , outputUmistaChars
  , outputUmistaChars'
  , outputUmistaLetter
  , outputUmistaWord
  , outputUmistaWords
  )
  where

import Prelude

import Data.Foldable

import Data.List
import Kwakwala.Types

-------------------------------------------
-- Standard Output

-- Apostrophes
-- Glottal Stop: U+0027
-- Ejective, Single Consonants : U+0313 ("\x313")
-- Ejective, Double Consonants : U+0315 ("\x315") (in between the two letters)

-- Note: Be careful when using writing characters
-- as their codepoint, both in decimal and hexadecimal.
-- If the codepoint is followed by a [hexa]decimal character[s],
-- that/those character[s] will be interpreted as being
-- part of the code point.
-- e.g. "k\x313ata" will be interpreted as
-- ['k','\x313a','t','a'] instead of
-- ['k','\x313','a','t','a'].
-- To avoid this, put an '\&' character after
-- the codepoint; this shows that the following
-- character[s] are NOT part of the codepoint,
-- and should just be interpreted as themselves.

outputUmista :: KwakLetter -> String
outputUmista M   = "m"
outputUmista MY  = "'m"
outputUmista N   = "n"
outputUmista NY  = "'n"
outputUmista P   = "p"
outputUmista T   = "t"
outputUmista B   = "b"
outputUmista D   = "d"
outputUmista PY  = "p\x313"
outputUmista TY  = "t\x313"
outputUmista TS  = "ts"
outputUmista TL  = "tł"
outputUmista DZ  = "dz"
outputUmista DL  = "dł"
outputUmista TSY = "t\x315s"
outputUmista TLY = "t\x315ł"
outputUmista S   = "s"
outputUmista LH  = "ł"
outputUmista L   = "l"
outputUmista LY  = "'l" -- "l\x313"
outputUmista J   = "y"
outputUmista JY  = "'y"
outputUmista K   = "k"
outputUmista KW  = "kw"
outputUmista G   = "g"
outputUmista GW  = "gw"
outputUmista KY  = "k\x313"
outputUmista KWY = "k\x315w"
outputUmista Q   = "ḵ"
outputUmista QW  = "ḵw"
outputUmista GU  = "g̱"
outputUmista GUW = "g̱w"
outputUmista QY  = "ḵ\x313"
outputUmista QWY = "ḵ\x315w"
outputUmista X   = "x"
outputUmista XW  = "xw"
outputUmista XU  = "x̱"
outputUmista XUW = "x̱w"
outputUmista W   = "w"
outputUmista WY  = "'w"
outputUmista Y   = "'"
outputUmista H   = "h"
outputUmista A   = "a"
outputUmista E   = "e"
outputUmista I   = "i"
outputUmista O   = "o"
outputUmista U   = "u"
outputUmista AU  = "a̱"

-- Title Case
outputUmista' :: KwakLetter -> String
outputUmista' M   = "M"
outputUmista' MY  = "'M"
outputUmista' N   = "N"
outputUmista' NY  = "'N"
outputUmista' P   = "P"
outputUmista' T   = "T"
outputUmista' B   = "B"
outputUmista' D   = "D"
outputUmista' PY  = "P\x313"
outputUmista' TY  = "T\x313"
outputUmista' TS  = "Ts"
outputUmista' TL  = "Tł"
outputUmista' DZ  = "Dz"
outputUmista' DL  = "Dł"
outputUmista' TSY = "T\x315s"
outputUmista' TLY = "T\x315ł"
outputUmista' S   = "S"
outputUmista' LH  = "Ł"
outputUmista' L   = "L"
outputUmista' LY  = "'L"
outputUmista' J   = "Y"
outputUmista' JY  = "'Y"
outputUmista' K   = "K"
outputUmista' KW  = "Kw"
outputUmista' G   = "G"
outputUmista' GW  = "Gw"
outputUmista' KY  = "K\x313"
outputUmista' KWY = "K\x315w"
outputUmista' Q   = "Ḵ"
outputUmista' QW  = "Ḵw"
outputUmista' GU  = "G\x331"
outputUmista' GUW = "G\x331w"
outputUmista' QY  = "Ḵ\x313"
outputUmista' QWY = "Ḵ\x315w"
outputUmista' X   = "X"
outputUmista' XW  = "Xw"
outputUmista' XU  = "X\x331"
outputUmista' XUW = "X\x331w"
outputUmista' W   = "W"
outputUmista' WY  = "'W"
outputUmista' Y   = "'"
outputUmista' H   = "H"
outputUmista' A   = "A"
outputUmista' E   = "E"
outputUmista' I   = "I"
outputUmista' O   = "O"
outputUmista' U   = "U"
outputUmista' AU  = "A\x331"

-- | Output a single `CasedLetter` in Umista.
outputUmistaLetter :: CasedLetter -> String
outputUmistaLetter (Maj x) = outputUmista' x
outputUmistaLetter (Min x) = outputUmista  x

-- | Output a single `CasedChar` in Umista.
outputUmistaChar :: CasedChar -> String
outputUmistaChar (Kwak  x) = outputUmistaLetter x
outputUmistaChar (Punct x) = x

-- | Output a `CasedWord` in Umista
outputUmistaWord :: CasedWord -> String
outputUmistaWord (KwakW  x) = outputWord x
outputUmistaWord (PunctW x) = x

outputWord :: List CasedLetter -> String
outputWord Nil = ""
outputWord (Cons (Maj Y) rst) = foldMap outputUmistaLetter rst
outputWord (Cons (Min Y) rst) = foldMap outputUmistaLetter rst
outputWord xs = foldMap outputUmistaLetter xs

outputUmistaChars' :: List CasedChar -> String
outputUmistaChars' Nil = ""
outputUmistaChars' (Cons (Punct x) (Cons y@(Kwak z) rst) )
  | (isCharLetter Y y) = x <> outputUmistaChars' rst
  | otherwise          = x <> outputUmistaLetter z <> outputUmistaChars' rst
outputUmistaChars' (Cons (Punct x) rst)
  = x <> outputUmistaChars' rst
outputUmistaChars' (Cons (Kwak  x) rst)
  = outputUmistaLetter x <> outputUmistaChars' rst

-- | Ouptut a list of `CasedChar`s in Umista.
outputUmistaChars :: List CasedChar -> String
outputUmistaChars Nil = ""
outputUmistaChars (Cons y@(Kwak z) rst)
  | (isCharLetter Y y) = outputUmistaChars' rst
  | otherwise = outputUmistaLetter z <> outputUmistaChars' rst
outputUmistaChars xs = outputUmistaChars' xs

-- | Output a list of `CasedWord`s in Umista.
outputUmistaWords :: List CasedWord -> String
outputUmistaWords xs = foldMap outputUmistaWord xs
