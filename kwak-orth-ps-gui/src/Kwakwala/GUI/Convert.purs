{-|
Module      : Kwakwala.GUI.Convert
Description : Generalised Orthography Conversion Functions
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This module contains functions that can
-- | be used to convert between orthographies
-- | where the orthographiy types are arguments
-- | to the function.

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

import Kwakwala.Output.Arabic (outputArabicChars, outputArabicWords) -- , GrubbOptions
import Kwakwala.Output.Grubb (outputGrubbAsciiChars, outputGrubbAsciiWords) -- , GrubbOptions
import Kwakwala.Output.IPA (outputIPAChars, outputIPAWords) -- , IPAOptions
import Kwakwala.Output.Napa (outputNapaChars, outputNapaWords)
import Kwakwala.Output.Syllabic (outputSyllabics, outputSyllabicsWords)
import Kwakwala.Output.Umista (outputUmistaChars, outputUmistaWords)
import Kwakwala.Output.Arabic (outputArabicChars, outputArabicWords)

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
  , outputArabicWordsParC
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

-- | Convert a `String` from one orthography to another
-- | in one function. This is useful if you don't care
-- | about the intermediate steps/values. However, if
-- | you want to store/examine the intermediate values,
-- | you'll likely want to use functions such as
-- | `encodeByTypeParL` and `outputByTypePar` instead.
-- | 
-- | This particular version is the simplest, using 
-- | `CasedChar`s as the intermediate type, and not
-- | processing the data in parallel.
convertOrthography :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthography kit kot ops = (encodeByType kit) >>> (outputByType kot ops)

-- | Convert a `String` from one orthography to another
-- | in one function. This is useful if you don't care
-- | about the intermediate steps/values. However, if
-- | you want to store/examine the intermediate values,
-- | you'll likely want to use functions such as
-- | `encodeByTypeParL` and `outputByTypePar` instead.
-- | 
-- | This particular version uses `CasedWord`s as the
-- | intermediate type. The `CasedWord`s are grouped
-- | together with a left-fold. This version does NOT
-- | process chunks in parallel.
convertOrthographyWL :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthographyWL kit kot ops = (encodeByTypeWL kit) >>> (outputByTypeW kot ops)

-- | Convert a `String` from one orthography to another
-- | in one function. This is useful if you don't care
-- | about the intermediate steps/values. However, if
-- | you want to store/examine the intermediate values,
-- | you'll likely want to use functions such as
-- | `encodeByTypeParR` and `outputByTypePar` instead. 
-- | 
-- | This particular version uses `CasedWord`s as the
-- | intermediate type. The `CasedWord`s are grouped
-- | together with a right-fold. This version does **NOT**
-- | process chunks in parallel.
convertOrthographyWR :: KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> String
convertOrthographyWR kit kot ops = (encodeByTypeWR kit) >>> (outputByTypeW kot ops)

-- | Convert a `String` from one orthography to another
-- | in one function. This is useful if you don't care
-- | about the intermediate steps/values. However, if
-- | you want to store/examine the intermediate values,
-- | you'll likely want to use functions such as
-- | `encodeByTypeParL` and `outputByTypePar` instead.
-- | 
-- | This particular version uses `CasedWord`s as the
-- | intermediate type. The `CasedWord`s are grouped
-- | together with a left-fold. This version **DOES** perform
-- | the parsing and outputting in parallel, which is why
-- | the output is stored in a `Monad`.
convertOrthographyParL :: forall f m. Parallel f m => Applicative f => Monad m => KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> m String
convertOrthographyParL kit kot ops = (encodeByTypeParL kit) >=> (outputByTypePar kot ops)

-- | Convert a `String` from one orthography to another
-- | in one function. This is useful if you don't care
-- | about the intermediate steps/values. However, if
-- | you want to store/examine the intermediate values,
-- | you'll likely want to use functions such as
-- | `encodeByTypeParR` and `outputByTypePar` instead.
-- | 
-- | This particular version uses `CasedWord`s as the
-- | intermediate type. The `CasedWord`s are grouped
-- | together with a right-fold. This version **DOES** perform
-- | the parsing and outputting in parallel, which is why
-- | the output is stored in a `Monad`.
convertOrthographyParR :: forall f m. Parallel f m => Applicative f => Monad m => KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> m String
convertOrthographyParR kit kot ops = (encodeByTypeParR kit) >=> (outputByTypePar kot ops)

-- | Convert a `ChunkifiedString` from one orthography 
-- | to another in one function. Unlike earlier functions,
-- | however, this version separates out the the chunkifying
-- | step, which can be useful if you want to store/examine
-- | the `ChunkifiedString` or want more control over
-- | how the `String`s are Chunkified.
-- | 
-- | This particular version uses `CasedWord`s as the
-- | intermediate type. The `CasedWord`s are grouped
-- | together with a left-fold. This version **DOES** perform
-- | the parsing and outputting in parallel, which is why
-- | the output is stored in a `Monad`.
convertOrthographyParL' :: forall f m. Parallel f m => Applicative f => Monad m => KwakInputType -> KwakOutputType -> AllOrthOptions -> ChunkifiedString -> m String
convertOrthographyParL' kit kot ops = (encodeByTypeParL' kit) >=> (outputByTypePar kot ops)

