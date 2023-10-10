module Kwakwala.GUI.Convert 
  ( convertOrthography
  ) where

import Prelude

import Kwakwala.GUI.Types
  ( KwakInputType (..)
  , KwakOutputType(..)
  )

import Data.List (List)

import Kwakwala.Output.Grubb    (outputGrubbAsciiChars, GrubbOptions)
import Kwakwala.Output.Napa     (outputNapaChars)
import Kwakwala.Output.Umista   (outputUmistaChars)
import Kwakwala.Output.Syllabic (outputSyllabics)

import Kwakwala.Parsing.Boas   (encodeFromBoas)
import Kwakwala.Parsing.Grubb  (encodeFromGrubbAscii)
import Kwakwala.Parsing.Island (encodeFromIsland)
import Kwakwala.Parsing.Napa   (encodeFromNapa)
import Kwakwala.Parsing.Umista (encodeFromUmista)

import Kwakwala.Types (CasedChar)

convertOrthography :: KwakInputType -> KwakOutputType -> GrubbOptions -> String -> String
convertOrthography kit kot gbo = (encodeByType kit) >>> (outputByType kot gbo)

encodeByType :: KwakInputType -> String -> List CasedChar
encodeByType kit str = case kit of
  InGrubb  -> encodeFromGrubbAscii str
  InNapa   -> encodeFromNapa   str
  InUmista -> encodeFromUmista str
  InIsland -> encodeFromIsland str
  InBoas   -> encodeFromBoas   str

outputByType :: KwakOutputType -> GrubbOptions -> List CasedChar -> String
outputByType kot gbo lst = case kot of
  OutGrubb    -> outputGrubbAsciiChars gbo lst
  OutNapa     -> outputNapaChars   lst
  OutUmista   -> outputUmistaChars lst
  OutSyllabic -> outputSyllabics lst
