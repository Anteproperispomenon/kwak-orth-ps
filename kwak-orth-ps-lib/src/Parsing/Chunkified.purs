module Parsing.Chunkified
  ( runParserChunk
  ) where

import Prelude

import Parsing (ParseError, Parser, runParser)
import Data.Either (Either(..))
import Data.List (List)
import Data.Traversable (fold, traverse)

-- | A variant of `runParser` that is specialised
-- | to work on the output of `chunkifyString`.
runParserChunk :: forall a. Monoid a => Either String (List String) -> Parser String a -> Either ParseError a
runParserChunk (Left  str) prs = runParser str prs
runParserChunk (Right lst) prs
  = fold <$> traverse (parserRun prs) lst

parserRun :: forall s a. Parser s a -> s -> Either ParseError a
parserRun prs s = runParser s prs