-- | Convert a `ChunkifiedString` from one orthography 
-- | to another in one function. Unlike earlier functions,
-- | however, this version separates out the the chunkifying
-- | step, which can be useful if you want to store/examine
-- | the `ChunkifiedString` or want more control over
-- | how the `String`s are Chunkified.
-- | 
-- | This particular version uses `CasedWord`s as the
-- | intermediate type. The `CasedWord`s are grouped
-- | together with a right-fold. This version **DOES** perform
-- | the parsing and outputting in parallel, which is why
-- | the output is stored in a `Monad`.
convertOrthographyParR' :: forall f m. Parallel f m => Applicative f => Monad m => KwakInputType -> KwakOutputType -> AllOrthOptions -> ChunkifiedString -> m String
convertOrthographyParR' kit kot ops = (encodeByTypeParR' kit) >=> (outputByTypePar kot ops)

-- | Parse a `String` into a `List` of `CasedChar`s using the
-- | input type specified by the `KwakInputType` argument.
-- | This simple version doesn't parse the input in parallel.
encodeByType :: KwakInputType -> String -> List CasedChar
encodeByType kit str = case kit of
  InGrubb  -> encodeFromGrubbAsciiChunk str -- encodeFromGrubbAscii str
  InNapa   -> encodeFromNapaChunk   str -- encodeFromNapa   str
  InUmista -> encodeFromUmistaChunk str -- encodeFromUmista str
  InIsland -> encodeFromIslandChunk str -- encodeFromIsland str
  InBoas   -> encodeFromBoasChunk   str -- encodeFromBoas   str

-- | Convert a `List` of `CasedChar`s into a `String`
-- | using the specified Output Orthography options
-- | in the function arguments.
outputByType :: KwakOutputType -> AllOrthOptions -> List CasedChar -> String
outputByType kot ops lst = case kot of
  OutGrubb    -> outputGrubbAsciiChars ops.grubbOrthOptions lst
  OutNapa     -> outputNapaChars   lst
  OutUmista   -> outputUmistaChars lst
  OutIPA      -> outputIPAChars ops.ipaOrthOptions lst
  OutSyllabic -> outputSyllabics lst
  OutArabic   -> outputArabicChars ops.arabicOrthOptions lst

-- | Parse a `String` into a `List` of `CasedWord`s using the
-- | input type specified by the `KwakInputType` argument.
-- | This simple version doesn't parse the input in parallel,
-- | but does group the output into words. This version groups
-- | the outputs into words with a left-fold.
encodeByTypeWL :: KwakInputType -> String -> List CasedWord
encodeByTypeWL kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsL str -- encodeFromGrubbAscii str
  InNapa   -> encodeFromNapaWordsL   str -- encodeFromNapa   str
  InUmista -> encodeFromUmistaWordsL str -- encodeFromUmista str
  InIsland -> encodeFromIslandWordsL str -- encodeFromIsland str
  InBoas   -> encodeFromBoasWordsL   str -- encodeFromBoas   str

-- | Parse a `String` into a `List` of `CasedWord`s using the
-- | input type specified by the `KwakInputType` argument.
-- | This simple version doesn't parse the input in parallel,
-- | but does group the output into words. This version groups
-- | the outputs into words with a right-fold.
encodeByTypeWR :: KwakInputType -> String -> List CasedWord
encodeByTypeWR kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsR str -- encodeFromGrubbAscii str
  InNapa   -> encodeFromNapaWordsR   str -- encodeFromNapa   str
  InUmista -> encodeFromUmistaWordsR str -- encodeFromUmista str
  InIsland -> encodeFromIslandWordsR str -- encodeFromIsland str
  InBoas   -> encodeFromBoasWordsR   str -- encodeFromBoas   str

-- | Convert a `List` of `CasedWord`s into a `String`
-- | using the specified Output Orthography options
-- | in the function arguments.
outputByTypeW :: KwakOutputType -> AllOrthOptions -> List CasedWord -> String
outputByTypeW kot ops lst = case kot of
  OutGrubb    -> outputGrubbAsciiWords ops.grubbOrthOptions lst
  OutNapa     -> outputNapaWords   lst
  OutUmista   -> outputUmistaWords lst
  OutIPA      -> outputIPAWords ops.ipaOrthOptions lst
  OutSyllabic -> outputSyllabicsWords lst
  OutArabic   -> outputArabicWords ops.arabicOrthOptions lst

