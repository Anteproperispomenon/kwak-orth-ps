module Parsing.Chunkified
  ( runParserChunk
  , runParserChunkPar
  -- , ChunkifiedString
  ) where

import Prelude

import Parsing (ParseError, Parser, runParser)
import Control.Parallel (parTraverse)
import Control.Parallel.Class (class Parallel)
import Data.Either (Either(..))
import Data.List (List, singleton)
import Data.Traversable (fold, traverse, sequence)
-- import Parsing.Chunking (ChunkifiedString)


-- | A variant of `runParser` that is specialised
-- | to work on the output of `chunkifyString`.
runParserChunk :: forall a. Monoid a => Either String (List String) -> Parser String a -> Either ParseError a
runParserChunk (Left  str) prs = runParser str prs
runParserChunk (Right lst) prs
  = fold <$> traverse (parserRun prs) lst

parserRun :: forall s a. Parser s a -> s -> Either ParseError a
parserRun prs s = runParser s prs

-- | A variant of `runParser` that is specialised
-- | to work on the output of `chunkifyString`.
-- | Unlike `runParserChunk`, it parses chunks
-- | in parallel. Hopefully this will work better,
-- | but who knows.
runParserChunkPar :: forall f m a. Parallel f m => Applicative f => Applicative m => Either String (List String) -> Parser String a -> m (Either ParseError (List a))
runParserChunkPar (Left  str) prs = pure $ singleton <$> runParser str prs
runParserChunkPar (Right lst) prs
  = map sequence $ parTraverse (\x -> pure $ runParser x prs) lst
-- How it works:
-- parTraverse (...) lst returns a list of
-- (Either ParseError a) embedded in the Monad m.
-- If any of the individual results fail to parse,
-- we want the computation as a whole to be
-- (Left <parse_error>). Thus we use `sequence` to
-- convert (List (Either ParseError a)) to
-- (Either ParseError (List a)). However, we have
-- to lift the `sequence` computation into the
-- proper Monad, which we do with `map`.
