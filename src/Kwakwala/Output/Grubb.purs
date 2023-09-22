module Kwakwala.Output.Grubb
  ( GrubbOptions
  , defGrubbOptions
  , outputGrubbAsciiChars
  , outputGrubbAsciiCharsDef
  )
  where

import Prelude

import Kwakwala.Types

import Data.Foldable
import Data.List

type GrubbOptions
  = { grbUseJ :: Boolean
    , grbUse' :: Boolean -- Keep apostrophes at start of words
    , grbUse7 :: Boolean
    }

defGrubbOptions :: GrubbOptions
defGrubbOptions = { grbUseJ : false, grbUse' : true, grbUse7 : false}

-- | Output a lower-case Grubb-ASCII character.
outputGrubbAsciiX :: GrubbOptions -> KwakLetter -> String
outputGrubbAsciiX grb M   = "m"
outputGrubbAsciiX grb MY  
  | grb.grbUse7 = "7m"
  | otherwise   = "'m"
outputGrubbAsciiX grb N   = "n"
outputGrubbAsciiX grb NY  
  | grb.grbUse7  = "7n"
  | otherwise = "'n"
outputGrubbAsciiX grb P   = "p"
outputGrubbAsciiX grb T   = "t"
outputGrubbAsciiX grb B   = "b"
outputGrubbAsciiX grb D   = "d"
outputGrubbAsciiX grb PY
  | grb.grbUse7 = "p7"
  | otherwise   = "p'"
outputGrubbAsciiX grb TY
  | grb.grbUse7 = "t7"
  | otherwise   = "t'"
outputGrubbAsciiX grb TS  = "ts"
outputGrubbAsciiX grb TL  = "tl"
outputGrubbAsciiX grb DZ  = "dz"
outputGrubbAsciiX grb DL  = "dl"
outputGrubbAsciiX grb TSY -- note this
  | grb.grbUse7 = "ts7"
  | otherwise   = "ts'"
outputGrubbAsciiX grb TLY -- note this
  | grb.grbUse7 = "tl7"
  | otherwise   = "tl'"
outputGrubbAsciiX grb S   = "s"
outputGrubbAsciiX grb LH  = "lh"
outputGrubbAsciiX grb L   = "l"
outputGrubbAsciiX grb LY
  | grb.grbUse7 = "7l"
  | otherwise   = "'l"
outputGrubbAsciiX grb J   = "y"
outputGrubbAsciiX grb JY
  | grb.grbUse7 = "7y"
  | otherwise   = "'y"
outputGrubbAsciiX grb K   = "k"
outputGrubbAsciiX grb KW  = "kw"
outputGrubbAsciiX grb G   = "g"
outputGrubbAsciiX grb GW  = "gw"
outputGrubbAsciiX grb KY
  | grb.grbUse7 = "k7"
  | otherwise   = "k'"
outputGrubbAsciiX grb KWY
  | grb.grbUse7 = "kw7"
  | otherwise   = "kw'"
outputGrubbAsciiX grb Q   = "kh"
outputGrubbAsciiX grb QW  = "khw"
outputGrubbAsciiX grb GU  = "gh"
outputGrubbAsciiX grb GUW = "ghw"
outputGrubbAsciiX grb QY
  | grb.grbUse7 = "kh7"
  | otherwise   = "kh'"
outputGrubbAsciiX grb QWY
  | grb.grbUse7 = "khw7"
  | otherwise   = "khw'"
outputGrubbAsciiX grb X   = "x"
outputGrubbAsciiX grb XW  = "xw"
outputGrubbAsciiX grb XU  = "xh"
outputGrubbAsciiX grb XUW = "xhw"
outputGrubbAsciiX grb W   = "w"
outputGrubbAsciiX grb WY
  | grb.grbUse7 = "7w"
  | otherwise   = "'w"
outputGrubbAsciiX grb Y   = "'"
outputGrubbAsciiX grb H
  | grb.grbUseJ = "j"
  | otherwise   = "h"
outputGrubbAsciiX grb A   = "a"
outputGrubbAsciiX grb E   = "eh"
outputGrubbAsciiX grb I   = "i"
outputGrubbAsciiX grb O   = "o"
outputGrubbAsciiX grb U   = "u"
outputGrubbAsciiX grb AU  = "e"

-- | Output a lower-case Grubb-ASCII character.
outputGrubbAsciiY :: GrubbOptions -> KwakLetter -> String
outputGrubbAsciiY grb M   = "M"
outputGrubbAsciiY grb MY  
  | grb.grbUse7 = "7M"
  | otherwise   = "'M"
outputGrubbAsciiY grb N   = "N"
outputGrubbAsciiY grb NY  
  | grb.grbUse7  = "7N"
  | otherwise = "'N"
outputGrubbAsciiY grb P   = "P"
outputGrubbAsciiY grb T   = "T"
outputGrubbAsciiY grb B   = "B"
outputGrubbAsciiY grb D   = "D"
outputGrubbAsciiY grb PY
  | grb.grbUse7 = "P7"
  | otherwise   = "P'"
outputGrubbAsciiY grb TY
  | grb.grbUse7 = "T7"
  | otherwise   = "T'"
outputGrubbAsciiY grb TS  = "Ts"
outputGrubbAsciiY grb TL  = "Tl"
outputGrubbAsciiY grb DZ  = "Dz"
outputGrubbAsciiY grb DL  = "Dl"
outputGrubbAsciiY grb TSY -- note this
  | grb.grbUse7 = "Ts7"
  | otherwise   = "Ts'"
outputGrubbAsciiY grb TLY -- note this
  | grb.grbUse7 = "Tl7"
  | otherwise   = "Tl'"
outputGrubbAsciiY grb S   = "S"
outputGrubbAsciiY grb LH  = "Lh"
outputGrubbAsciiY grb L   = "L"
outputGrubbAsciiY grb LY
  | grb.grbUse7 = "7L"
  | otherwise   = "'L"
outputGrubbAsciiY grb J   = "Y"
outputGrubbAsciiY grb JY
  | grb.grbUse7 = "7Y"
  | otherwise   = "'Y"
outputGrubbAsciiY grb K   = "K"
outputGrubbAsciiY grb KW  = "Kw"
outputGrubbAsciiY grb G   = "G"
outputGrubbAsciiY grb GW  = "Gw"
outputGrubbAsciiY grb KY
  | grb.grbUse7 = "K7"
  | otherwise   = "K'"
outputGrubbAsciiY grb KWY
  | grb.grbUse7 = "Kw7"
  | otherwise   = "Kw'"
outputGrubbAsciiY grb Q   = "Kh"
outputGrubbAsciiY grb QW  = "Khw"
outputGrubbAsciiY grb GU  = "Gh"
outputGrubbAsciiY grb GUW = "Ghw"
outputGrubbAsciiY grb QY
  | grb.grbUse7 = "Kh7"
  | otherwise   = "Kh'"
outputGrubbAsciiY grb QWY
  | grb.grbUse7 = "Khw7"
  | otherwise   = "Khw'"
outputGrubbAsciiY grb X   = "X"
outputGrubbAsciiY grb XW  = "Xw"
outputGrubbAsciiY grb XU  = "Xh"
outputGrubbAsciiY grb XUW = "Xhw"
outputGrubbAsciiY grb W   = "W"
outputGrubbAsciiY grb WY
  | grb.grbUse7 = "7W"
  | otherwise   = "'W"
outputGrubbAsciiY grb Y   = "'"
outputGrubbAsciiY grb H
  | grb.grbUseJ = "J"
  | otherwise   = "H"
outputGrubbAsciiY grb A   = "A"
outputGrubbAsciiY grb E   = "Eh"
outputGrubbAsciiY grb I   = "I"
outputGrubbAsciiY grb O   = "O"
outputGrubbAsciiY grb U   = "U"
outputGrubbAsciiY grb AU  = "E"

outputGrubbAsciiLetter :: GrubbOptions -> CasedLetter -> String
outputGrubbAsciiLetter grb (Maj x) = outputGrubbAsciiY grb x
outputGrubbAsciiLetter grb (Min x) = outputGrubbAsciiX grb x

outputGrubbAsciiChar :: GrubbOptions -> CasedChar -> String
outputGrubbAsciiChar grb (Kwak  x) = outputGrubbAsciiLetter grb x
outputGrubbAsciiChar grb (Punct x) = x

outputGrubbAsciiWord :: GrubbOptions -> CasedWord -> String
outputGrubbAsciiWord grb (KwakW  x)
  | (not grb.grbUse') = outputWord grb x
  | otherwise         = foldMap (outputGrubbAsciiLetter grb) x
outputGrubbAsciiWord grb (PunctW x) = x

outputWord :: GrubbOptions -> List CasedLetter -> String
outputWord grb Nil = ""
outputWord grb (Cons (Maj Y) rst) = foldMap (outputGrubbAsciiLetter grb) rst
outputWord grb (Cons (Min Y) rst) = foldMap (outputGrubbAsciiLetter grb) rst
outputWord grb xs = foldMap (outputGrubbAsciiLetter grb) xs

outputGrubbAsciiChars' :: GrubbOptions -> List CasedChar -> String
outputGrubbAsciiChars' grb Nil = ""
outputGrubbAsciiChars' grb (Cons (Punct x) (Cons y@(Kwak z) rst) )
  | (isCharLetter Y y)  &&  (not grb.grbUse') = x <> outputGrubbAsciiChars' grb rst
  | otherwise = x <> outputGrubbAsciiLetter grb z <> outputGrubbAsciiChars' grb rst
outputGrubbAsciiChars' grb (Cons (Punct x) rst)
  = x <> outputGrubbAsciiChars' grb rst
outputGrubbAsciiChars' grb (Cons (Kwak  x) rst)
  = outputGrubbAsciiLetter grb x <> outputGrubbAsciiChars' grb rst

-- | Ouptut Grubb-ASCII text with configurable options.
outputGrubbAsciiChars :: GrubbOptions -> List CasedChar -> String
outputGrubbAsciiChars grb Nil = ""
outputGrubbAsciiChars grb (Cons y@(Kwak z) rst)
  | (isCharLetter Y y) && (not grb.grbUse') = outputGrubbAsciiChars' grb rst
  | otherwise = outputGrubbAsciiLetter grb z <> outputGrubbAsciiChars' grb rst
outputGrubbAsciiChars grb xs = outputGrubbAsciiChars' grb xs

-- | Output Grubb-ASCII text with the default options.
outputGrubbAsciiCharsDef :: GrubbOptions -> List CasedChar -> String
outputGrubbAsciiCharsDef grb xs = outputGrubbAsciiChars defGrubbOptions xs

