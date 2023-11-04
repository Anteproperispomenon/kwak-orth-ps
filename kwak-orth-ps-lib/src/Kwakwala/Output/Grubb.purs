{-|
Module      : Kwakwala.Output.Grubb
Description : Output for an ASCII-compatible orthography.
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This module has output functions for an
-- | orthography for Kwak'wala based on the
-- | Grubb orthography, but modified to be
-- | usable for ASCII. 
-- | 
-- | You can configure the output by using 
-- | the type `GrubbOptions`, which can let
-- | you do the following things:
-- | 
-- |   - Use 'J'/'j' instead of standalone "H"/'h'
-- |   - Use '7' instead of apostrophes.
-- |   - Use Omit glottal stop marks at the beginnings of words.

module Kwakwala.Output.Grubb
  ( GrubbOptions
  , defGrubbOptions
  , outputGrubbAsciiChar
  , outputGrubbAsciiChars
  , outputGrubbAsciiCharsDef
  , outputGrubbAsciiLetter
  , outputGrubbAsciiWord
  )
  where

import Prelude
import Data.List (List(..), foldMap)

import Kwakwala.Types 
  ( CasedChar(..)
  , CasedLetter(..)
  , CasedWord(..)
  , KwakLetter(..)
  , isCharLetter
  )


type GrubbOptions
  = { grbUseJ :: Boolean
    , grbUse' :: Boolean -- Keep apostrophes at start of words
    , grbUse7 :: Boolean
    }

defGrubbOptions :: GrubbOptions
defGrubbOptions = { grbUseJ : false, grbUse' : true, grbUse7 : false}

-- | Output a lower-case Grubb-ASCII character.
outputGrubbAsciiX :: GrubbOptions -> KwakLetter -> String
outputGrubbAsciiX _gr M   = "m"
outputGrubbAsciiX grb MY  
  | grb.grbUse7 = "7m"
  | otherwise   = "'m"
outputGrubbAsciiX _gr N   = "n"
outputGrubbAsciiX grb NY  
  | grb.grbUse7  = "7n"
  | otherwise = "'n"
outputGrubbAsciiX _gr P   = "p"
outputGrubbAsciiX _gr T   = "t"
outputGrubbAsciiX _gr B   = "b"
outputGrubbAsciiX _gr D   = "d"
outputGrubbAsciiX grb PY
  | grb.grbUse7 = "p7"
  | otherwise   = "p'"
outputGrubbAsciiX grb TY
  | grb.grbUse7 = "t7"
  | otherwise   = "t'"
outputGrubbAsciiX _gr TS  = "ts"
outputGrubbAsciiX _gr TL  = "tl"
outputGrubbAsciiX _gr DZ  = "dz"
outputGrubbAsciiX _gr DL  = "dl"
outputGrubbAsciiX grb TSY -- note this
  | grb.grbUse7 = "ts7"
  | otherwise   = "ts'"
outputGrubbAsciiX grb TLY -- note this
  | grb.grbUse7 = "tl7"
  | otherwise   = "tl'"
outputGrubbAsciiX _gr S   = "s"
outputGrubbAsciiX _gr LH  = "lh"
outputGrubbAsciiX _gr L   = "l"
outputGrubbAsciiX grb LY
  | grb.grbUse7 = "7l"
  | otherwise   = "'l"
outputGrubbAsciiX _gr J   = "y"
outputGrubbAsciiX grb JY
  | grb.grbUse7 = "7y"
  | otherwise   = "'y"
outputGrubbAsciiX _gr K   = "k"
outputGrubbAsciiX _gr KW  = "kw"
outputGrubbAsciiX _gr G   = "g"
outputGrubbAsciiX _gr GW  = "gw"
outputGrubbAsciiX grb KY
  | grb.grbUse7 = "k7"
  | otherwise   = "k'"
outputGrubbAsciiX grb KWY
  | grb.grbUse7 = "kw7"
  | otherwise   = "kw'"
outputGrubbAsciiX _gr Q   = "kh"
outputGrubbAsciiX _gr QW  = "khw"
outputGrubbAsciiX _gr GU  = "gh"
outputGrubbAsciiX _gr GUW = "ghw"
outputGrubbAsciiX grb QY
  | grb.grbUse7 = "kh7"
  | otherwise   = "kh'"
outputGrubbAsciiX grb QWY
  | grb.grbUse7 = "khw7"
  | otherwise   = "khw'"
outputGrubbAsciiX _gr X   = "x"
outputGrubbAsciiX _gr XW  = "xw"
outputGrubbAsciiX _gr XU  = "xh"
outputGrubbAsciiX _gr XUW = "xhw"
outputGrubbAsciiX _gr W   = "w"
outputGrubbAsciiX grb WY
  | grb.grbUse7 = "7w"
  | otherwise   = "'w"
outputGrubbAsciiX _gr Y   = "'"
outputGrubbAsciiX grb H
  | grb.grbUseJ = "j"
  | otherwise   = "h"
outputGrubbAsciiX _gr A   = "a"
outputGrubbAsciiX _gr E   = "eh"
outputGrubbAsciiX _gr I   = "i"
outputGrubbAsciiX _gr O   = "o"
outputGrubbAsciiX _gr U   = "u"
outputGrubbAsciiX _gr AU  = "e"

-- | Output a lower-case Grubb-ASCII character.
outputGrubbAsciiY :: GrubbOptions -> KwakLetter -> String
outputGrubbAsciiY _gr M   = "M"
outputGrubbAsciiY grb MY  
  | grb.grbUse7 = "7M"
  | otherwise   = "'M"
outputGrubbAsciiY _gr N   = "N"
outputGrubbAsciiY grb NY  
  | grb.grbUse7  = "7N"
  | otherwise = "'N"
outputGrubbAsciiY _gr P   = "P"
outputGrubbAsciiY _gr T   = "T"
outputGrubbAsciiY _gr B   = "B"
outputGrubbAsciiY _gr D   = "D"
outputGrubbAsciiY grb PY
  | grb.grbUse7 = "P7"
  | otherwise   = "P'"
outputGrubbAsciiY grb TY
  | grb.grbUse7 = "T7"
  | otherwise   = "T'"
outputGrubbAsciiY _gr TS  = "Ts"
outputGrubbAsciiY _gr TL  = "Tl"
outputGrubbAsciiY _gr DZ  = "Dz"
outputGrubbAsciiY _gr DL  = "Dl"
outputGrubbAsciiY grb TSY -- note this
  | grb.grbUse7 = "Ts7"
  | otherwise   = "Ts'"
outputGrubbAsciiY grb TLY -- note this
  | grb.grbUse7 = "Tl7"
  | otherwise   = "Tl'"
outputGrubbAsciiY _gr S   = "S"
outputGrubbAsciiY _gr LH  = "Lh"
outputGrubbAsciiY _gr L   = "L"
outputGrubbAsciiY grb LY
  | grb.grbUse7 = "7L"
  | otherwise   = "'L"
outputGrubbAsciiY _gr J   = "Y"
outputGrubbAsciiY grb JY
  | grb.grbUse7 = "7Y"
  | otherwise   = "'Y"
outputGrubbAsciiY _gr K   = "K"
outputGrubbAsciiY _gr KW  = "Kw"
outputGrubbAsciiY _gr G   = "G"
outputGrubbAsciiY _gr GW  = "Gw"
outputGrubbAsciiY grb KY
  | grb.grbUse7 = "K7"
  | otherwise   = "K'"
outputGrubbAsciiY grb KWY
  | grb.grbUse7 = "Kw7"
  | otherwise   = "Kw'"
outputGrubbAsciiY _gr Q   = "Kh"
outputGrubbAsciiY _gr QW  = "Khw"
outputGrubbAsciiY _gr GU  = "Gh"
outputGrubbAsciiY _gr GUW = "Ghw"
outputGrubbAsciiY grb QY
  | grb.grbUse7 = "Kh7"
  | otherwise   = "Kh'"
outputGrubbAsciiY grb QWY
  | grb.grbUse7 = "Khw7"
  | otherwise   = "Khw'"
outputGrubbAsciiY _gr X   = "X"
outputGrubbAsciiY _gr XW  = "Xw"
outputGrubbAsciiY _gr XU  = "Xh"
outputGrubbAsciiY _gr XUW = "Xhw"
outputGrubbAsciiY _gr W   = "W"
outputGrubbAsciiY grb WY
  | grb.grbUse7 = "7W"
  | otherwise   = "'W"
outputGrubbAsciiY _gr Y   = "'"
outputGrubbAsciiY grb H
  | grb.grbUseJ = "J"
  | otherwise   = "H"
outputGrubbAsciiY _gr A   = "A"
outputGrubbAsciiY _gr E   = "Eh"
outputGrubbAsciiY _gr I   = "I"
outputGrubbAsciiY _gr O   = "O"
outputGrubbAsciiY _gr U   = "U"
outputGrubbAsciiY _gr AU  = "E"

outputGrubbAsciiLetter :: GrubbOptions -> CasedLetter -> String
outputGrubbAsciiLetter grb (Maj x) = outputGrubbAsciiY grb x
outputGrubbAsciiLetter grb (Min x) = outputGrubbAsciiX grb x

outputGrubbAsciiChar :: GrubbOptions -> CasedChar -> String
outputGrubbAsciiChar grb (Kwak  x) = outputGrubbAsciiLetter grb x
outputGrubbAsciiChar _gr (Punct x) = x

outputGrubbAsciiWord :: GrubbOptions -> CasedWord -> String
outputGrubbAsciiWord grb (KwakW  x)
  | (not grb.grbUse') = outputWord grb x
  | otherwise         = foldMap (outputGrubbAsciiLetter grb) x
outputGrubbAsciiWord _gr (PunctW x) = x

outputWord :: GrubbOptions -> List CasedLetter -> String
outputWord _gr Nil = ""
outputWord grb (Cons (Maj Y) rst) = foldMap (outputGrubbAsciiLetter grb) rst
outputWord grb (Cons (Min Y) rst) = foldMap (outputGrubbAsciiLetter grb) rst
outputWord grb xs = foldMap (outputGrubbAsciiLetter grb) xs

outputGrubbAsciiChars' :: GrubbOptions -> List CasedChar -> String
outputGrubbAsciiChars' _gr Nil = ""
outputGrubbAsciiChars' grb (Cons (Punct x) (Cons y@(Kwak z) rst) )
  | (isCharLetter Y y)  &&  (not grb.grbUse') = x <> outputGrubbAsciiChars' grb rst
  | otherwise = x <> outputGrubbAsciiLetter grb z <> outputGrubbAsciiChars' grb rst
outputGrubbAsciiChars' grb (Cons (Punct x) rst)
  = x <> outputGrubbAsciiChars' grb rst
outputGrubbAsciiChars' grb (Cons (Kwak  x) rst)
  = outputGrubbAsciiLetter grb x <> outputGrubbAsciiChars' grb rst

-- | Ouptut Grubb-ASCII text with configurable options.
outputGrubbAsciiChars :: GrubbOptions -> List CasedChar -> String
outputGrubbAsciiChars _gr Nil = ""
outputGrubbAsciiChars grb (Cons y@(Kwak z) rst)
  | (isCharLetter Y y) && (not grb.grbUse') = outputGrubbAsciiChars' grb rst
  | otherwise = outputGrubbAsciiLetter grb z <> outputGrubbAsciiChars' grb rst
outputGrubbAsciiChars grb xs = outputGrubbAsciiChars' grb xs

-- | Output Grubb-ASCII text with the default options.
outputGrubbAsciiCharsDef :: List CasedChar -> String
outputGrubbAsciiCharsDef xs = outputGrubbAsciiChars defGrubbOptions xs

