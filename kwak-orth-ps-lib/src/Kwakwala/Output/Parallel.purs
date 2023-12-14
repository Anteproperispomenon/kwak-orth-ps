{-|
Module      : Kwakwala.Output.Parallel
Description : Parallelised Output Functions
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This module contains output functions that run
-- | in parallel. They work using the `Parallel`
-- | interface from `Control.Parallel`.

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

-- | Output a `CachedParse`/`List (List CasedWord)` into NAPA
-- | by running the outputters in parallel. This version 
-- | leaves the output as a list of `String`s.
outputNapaWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m (List String)
outputNapaWordsPar lsts = parTraverse (\cws -> pure $ outputNapaWords cws) lsts

-- | Output a `CachedParse`/`List (List CasedWord)` into NAPA
-- | by running the outputters in parallel. This version 
-- | concatenates the output into a single `String`.
outputNapaWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m String
outputNapaWordsParC lsts = map fold $ outputNapaWordsPar lsts

-- | Output a `CachedParse`/`List (List CasedWord)` into U'mista
-- | by running the outputters in parallel. This version 
-- | leaves the output as a list of `String`s.
outputUmistaWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m (List String)
outputUmistaWordsPar lsts = parTraverse (\cws -> pure $ outputUmistaWords cws) lsts

-- | Output a `CachedParse`/`List (List CasedWord)` into U'mista
-- | by running the outputters in parallel. This version 
-- | concatenates the output into a single `String`.
outputUmistaWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m String
outputUmistaWordsParC lsts = map fold $ outputUmistaWordsPar lsts

-- | Output a `CachedParse`/`List (List CasedWord)` into Grubb
-- | by running the outputters in parallel. This version 
-- | leaves the output as a list of `String`s.
outputGrubbWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => GrubbOptions -> List (List CasedWord) -> m (List String)
outputGrubbWordsPar grb lsts = parTraverse (\cws -> pure $ outputGrubbAsciiWords grb cws) lsts

-- | Output a `CachedParse`/`List (List CasedWord)` into Grubb
-- | by running the outputters in parallel. This version 
-- | concatenates the output into a single `String`.
outputGrubbWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => GrubbOptions -> List (List CasedWord) -> m String
outputGrubbWordsParC grb lsts = map fold $ (outputGrubbWordsPar grb) lsts

-- | Output a `CachedParse`/`List (List CasedWord)` into IPA
-- | by running the outputters in parallel. This version 
-- | leaves the output as a list of `String`s.
outputIPAWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => IPAOptions -> List (List CasedWord) -> m (List String)
outputIPAWordsPar ops lsts = parTraverse (\cws -> pure $ outputIPAWords ops cws) lsts

-- | Output a `CachedParse`/`List (List CasedWord)` into IPA
-- | by running the outputters in parallel. This version 
-- | concatenates the output into a single `String`.
outputIPAWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => IPAOptions -> List (List CasedWord) -> m String
outputIPAWordsParC ops lsts = map fold $ (outputIPAWordsPar ops) lsts

-- | Output a `CachedParse`/`List (List CasedWord)` into Syllabics
-- | by running the outputters in parallel. This version 
-- | leaves the output as a list of `String`s.
outputSyllabicsWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m (List String)
outputSyllabicsWordsPar lsts = parTraverse (\cws -> pure $ outputSyllabicsWords cws) lsts

-- | Output a `CachedParse`/`List (List CasedWord)` into Syllabics
-- | by running the outputters in parallel. This version 
-- | concatenates the output into a single `String`.
outputSyllabicsWordsParC :: forall f m. Parallel f m => Applicative f => Applicative m => List (List CasedWord) -> m String
outputSyllabicsWordsParC lsts = map fold $ outputSyllabicsWordsPar lsts

