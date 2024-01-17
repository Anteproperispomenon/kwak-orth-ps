module Test.Chunking
  ( testChunking
  , testChunkingGen
  , fromChunkified
  ) where

import Prelude
import Test.Words

import Data.Either (Either(..))
import Data.Foldable (fold)

import Parsing.Chunking
import Test.QuickCheck.Gen (Gen)

fromChunkified :: ChunkifiedString -> String
fromChunkified (Left  str ) = str
fromChunkified (Right strs) = fold strs

testChunking :: String -> Boolean
testChunking str = str == (fromChunkified (chunkifyText 256 128 str))

testChunkingGen :: Int -> Gen Boolean
testChunkingGen n = do
  x <- randomWords n
  pure $ testChunking x


