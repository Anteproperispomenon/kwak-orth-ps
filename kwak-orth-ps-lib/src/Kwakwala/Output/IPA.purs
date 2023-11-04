{-|
Module      : Kwakwala.Output.IPA
Description : IPA output for Kwak'wala.
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This module has output functions for IPA
-- | from Kwak'wala. IPA is not frequently used
-- | to write Kwak'wala, so this is mainly used
-- | to produce IPA pronunciations of Kwak'wala
-- | text, usually for an academic audience not
-- | well-versed in Kwak'wala.
-- | 
-- | Note that IPA has no casing, so upper and
-- | lower case characters are treated the same.


module Kwakwala.Output.IPA
    -- * IPA Output options
    ( IPAOptions
    , defIPAOptions
    -- * Output with `CasedChar`s
    , outputIPAChar
    , outputIPAChars
    , outputIpaChars
    -- * Output with `CasedWord`s
    , outputIPAWord
    , outputIPAWords
    , outputIpaWords
    ) where

import Prelude

-- import Data.Foldable
import Data.List (List, foldMap)

import Kwakwala.Types 
  ( CasedChar(..)
  , CasedLetter(..)
  , CasedWord(..)
  , KwakLetter(..)
  )

-------------------------------------------
-- IPA Options

-- | The type for IPA options.
type IPAOptions
  = { ipaUseTies :: Boolean
    , ipaShowPal :: Boolean
    }

-- | The default IPA options.
-- | At the moment, everything defaults to true.
defIPAOptions :: IPAOptions
defIPAOptions = { ipaUseTies : true , ipaShowPal : true}

-------------------------------------------
-- General IPA output.

-- Using the IPA to write Kwak'wala
outputIpaX :: IPAOptions -> KwakLetter -> String
outputIpaX _ M   = "m"
outputIpaX _ MY  = "mˀ"
outputIpaX _ N   = "n"
outputIpaX _ NY  = "nˀ"
outputIpaX _ P   = "p"
outputIpaX _ T   = "t"
outputIpaX _ B   = "b"
outputIpaX _ D   = "d"
outputIpaX _ PY  = "pʼ"
outputIpaX _ TY  = "tʼ"
outputIpaX s TS
  | s.ipaUseTies = "t͡s"
  | otherwise    = "ts"
outputIpaX s TL  
  | s.ipaUseTies = "t͡ɬ"
  | otherwise    = "tɬ"
outputIpaX s DZ  
  | s.ipaUseTies = "d͡z"
  | otherwise    = "dz"
outputIpaX s DL  
  | s.ipaUseTies = "d͡ɮ"
  | otherwise    = "dɮ"
outputIpaX s TSY 
  | s.ipaUseTies = "t͡sʼ"
  | otherwise    = "tsʼ"
outputIpaX s TLY 
  | s.ipaUseTies = "t͡ɬʼ"
  | otherwise    = "tɬʼ"
outputIpaX _ S   = "s"
outputIpaX _ LH  = "ɬ"
outputIpaX _ L   = "l"
outputIpaX _ LY  = "lˀ"
outputIpaX _ J   = "j"
outputIpaX _ JY  = "jˀ"
outputIpaX s K   
  | s.ipaShowPal = "kʲ"
  | otherwise    = "k"
outputIpaX _ KW  = "kʷ"
outputIpaX s G   
  | s.ipaShowPal = "gʲ"
  | otherwise    = "g"
outputIpaX _ GW  = "gʷ"
outputIpaX s KY
  | s.ipaShowPal = "kʲʼ"
  | otherwise    = "kʼ"
outputIpaX _ KWY = "kʷʼ"
outputIpaX _ Q   = "q"
outputIpaX _ QW  = "qʷ"
outputIpaX _ GU  = "ɢ"
outputIpaX _ GUW = "ɢʷ"
outputIpaX _ QY  = "qʼ"
outputIpaX _ QWY = "qʷʼ"
outputIpaX s X   
  | s.ipaShowPal = "xʲ"
  | otherwise    = "x"
outputIpaX _ XW  = "xʷ"
outputIpaX _ XU  = "χ"
outputIpaX _ XUW = "χʷ"
outputIpaX _ W   = "w"
outputIpaX _ WY  = "wˀ"
outputIpaX _ Y   = "ʔ"
outputIpaX _ H   = "h"
outputIpaX _ A   = "a"
outputIpaX _ E   = "e"
outputIpaX _ I   = "i"
outputIpaX _ O   = "o"
outputIpaX _ U   = "u"
outputIpaX _ AU  = "ə"

-- outputIpa :: IPAOptions -> KwakLetter -> String
-- outputIpa = outputIpaX

-------------------------------------------
-- IPA Output functions

-- | Output a single `CasedLetter` in IPA.
outputIPALetter :: IPAOptions -> CasedLetter -> String
outputIPALetter ops (Maj x) = outputIpaX ops x
outputIPALetter ops (Min x) = outputIpaX ops x

-- | Output a single `CasedChar` in IPA.
outputIPAChar :: IPAOptions -> CasedChar -> String
outputIPAChar ops (Kwak  x) = outputIPALetter ops x
outputIPAChar _ps (Punct x) = x

-- | Output a `CasedWord` in IPA
outputIPAWord :: IPAOptions -> CasedWord -> String
outputIPAWord ops (KwakW  x) = foldMap (outputIPALetter ops) x
outputIPAWord _ps (PunctW x) = x

-- | Output a list of `CasedChar`s to IPA.
outputIPAChars :: IPAOptions -> List CasedChar -> String
outputIPAChars ops xs = foldMap (outputIPAChar ops) xs

-- | Output a list of `CasedWord`s to IPA.
outputIPAWords :: IPAOptions -> List CasedWord -> String
outputIPAWords ops xs = foldMap (outputIPAWord ops) xs

-- | Output a list of `CasedChar`s to IPA.
-- | Synonym for `outputIPAChars`.
outputIpaChars :: IPAOptions -> List CasedChar -> String
outputIpaChars = outputIPAChars 

-- | Output a list of `CasedWord`s to IPA.
-- | Synonym for `outputIPAWords`.
outputIpaWords :: IPAOptions -> List CasedWord -> String
outputIpaWords = outputIPAWords

