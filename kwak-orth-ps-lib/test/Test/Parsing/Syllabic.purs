module Test.Parsing.Syllabic
  ( testSyllabicParse1
  , testSyllabicParse2
  -- , testSyllabicParse3
  ) where

import Prelude
import Test.Words (randomWords)

import Benchotron.Core (Benchmark, benchFn, mkBenchmark)

import Data.String.Common (toLower)

import Test.Helpers (diffStringDisp)
import Test.QuickCheck (withHelp, Result)
import Test.QuickCheck.Gen (Gen)

import Kwakwala.Parsing.Grubb (encodeFromGrubbWordsL, encodeFromGrubbWordsFastL)
import Kwakwala.Parsing.Syllabic  (encodeFromSyllabicW)

import Kwakwala.Output.Grubb (defGrubbOptions, outputGrubbAsciiWords)
import Kwakwala.Output.Syllabic (outputSyllabicsWords)

testSyllabicParse1 :: Gen Result
testSyllabicParse1 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ toLower $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputSyllabicsWords prs2
  prs3 <- pure $ encodeFromSyllabicW out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)


testSyllabicParse2 :: Gen Result
testSyllabicParse2 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputSyllabicsWords prs1
  prs2 <- pure $ encodeFromSyllabicW out1
  out2 <- pure $ outputSyllabicsWords prs2
  pure $ withHelp (out2 == out1) $ (diffStringDisp 40 out1 out2)


{-
testSyllabicParse2 :: Gen Result
testSyllabicParse2 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputNapaWords prs2
  prs3 <- pure $ encodeFromNapaWordsL out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)
-}


