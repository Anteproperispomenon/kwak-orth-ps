module Kwakwala.GUI.Convert 
  ( convertOrthography
  , convertOrthographyWL
  , convertOrthographyWR
  , convertOrthographyParL
  , convertOrthographyParR
  , convertOrthographyParL'
  , convertOrthographyParR'
  , encodeByTypeParL'
  , encodeByTypeParR'
  , outputByTypePar
  , CachedParse
  ) where

import Prelude

-- import Control.Monad ((>=>)) -- already in Prelude
import Control.Parallel.Class (class Parallel)
import Data.List (List)
import Kwakwala.GUI.Types (KwakInputType(..), KwakOutputType(..), AllOrthOptions)

import Kwakwala.Output.Grubb (outputGrubbAsciiChars, outputGrubbAsciiWords) -- , GrubbOptions
import Kwakwala.Output.IPA (outputIPAChars, outputIPAWords) -- , IPAOptions
import Kwakwala.Output.Napa (outputNapaChars, outputNapaWords)
import Kwakwala.Output.Syllabic (outputSyllabics, outputSyllabicsWords)
import Kwakwala.Output.Umista (outputUmistaChars, outputUmistaWords)

import Kwakwala.Parsing.Boas (encodeFromBoasChunk, encodeFromBoasWordsL, encodeFromBoasWordsR) -- , encodeFromBoas)
import Kwakwala.Parsing.Grubb (encodeFromGrubbAsciiChunk, encodeFromGrubbWordsL, encodeFromGrubbWordsR) -- , encodeFromGrubbAscii)
import Kwakwala.Parsing.Island (encodeFromIslandChunk, encodeFromIslandWordsL, encodeFromIslandWordsR) -- , encodeFromIsland
import Kwakwala.Parsing.Napa (encodeFromNapaChunk, encodeFromNapaWordsL, encodeFromNapaWordsR) -- , encodeFromNapa
import Kwakwala.Parsing.Umista (encodeFromUmistaChunk, encodeFromUmistaWordsL, encodeFromUmistaWordsR) -- , encodeFromUmista

import Kwakwala.Output.Parallel
  ( outputGrubbWordsParC
  , outputIPAWordsParC
  , outputNapaWordsParC
  , outputSyllabicsWordsParC
  , outputUmistaWordsParC
  )
import Kwakwala.Parsing.Parallel
  ( encodeFromBoasWordsParL
  , encodeFromBoasWordsParR
  , encodeFromGrubbWordsParL
  , encodeFromGrubbWordsParR
  , encodeFromIslandWordsParL
  , encodeFromIslandWordsParR
  , encodeFromNapaWordsParL
  , encodeFromNapaWordsParR
  , encodeFromUmistaWordsParL
  , encodeFromUmistaWordsParR
  , encodeFromBoasWordsParL'
  , encodeFromBoasWordsParR'
  , encodeFromGrubbWordsParL'
  , encodeFromGrubbWordsParR'
  , encodeFromIslandWordsParL'
  , encodeFromIslandWordsParR'
  , encodeFromNapaWordsParL'
  , encodeFromNapaWordsParR'
  , encodeFromUmistaWordsParL'
  , encodeFromUmistaWordsParR'
  )

import Kwakwala.Types (CasedChar, CasedWord)

import Parsing.Chunking (ChunkifiedString)

convertOrthography :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthography kit kot ops = (encodeByType kit) >>> (outputByType kot ops)

convertOrthographyWL :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthographyWL kit kot ops = (encodeByTypeWL kit) >>> (outputByTypeW kot ops)

convertOrthographyWR :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthographyWR kit kot ops = (encodeByTypeWR kit) >>> (outputByTypeW kot ops)

convertOrthographyParL :: forall f m. Parallel f m => Applicative f => Monad m => KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> m String
convertOrthographyParL kit kot ops = (encodeByTypeParL kit) >=> (outputByTypePar kot ops)

convertOrthographyParR :: forall f m. Parallel f m => Applicative f => Monad m => KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> m String
convertOrthographyParR kit kot ops = (encodeByTypeParR kit) >=> (outputByTypePar kot ops)

convertOrthographyParL' :: forall f m. Parallel f m => Applicative f => Monad m => KwakInputType -> KwakOutputType -> AllOrthOptions -> ChunkifiedString -> m String
convertOrthographyParL' kit kot ops = (encodeByTypeParL' kit) >=> (outputByTypePar kot ops)

convertOrthographyParR' :: forall f m. Parallel f m => Applicative f => Monad m => KwakInputType -> KwakOutputType -> AllOrthOptions -> ChunkifiedString -> m String
convertOrthographyParR' kit kot ops = (encodeByTypeParR' kit) >=> (outputByTypePar kot ops)

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

encodeByTypeParL :: forall f m. Parallel f m => Applicative f => Applicative m => KwakInputType -> String -> m (List (List CasedWord))
encodeByTypeParL kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsParL str
  InNapa   -> encodeFromNapaWordsParL str
  InUmista -> encodeFromUmistaWordsParL str
  InIsland -> encodeFromIslandWordsParL str
  InBoas   -> encodeFromBoasWordsParL str
  
encodeByTypeParR :: forall f m. Parallel f m => Applicative f => Applicative m => KwakInputType -> String -> m (List (List CasedWord))
encodeByTypeParR kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsParR str
  InNapa   -> encodeFromNapaWordsParR str
  InUmista -> encodeFromUmistaWordsParR str
  InIsland -> encodeFromIslandWordsParR str
  InBoas   -> encodeFromBoasWordsParR str

outputByTypePar :: forall f m. Parallel f m => Applicative f => Applicative m => KwakOutputType -> AllOrthOptions -> List (List CasedWord) -> m String
outputByTypePar kot ops lst = case kot of
  OutGrubb    -> outputGrubbWordsParC ops.grubbOrthOptions lst
  OutNapa     -> outputNapaWordsParC   lst
  OutUmista   -> outputUmistaWordsParC lst
  OutIPA      -> outputIPAWordsParC ops.ipaOrthOptions lst
  OutSyllabic -> outputSyllabicsWordsParC lst

----------------------------------------------------------------
-- Encoding from Already Chunkified Text.

type CachedParse = (List (List CasedWord))

encodeByTypeParL' :: forall f m. Parallel f m => Applicative f => Applicative m => KwakInputType -> ChunkifiedString -> m (List (List CasedWord))
encodeByTypeParL' kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsParL' str
  InNapa   -> encodeFromNapaWordsParL' str
  InUmista -> encodeFromUmistaWordsParL' str
  InIsland -> encodeFromIslandWordsParL' str
  InBoas   -> encodeFromBoasWordsParL' str
  
encodeByTypeParR' :: forall f m. Parallel f m => Applicative f => Applicative m => KwakInputType -> ChunkifiedString -> m (List (List CasedWord))
encodeByTypeParR' kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsParR' str
  InNapa   -> encodeFromNapaWordsParR' str
  InUmista -> encodeFromUmistaWordsParR' str
  InIsland -> encodeFromIslandWordsParR' str
  InBoas   -> encodeFromBoasWordsParR' str

