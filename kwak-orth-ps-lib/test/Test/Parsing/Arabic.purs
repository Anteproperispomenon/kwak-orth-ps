module Test.Parsing.Arabic
  ( testArabicParse1
  ) where

import Prelude
import Test.Words

import Data.Either (Either(..))
import Data.Foldable (fold)


import Data.String.Common (toLower)

-- import Parsing.Chunking
import Test.Helpers
import Test.QuickCheck (withHelp, Result)
import Test.QuickCheck.Gen (Gen)

import Kwakwala.Parsing.Arabic
import Kwakwala.Parsing.Grubb

import Kwakwala.Output.Arabic
import Kwakwala.Output.Grubb

testArabicParse1 :: Gen Result
testArabicParse1 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ toLower $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputArabicWords defArabicOptions prs2
  prs3 <- pure $ encodeFromArabicWords out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)
  -- pure $ withHelp (out3 == out1) $ (diffString 0 out1 out3) <> "\nString 1: " <> out1 <> "\nString 2: " <> out3


