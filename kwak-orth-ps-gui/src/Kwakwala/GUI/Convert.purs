module Kwakwala.GUI.Convert 
  ( convertOrthography
  , convertOrthographyWL
  , convertOrthographyWR
  ) where

import Prelude

import Data.List (List)
import Kwakwala.GUI.Types (KwakInputType(..), KwakOutputType(..), AllOrthOptions)

import Kwakwala.Output.Grubb (GrubbOptions, outputGrubbAsciiChars, outputGrubbAsciiWords)
import Kwakwala.Output.IPA (IPAOptions, outputIPAChars, outputIPAWords)
import Kwakwala.Output.Napa (outputNapaChars, outputNapaWords)
import Kwakwala.Output.Syllabic (outputSyllabics, outputSyllabicsWords)
import Kwakwala.Output.Umista (outputUmistaChars, outputUmistaWords)

import Kwakwala.Parsing.Boas (encodeFromBoas, encodeFromBoasChunk, encodeFromBoasWordsL, encodeFromBoasWordsR)
import Kwakwala.Parsing.Grubb (encodeFromGrubbAscii, encodeFromGrubbAsciiChunk, encodeFromGrubbWordsL, encodeFromGrubbWordsR)
import Kwakwala.Parsing.Island (encodeFromIsland, encodeFromIslandChunk, encodeFromIslandWordsL, encodeFromIslandWordsR)
import Kwakwala.Parsing.Napa (encodeFromNapa, encodeFromNapaChunk, encodeFromNapaWordsL, encodeFromNapaWordsR)
import Kwakwala.Parsing.Umista (encodeFromUmista, encodeFromUmistaChunk, encodeFromUmistaWordsL, encodeFromUmistaWordsR)

import Kwakwala.Types (CasedChar, CasedWord)

convertOrthography :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthography kit kot ops = (encodeByType kit) >>> (outputByType kot ops)

convertOrthographyWL :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthographyWL kit kot ops = (encodeByTypeWL kit) >>> (outputByTypeW kot ops)

convertOrthographyWR :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthographyWR kit kot ops = (encodeByTypeWR kit) >>> (outputByTypeW kot ops)

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

encodeByTypeWL :: KwakInputType -> String -> List CasedWord
encodeByTypeWL kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsL str -- encodeFromGrubbAscii str
  InNapa   -> encodeFromNapaWordsL   str -- encodeFromNapa   str
  InUmista -> encodeFromUmistaWordsL str -- encodeFromUmista str
  InIsland -> encodeFromIslandWordsL str -- encodeFromIsland str
  InBoas   -> encodeFromBoasWordsL   str -- encodeFromBoas   str

encodeByTypeWR :: KwakInputType -> String -> List CasedWord
encodeByTypeWR kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsR str -- encodeFromGrubbAscii str
  InNapa   -> encodeFromNapaWordsR   str -- encodeFromNapa   str
  InUmista -> encodeFromUmistaWordsR str -- encodeFromUmista str
  InIsland -> encodeFromIslandWordsR str -- encodeFromIsland str
  InBoas   -> encodeFromBoasWordsR   str -- encodeFromBoas   str

outputByTypeW :: KwakOutputType -> AllOrthOptions -> List CasedWord -> String
outputByTypeW kot ops lst = case kot of
  OutGrubb    -> outputGrubbAsciiWords ops.grubbOrthOptions lst
  OutNapa     -> outputNapaWords   lst
  OutUmista   -> outputUmistaWords lst
  OutIPA      -> outputIPAWords ops.ipaOrthOptions lst
  OutSyllabic -> outputSyllabicsWords lst
