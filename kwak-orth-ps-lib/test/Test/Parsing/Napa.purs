module Test.Parsing.Napa
  ( testNapaParse1
  , testNapaParse2
  , testNapaParse3
  , testNapaFast1
  , testNapaFast2
  , testNapaFast3
  , testNapaFast4
  , testNapaFast5
  , testNapaFast6
  , benchNapa
  ) where

import Prelude
import Test.Words (randomWords)

import Benchotron.Core (Benchmark, benchFn, mkBenchmark)

import Data.String.Common (toLower, toUpper)

import Test.Helpers (diffStringDisp)
import Test.QuickCheck (withHelp, Result)
import Test.QuickCheck.Gen (Gen)

import Kwakwala.Parsing.Grubb (encodeFromGrubbWordsL, encodeFromGrubbWordsFastL)
import Kwakwala.Parsing.Napa  (encodeFromNapaWordsL, encodeFromNapaWordsFastL)

import Kwakwala.Output.Grubb (defGrubbOptions, outputGrubbAsciiWords)
import Kwakwala.Output.Napa (outputNapaWords)

import Kwakwala.Types (toMinW, toMajW)

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

testNapaFast2 :: Gen Result
testNapaFast2 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputNapaWords prs1
  prs2 <- pure $ encodeFromNapaWordsFastL out1
  out2 <- pure $ outputNapaWords prs2
  pure $ withHelp (out2 == out1) $ (diffStringDisp 40 out1 out2)

testNapaFast3 :: Gen Result
testNapaFast3 = do
  wrds <- toLower <$> randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputNapaWords prs1
  outU <- pure $ toUpper out1
  prs2 <- pure $ encodeFromNapaWordsFastL outU
  out2 <- pure $ outputNapaWords prs2
  outL <- pure $ toLower out2
  pure $ withHelp (outL == out1) $ (diffStringDisp 40 out1 outL)

testNapaFast4 :: Gen Result
testNapaFast4 = do
  wrds <- toLower <$> randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputNapaWords prs1
  outU <- pure $ toUpper out1
  prs2 <- pure $ encodeFromNapaWordsFastL outU
  prsL <- pure $ map toMinW prs2
  out2 <- pure $ outputNapaWords prsL
  pure $ withHelp (out2 == out1) $ (diffStringDisp 40 out1 out2)

testNapaFast5 :: Gen Result
testNapaFast5 = do
  wrds <- toLower <$> randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsFastL wrds
  out1 <- pure $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ map toMajW $ encodeFromGrubbWordsFastL wrds
  out2 <- pure $ outputNapaWords prs2
  prs3 <- pure $ encodeFromNapaWordsFastL out2
  prsL <- pure $ map toMinW prs3
  outL <- pure $ outputGrubbAsciiWords defGrubbOptions prsL
  pure $ withHelp (outL == out1) $ (diffStringDisp 40 out1 outL)

testNapaFast6 :: Gen Result
testNapaFast6 = do
  wrds <- toLower <$> randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsFastL wrds
  out1 <- pure $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ map toMajW $ encodeFromGrubbWordsFastL wrds
  out2 <- pure $ outputNapaWords prs2
  prs3 <- pure $ encodeFromNapaWordsFastL out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  outL <- pure $ toLower out3
  pure $ withHelp (outL == out1) $ (diffStringDisp 40 out1 outL)


benchNapa :: Benchmark
benchNapa = mkBenchmark
  { slug  : "napa-time-1"
  , title : "Comparing Different NAPA Parsers"
  , sizes : [5,10,20,30,40,50,60,70,80,90,100,150,200,250,300]
  , sizeInterpretation : "Words"
  , inputsPerSize : 10
  , gen : (\n -> outputNapaWords <$> encodeFromGrubbWordsFastL <$> randomWords n)
  , functions: [ benchFn "Original NAPA" encodeFromNapaWordsL
               , benchFn "New NAPA" encodeFromNapaWordsFastL
               ]
  }

