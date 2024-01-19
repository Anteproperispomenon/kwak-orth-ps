module Test.Parsing.Umista
  ( testUmistaParse1
  , testUmistaParse2
  , testUmistaParse3
  , testUmistaParse4
  ) where

import Prelude
import Test.Words (randomWords)

import Data.String.Common (toLower)

import Test.Helpers (diffStringDisp)
import Test.QuickCheck (withHelp, Result)
import Test.QuickCheck.Gen (Gen)

import Kwakwala.Parsing.Grubb  (encodeFromGrubbWordsL)
import Kwakwala.Parsing.Umista (encodeFromUmistaWordsL, encodeFromUmistaWordsFast)

import Kwakwala.Output.Grubb (defGrubbOptions, outputGrubbAsciiWords)
import Kwakwala.Output.Umista (outputUmistaWords)

testUmistaParse1 :: Gen Result
testUmistaParse1 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ toLower $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputUmistaWords prs2
  prs3 <- pure $ encodeFromUmistaWordsL out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)

testUmistaParse2 :: Gen Result
testUmistaParse2 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputUmistaWords prs2
  prs3 <- pure $ encodeFromUmistaWordsL out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)

testUmistaParse3 :: Gen Result
testUmistaParse3 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputUmistaWords prs1
  prs2 <- pure $ encodeFromUmistaWordsL out1
  out2 <- pure $ outputUmistaWords prs2
  pure $ withHelp (out2 == out1) $ (diffStringDisp 40 out1 out2)

testUmistaParse4 :: Gen Result
testUmistaParse4 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputUmistaWords prs1
  prs2 <- pure $ encodeFromUmistaWordsFast out1
  out2 <- pure $ outputUmistaWords prs2
  pure $ withHelp (out2 == out1) $ (diffStringDisp 40 out1 out2)

