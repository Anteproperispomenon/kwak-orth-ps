-- | Parallel versions of other parsers.
-- | Hopefully these will work as expected.

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
  ) where

import Prelude

-- import Control.Parallel (parTraverse)
import Control.Parallel.Class (class Parallel)

import Data.Either (fromRight)
import Data.List (List(..))

import Kwakwala.Parsing.Boas   (parseBoas)
import Kwakwala.Parsing.Grubb  (parseGrubbAscii)
import Kwakwala.Parsing.Island (parseIsland)
import Kwakwala.Parsing.Napa   (parseNapa)
import Kwakwala.Parsing.Umista (parseUmista)

import Kwakwala.Types (CasedWord, toWordsL, toWordsR)

import Parsing.Chunking   (chunkifyText)
import Parsing.Chunkified (runParserChunkPar)

chkSz :: Int
chkSz = 1024

flSz :: Int
flSz = 2048

encodeFromUmistaWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromUmistaWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseUmista)

encodeFromUmistaWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromUmistaWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseUmista)

encodeFromNapaWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromNapaWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseNapa)

encodeFromNapaWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromNapaWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseNapa)

encodeFromGrubbWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromGrubbWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseGrubbAscii)

encodeFromGrubbWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromGrubbWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseGrubbAscii)

encodeFromBoasWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromBoasWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseBoas)

encodeFromBoasWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromBoasWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseBoas)

encodeFromIslandWordsParL :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromIslandWordsParL txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsL <$> parseIsland)

encodeFromIslandWordsParR :: forall f m. Parallel f m => Applicative f => Applicative m => String -> m (List (List CasedWord))
encodeFromIslandWordsParR txt = map (fromRight Nil) $ runParserChunkPar (chunkifyText flSz chkSz txt) (toWordsR <$> parseIsland)


