module Kwakwala.Output.Parallel
  ( outputNapaWordsPar
  , outputNapaWordsParC
  , outputUmistaWordsPar
  , outputUmistaWordsParC
  , outputGrubbWordsPar
  , outputGrubbWordsParC
  , outputIPAWordsPar
  , outputIPAWordsParC
  , outputSyllabicsWordsPar
  , outputSyllabicsWordsParC
  )
 where

import Prelude

import Control.Parallel (parTraverse)
import Control.Parallel.Class (class Parallel)

import Data.List (List)
import Data.Foldable (fold)

import Kwakwala.Output.Grubb    (GrubbOptions, outputGrubbAsciiWords)
import Kwakwala.Output.IPA      (IPAOptions, outputIPAWords)
import Kwakwala.Output.Napa     (outputNapaWords)
import Kwakwala.Output.Syllabic (outputSyllabicsWords)
import Kwakwala.Output.Umista   (outputUmistaWords)

import Kwakwala.Types (CasedWord)

outputNapaWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m (List String)
outputNapaWordsPar lsts = parTraverse (\cws -> pure $ outputNapaWords cws) lsts

outputNapaWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m String
outputNapaWordsParC lsts = map fold $ outputNapaWordsPar lsts

outputUmistaWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m (List String)
outputUmistaWordsPar lsts = parTraverse (\cws -> pure $ outputUmistaWords cws) lsts

outputUmistaWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m String
outputUmistaWordsParC lsts = map fold $ outputUmistaWordsPar lsts

outputGrubbWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => GrubbOptions -> List (List CasedWord) -> m (List String)
outputGrubbWordsPar grb lsts = parTraverse (\cws -> pure $ outputGrubbAsciiWords grb cws) lsts

outputGrubbWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => GrubbOptions -> List (List CasedWord) -> m String
outputGrubbWordsParC grb lsts = map fold $ (outputGrubbWordsPar grb) lsts

outputIPAWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => IPAOptions -> List (List CasedWord) -> m (List String)
outputIPAWordsPar ops lsts = parTraverse (\cws -> pure $ outputIPAWords ops cws) lsts

outputIPAWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => IPAOptions -> List (List CasedWord) -> m String
outputIPAWordsParC ops lsts = map fold $ (outputIPAWordsPar ops) lsts

outputSyllabicsWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m (List String)
outputSyllabicsWordsPar lsts = parTraverse (\cws -> pure $ outputSyllabicsWords cws) lsts

outputSyllabicsWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m String
outputSyllabicsWordsParC lsts = map fold $ outputSyllabicsWordsPar lsts

