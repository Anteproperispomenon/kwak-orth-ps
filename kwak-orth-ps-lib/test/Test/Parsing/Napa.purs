module Test.Parsing.Napa
  ( testNapaParse1
  , testNapaParse2
  , testNapaParse3
  , testNapaFast1
  ) where

import Prelude
import Test.Words (randomWords)

import Data.String.Common (toLower)

import Test.Helpers (diffStringDisp)
import Test.QuickCheck (withHelp, Result)
import Test.QuickCheck.Gen (Gen)

import Kwakwala.Parsing.Grubb (encodeFromGrubbWordsL)
import Kwakwala.Parsing.Napa  (encodeFromNapaWordsL, encodeFromNapaWordsFastL)

import Kwakwala.Output.Grubb (defGrubbOptions, outputGrubbAsciiWords)
import Kwakwala.Output.Napa (outputNapaWords)

testNapaParse1 :: Gen Result
testNapaParse1 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ toLower $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputNapaWords prs2
  prs3 <- pure $ encodeFromNapaWordsL out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)

testNapaParse2 :: Gen Result
testNapaParse2 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputNapaWords prs2
  prs3 <- pure $ encodeFromNapaWordsL out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)

testNapaParse3 :: Gen Result
testNapaParse3 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputNapaWords prs1
  prs2 <- pure $ encodeFromNapaWordsL out1
  out2 <- pure $ outputNapaWords prs2
  pure $ withHelp (out2 == out1) $ (diffStringDisp 40 out1 out2)

testNapaFast1 :: Gen Result
testNapaFast1 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputNapaWords prs1
  prs2 <- pure $ encodeFromNapaWordsL out1
  out2 <- pure $ outputGrubbAsciiWords defGrubbOptions prs2
  prs3 <- pure $ encodeFromNapaWordsFastL out1
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out2) $ (diffStringDisp 40 out3 out2)