-- | Convert a `String` into a `CachedParse` by
-- | chunkifying it and then parsing it in parallel.
-- | Works on any input orthography type by specifying 
-- | it with a value of type `KwakInputType`. This 
-- | version converts the output into `CasedWord`s with 
-- | a left-fold.
encodeByTypeParL :: forall f m. Parallel f m => Applicative f => Applicative m => KwakInputType -> String -> m (List (List CasedWord))
encodeByTypeParL kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsParL str
  InNapa   -> encodeFromNapaWordsParL str
  InUmista -> encodeFromUmistaWordsParL str
  InIsland -> encodeFromIslandWordsParL str
  InBoas   -> encodeFromBoasWordsParL str

-- | Convert a `String` into a `CachedParse` by
-- | chunkifying it and then parsing it in parallel.
-- | Works on any input orthography type by specifying 
-- | it with a value of type `KwakInputType`. This 
-- | version converts the output into `CasedWord`s with 
-- | a right-fold.
encodeByTypeParR :: forall f m. Parallel f m => Applicative f => Applicative m => KwakInputType -> String -> m (List (List CasedWord))
encodeByTypeParR kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsParR str
  InNapa   -> encodeFromNapaWordsParR str
  InUmista -> encodeFromUmistaWordsParR str
  InIsland -> encodeFromIslandWordsParR str
  InBoas   -> encodeFromBoasWordsParR str

-- | Convert a `CachedParse` (i.e. `List (List CasedWord)`)
-- | into a String using the selected output Orthography. 
-- | Since the input is of type `List (List CasedWord)`,
-- | the output is processed concurrently (at least in
-- | theory). The blocks that are processed concurrently
-- | correspond to the Chunks of text that are produced 
-- | by `chunkifyText`.
-- |
-- | For example, in
-- | ```purescript
-- | exampleChunks :: List (List CasedWord)
-- | exampleChunks
-- |   = [ chunk1, chunk2, chunk3, chunk 4]
-- |   where
-- |     chunk1 = [KwakW [Maj KW, Min A, Min KWY, Min a, Min L, Min A], PunctW " ", ... ]
-- |     chunk2 = ...
-- |     chunk3 = ...
-- |     chunk4 = ...
-- | ```
-- |
-- | `chunk1`, `chunk2`, `chunk3`, and `chunk4` would
-- | processed concurrently.
outputByTypePar :: forall f m. Parallel f m => Applicative f => Applicative m => KwakOutputType -> AllOrthOptions -> List (List CasedWord) -> m String
outputByTypePar kot ops lst = case kot of
  OutGrubb    -> outputGrubbWordsParC ops.grubbOrthOptions lst
  OutNapa     -> outputNapaWordsParC   lst
  OutUmista   -> outputUmistaWordsParC lst
  OutIPA      -> outputIPAWordsParC ops.ipaOrthOptions lst
  OutSyllabic -> outputSyllabicsWordsParC lst
  OutArabic   -> outputArabicWordsParC ops.arabicOrthOptions lst

----------------------------------------------------------------
-- Encoding from Already Chunkified Text.

-- | A simple type synonym for the output type
-- | of `encodeByTypeParL`, `encodeByTypeParL'`,
-- | etc... This can then be fed into functions
-- | like `outputByTypePar`.
type CachedParse = (List (List CasedWord))

-- | Convert a `ChunkifiedString` into a `CachedParse`
-- | by parsing it in parallel. Works on any input
-- | orthography type by specifying it with a value
-- | of type `KwakInputType`. This version converts
-- | the output into `CasedWord`s with a left-fold.
encodeByTypeParL' :: forall f m. Parallel f m => Applicative f => Applicative m => KwakInputType -> ChunkifiedString -> m (List (List CasedWord))
encodeByTypeParL' kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsParL' str
  InNapa   -> encodeFromNapaWordsParL' str
  InUmista -> encodeFromUmistaWordsParL' str
  InIsland -> encodeFromIslandWordsParL' str
  InBoas   -> encodeFromBoasWordsParL' str
  
-- | Convert a `ChunkifiedString` into a `CachedParse`
-- | by parsing it in parallel. Works on any input
-- | orthography type by specifying it with a value
-- | of type `KwakInputType`. This version converts
-- | the output into `CasedWord`s with a right-fold.
encodeByTypeParR' :: forall f m. Parallel f m => Applicative f => Applicative m => KwakInputType -> ChunkifiedString -> m (List (List CasedWord))
encodeByTypeParR' kit str = case kit of
  InGrubb  -> encodeFromGrubbWordsParR' str
  InNapa   -> encodeFromNapaWordsParR' str
  InUmista -> encodeFromUmistaWordsParR' str
  InIsland -> encodeFromIslandWordsParR' str
  InBoas   -> encodeFromBoasWordsParR' str

