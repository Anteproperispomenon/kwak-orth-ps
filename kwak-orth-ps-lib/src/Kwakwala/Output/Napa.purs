{-|
Module      : Kwakwala.Output.Napa
Description : Output for the usual Kwak'wala NAPA orthography
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This module contains output functions for
-- | the variant of NAPA that is most commonly
-- | used for Kwak'wala. It's also known as the
-- | \"Southern\" Orthography, as can be seen at
-- | <http://www.languagegeek.com/wakashan/kwakwala.html>


module Kwakwala.Output.Napa
  ( outputNapaChar
  , outputNapaChars
  , outputNapaWord
  , outputNapaWords
  , outputNapaLetter
  ) where

-- import Prelude

import Data.List (List)
import Data.Foldable (foldMap)

import Kwakwala.Types 
  ( CasedChar(..)
  , CasedLetter(..)
  , CasedWord(..)
  , KwakLetter(..)
  )

-------------------------------------------
-- Main Output

-- Seems to use same apostrophe
-- (U+0313) as U'mista.

outputNAPA :: KwakLetter -> String
outputNAPA M   = "m"
outputNAPA MY  = "m\x313"
outputNAPA N   = "n"
outputNAPA NY  = "n\x313"
outputNAPA P   = "p"
outputNAPA T   = "t"
outputNAPA B   = "b"
outputNAPA D   = "d"
outputNAPA PY  = "p\x313"
outputNAPA TY  = "t\x313"
outputNAPA TS  = "c"
outputNAPA TL  = "ƛ"
outputNAPA DZ  = "dᶻ"
outputNAPA DL  = "λ"
outputNAPA TSY = "c\x313"
outputNAPA TLY = "ƛ\x313"
outputNAPA S   = "s"
outputNAPA LH  = "ł"
outputNAPA L   = "l"
outputNAPA LY  = "l\x313"
outputNAPA J   = "y"
outputNAPA JY  = "y\x313"
outputNAPA K   = "k"
outputNAPA KW  = "kʷ"
outputNAPA G   = "g"
outputNAPA GW  = "gʷ"
outputNAPA KY  = "k\x313"
outputNAPA KWY = "k\x313ʷ"
outputNAPA Q   = "q"
outputNAPA QW  = "qʷ"
outputNAPA GU  = "ǧ"
outputNAPA GUW = "ǧʷ"
outputNAPA QY  = "q\x313"
outputNAPA QWY = "q\x313ʷ"
outputNAPA X   = "x"
outputNAPA XW  = "xʷ"
outputNAPA XU  = "x\x30c"
outputNAPA XUW = "x\x30cʷ"
outputNAPA W   = "w"
outputNAPA WY  = "w\x313"
outputNAPA Y   = "ʔ"
outputNAPA H   = "h"
outputNAPA A   = "a"
outputNAPA E   = "e"
outputNAPA I   = "i"
outputNAPA O   = "o"
outputNAPA U   = "u"
outputNAPA AU  = "ə"

outputNAPA' :: KwakLetter -> String
outputNAPA' M   = "M"
outputNAPA' MY  = "M\x313"
outputNAPA' N   = "N"
outputNAPA' NY  = "N\x313"
outputNAPA' P   = "P"
outputNAPA' T   = "T"
outputNAPA' B   = "B"
outputNAPA' D   = "D"
outputNAPA' PY  = "P\x313"
outputNAPA' TY  = "T\x313"
outputNAPA' TS  = "C"
outputNAPA' TL  = "ƛ"
outputNAPA' DZ  = "Dᶻ"
outputNAPA' DL  = "Λ"
outputNAPA' TSY = "C\x313"
outputNAPA' TLY = "ƛ̓"
outputNAPA' S   = "S"
outputNAPA' LH  = "Ł"
outputNAPA' L   = "L"
outputNAPA' LY  = "L\x313"
outputNAPA' J   = "Y"
outputNAPA' JY  = "Y\x313"
outputNAPA' K   = "K"
outputNAPA' KW  = "Kʷ"
outputNAPA' G   = "G"
outputNAPA' GW  = "Gʷ"
outputNAPA' KY  = "K\x313"
outputNAPA' KWY = "K\x313ʷ"
outputNAPA' Q   = "Q"
outputNAPA' QW  = "Qʷ"
outputNAPA' GU  = "Ǧ"
outputNAPA' GUW = "Ǧʷ"
outputNAPA' QY  = "Q\x313"
outputNAPA' QWY = "Q\x313ʷ"
outputNAPA' X   = "X"
outputNAPA' XW  = "Xʷ"
outputNAPA' XU  = "X\x30c"
outputNAPA' XUW = "X\x30cʷ"
outputNAPA' W   = "W"
outputNAPA' WY  = "W\x313"
outputNAPA' Y   = "ʔ"
outputNAPA' H   = "H"
outputNAPA' A   = "A"
outputNAPA' E   = "E"
outputNAPA' I   = "I"
outputNAPA' O   = "O"
outputNAPA' U   = "U"
outputNAPA' AU  = "Ə"

outputNapaLetter :: CasedLetter -> String
outputNapaLetter (Maj x) = outputNAPA' x
outputNapaLetter (Min x) = outputNAPA  x

outputNapaChar :: CasedChar -> String
outputNapaChar (Kwak  x) = outputNapaLetter x
outputNapaChar (Punct x) = x

outputNapaWord :: CasedWord -> String
outputNapaWord (KwakW  x) = foldMap outputNapaLetter x
outputNapaWord (PunctW x) = x

outputNapaWords :: List CasedWord -> String
outputNapaWords xs = foldMap outputNapaWord xs

outputNapaChars :: List CasedChar -> String
outputNapaChars xs = foldMap outputNapaChar xs

