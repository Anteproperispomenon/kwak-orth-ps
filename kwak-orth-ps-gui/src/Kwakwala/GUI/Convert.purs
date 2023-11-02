module Kwakwala.GUI.Convert 
  ( convertOrthography
  ) where

import Prelude

import Kwakwala.GUI.Types
  ( KwakInputType (..)
  , KwakOutputType(..)
  , AllOrthOptions
  )

import Data.List (List)

import Kwakwala.Output.Grubb    (outputGrubbAsciiChars, GrubbOptions)
import Kwakwala.Output.Napa     (outputNapaChars)
import Kwakwala.Output.Umista   (outputUmistaChars)
import Kwakwala.Output.IPA      (outputIPAChars, IPAOptions)
import Kwakwala.Output.Syllabic (outputSyllabics)

import Kwakwala.Parsing.Boas   (encodeFromBoas)
import Kwakwala.Parsing.Grubb  (encodeFromGrubbAscii)
import Kwakwala.Parsing.Island (encodeFromIsland)
import Kwakwala.Parsing.Napa   (encodeFromNapa)
import Kwakwala.Parsing.Umista (encodeFromUmista)

import Kwakwala.Types (CasedChar)

convertOrthography :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthography kit kot ops = (encodeByType kit) >>> (outputByType kot ops)

encodeByType :: KwakInputType -> String -> List CasedChar
encodeByType kit str = case kit of
  InGrubb  -> encodeFromGrubbAscii str
  InNapa   -> encodeFromNapa   str
  InUmista -> encodeFromUmista str
  InIsland -> encodeFromIsland str
  InBoas   -> encodeFromBoas   str

outputByType :: KwakOutputType -> AllOrthOptions -> List CasedChar -> String
outputByType kot ops lst = case kot of
  OutGrubb    -> outputGrubbAsciiChars ops.grubbOrthOptions lst
  OutNapa     -> outputNapaChars   lst
  OutUmista   -> outputUmistaChars lst
  OutIPA      -> outputIPAChars ops.ipaOrthOptions lst
  OutSyllabic -> outputSyllabics lst
