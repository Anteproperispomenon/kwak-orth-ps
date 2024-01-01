module Test.Chunking.Parsing
  ( testGrubbChunk1
  ) where

import Prelude

import Test.Words (randomWords)
import Test.QuickCheck.Gen (Gen)
import Kwakwala.Parsing.Grubb (encodeFromGrubbAscii, encodeFromGrubbAsciiChunk)

-- import Parsing.Chunking
-- import Test.Chunking


testGrubbChunk1 :: Gen Boolean
testGrubbChunk1 = do
  wrds <- randomWords 200
  prs1 <- pure $ encodeFromGrubbAscii wrds
  prs2 <- pure $ encodeFromGrubbAsciiChunk wrds
  pure $ prs1 == prs2

-- testGrubbChunk2 :: Gen Boolean
-- testGrubbChunk2

