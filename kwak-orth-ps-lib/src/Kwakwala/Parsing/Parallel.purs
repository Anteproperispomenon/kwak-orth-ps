{-|
Module      : Kwakwala.Parsing.Parallel
Description : Parallelised Parsing/Encoding Functions
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | Parallel versions of other parsers.
-- | Hopefully these will work as expected.
-- | To run in parallel, these functions use the 
-- | `Parallel` interface from `Control.Parallel`.

module Kwakwala.Parsing.Parallel
  ( encodeFromUmistaWordsParL
  , encodeFromUmistaWordsParR
  , encodeFromNapaWordsParL
  , encodeFromNapaWordsParR
  , encodeFromGrubbWordsParL
  , encodeFromGrubbWordsParR
  , encodeFromBoasWordsParL
  , encodeFromBoasWordsParR
  , encodeFromIslandWordsParL
  , encodeFromIslandWordsParR
  , encodeFromArabicWordsPar
  , encodeFromSyllabicWordsPar
  , encodeFromUmistaWordsParL'
  , encodeFromUmistaWordsParR'
  , encodeFromNapaWordsParL'
  , encodeFromNapaWordsParR'
  , encodeFromGrubbWordsParL'
  , encodeFromGrubbWordsParR'
  , encodeFromBoasWordsParL'
  , encodeFromBoasWordsParR'
  , encodeFromIslandWordsParL'
  , encodeFromIslandWordsParR'
  , encodeFromArabicWordsPar'
  , encodeFromSyllabicWordsPar'
  ) where

import Prelude

-- import Control.Parallel (parTraverse)
import Control.Parallel.Class (class Parallel)

import Data.Either (fromRight)
import Data.List (List(..))

import Kwakwala.Parsing.Boas     (parseBoas)
import Kwakwala.Parsing.Grubb    (parseGrubbAscii)
import Kwakwala.Parsing.Island   (parseIsland)
import Kwakwala.Parsing.Napa     (parseNapa)
import Kwakwala.Parsing.Umista   (parseUmista)
import Kwakwala.Parsing.Arabic   (parseArabicWords)
import Kwakwala.Parsing.Syllabic (parseSyllabicW)

import Kwakwala.Types (CasedWord, toWordsL, toWordsR)

import Parsing.Chunking   (chunkifyText, ChunkifiedString)
import Parsing.Chunkified (runParserChunkPar)

-- Pre-defined Chunk Size.
-- Useful to change the chunk
-- size for all functions at once.
chkSz :: Int
chkSz = 1024

-- Pre-defined max file size.
-- Useful to change the chunk
-- size for all functions at once.
flSz :: Int
flSz = 2048

-- | Encode from U'mista using a chunkified
-- | parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromUmistaWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromUmistaWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseUmista)

-- | Encode from U'mista using a chunkified
-- | parser running in parallel. Uses structural
-- | recursion to group the output into words.
encodeFromUmistaWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromUmistaWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseUmista)

-- | Encode from NAPA using a chunkified
-- | parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromNapaWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromNapaWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseNapa)

-- | Encode from NAPA using a chunkified
-- | parser running in parallel. Uses structural
-- | recursion to group the output into words.
encodeFromNapaWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromNapaWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseNapa)

-- | Encode from Grubb using a chunkified
-- | parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromGrubbWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromGrubbWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseGrubbAscii)

-- | Encode from Grubb using a chunkified
-- | parser running in parallel. Uses structural
-- | recursion to group the output into words.
encodeFromGrubbWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromGrubbWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseGrubbAscii)

-- | Encode from Boas using a chunkified
-- | parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromBoasWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromBoasWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseBoas)

-- | Encode from Boas using a chunkified
-- | parser running in parallel. Uses structural
-- | recursion to group the output into words.
encodeFromBoasWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromBoasWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseBoas)

-- | Encode from Island using a chunkified
-- | parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromIslandWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromIslandWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseIsland)

-- | Encode from Island using a chunkified
-- | parser running in parallel. Uses structural
-- | recursion to group the output into words.
encodeFromIslandWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromIslandWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseIsland)

-- | Encode from Arabic using a chunkified
-- | parser running in parallel.
encodeFromArabicWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromArabicWordsPar txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) parseArabicWords

encodeFromSyllabicWordsPar :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromSyllabicWordsPar txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) parseSyllabicW

----------------------------------------------------------------------
-- Versions that take a `ChunkifiedString` as input

-- | Encode from a chunkified U'mista `String`
-- | with a parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromUmistaWordsParL' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromUmistaWordsParL' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsL <$> parseUmista)

-- | Encode from a chunkified U'mista `String` with
-- | a parser running in parallel. Uses structural 
-- | recursion to group the output into words.
encodeFromUmistaWordsParR' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromUmistaWordsParR' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsR <$> parseUmista)

-- | Encode from a chunkified NAPA `String`
-- | with a parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromNapaWordsParL' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromNapaWordsParL' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsL <$> parseNapa)

-- | Encode from a chunkified NAPA `String` with
-- | a parser running in parallel. Uses structural 
-- | recursion to group the output into words.
encodeFromNapaWordsParR' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromNapaWordsParR' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsR <$> parseNapa)

-- | Encode from a chunkified Grubb `String`
-- | with a parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromGrubbWordsParL' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromGrubbWordsParL' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsL <$> parseGrubbAscii)

-- | Encode from a chunkified Grubb `String` with
-- | a parser running in parallel. Uses structural 
-- | recursion to group the output into words.
encodeFromGrubbWordsParR' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromGrubbWordsParR' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsR <$> parseGrubbAscii)

-- | Encode from a chunkified Boas `String`
-- | with a parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromBoasWordsParL' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromBoasWordsParL' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsL <$> parseBoas)

-- | Encode from a chunkified Boas `String` with
-- | a parser running in parallel. Uses structural 
-- | recursion to group the output into words.
encodeFromBoasWordsParR' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromBoasWordsParR' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsR <$> parseBoas)

-- | Encode from a chunkified Island `String`
-- | with a parser running in parallel. Uses an 
-- | accumulator to group the output into words.
encodeFromIslandWordsParL' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromIslandWordsParL' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsL <$> parseIsland)

-- | Encode from a chunkified Island `String` with
-- | a parser running in parallel. Uses structural 
-- | recursion to group the output into words.
encodeFromIslandWordsParR' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromIslandWordsParR' txt = map (fromRight Nil) $ runParserChunkPar txt (toWordsR <$> parseIsland)

-- | Encode from a chunkified Arabic `String`
-- | with a parser running in parallel.
encodeFromArabicWordsPar' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromArabicWordsPar' txt = map (fromRight Nil) $ runParserChunkPar txt parseArabicWords

encodeFromSyllabicWordsPar' :: forall f m. Parallel f m => Applicative f => Applicative m => ChunkifiedString -> m (List (List CasedWord))
encodeFromSyllabicWordsPar' txt = map (fromRight Nil) $ runParserChunkPar txt parseSyllabicW

