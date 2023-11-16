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

import Kwakwala.Parsing.Boas   (encodeFromBoas, encodeFromBoasChunk)
import Kwakwala.Parsing.Grubb  (encodeFromGrubbAscii, encodeFromGrubbAsciiChunk)
import Kwakwala.Parsing.Island (encodeFromIsland, encodeFromIslandChunk)
import Kwakwala.Parsing.Napa   (encodeFromNapa, encodeFromNapaChunk)
import Kwakwala.Parsing.Umista (encodeFromUmista, encodeFromUmistaChunk)

import Kwakwala.Types (CasedChar)

convertOrthography :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthography kit kot ops = (encodeByType kit) >>> (outputByType kot ops)

encodeByType :: KwakInputType -> String -> List CasedChar
encodeByType kit str = case kit of
  InGrubb  -> encodeFromGrubbAsciiChunk str -- encodeFromGrubbAscii str
  InNapa   -> encodeFromNapaChunk   str -- encodeFromNapa   str
  InUmista -> encodeFromUmistaChunk str -- encodeFromUmista str
  InIsland -> encodeFromIslandChunk str -- encodeFromIsland str
  InBoas   -> encodeFromBoasChunk   str -- encodeFromBoas   str

outputByType :: KwakOutputType -> AllOrthOptions -> List CasedChar -> String
outputByType kot ops lst = case kot of
  OutGrubb    -> outputGrubbAsciiChars ops.grubbOrthOptions lst
  OutNapa     -> outputNapaChars   lst
  OutUmista   -> outputUmistaChars lst
  OutIPA      -> outputIPAChars ops.ipaOrthOptions lst
  OutSyllabic -> outputSyllabics lst
