module Test.Parsing.Arabic
  ( testArabicParse1
  , testArabicParse2
  , testArabicParse3
  , testArabicParse4
  , testArabicParse5
  ) where

import Prelude
import Test.Words (randomWords)

import Data.String.Common (toLower)

import Test.Helpers (diffStringDisp)
import Test.QuickCheck (withHelp, Result)
import Test.QuickCheck.Gen (Gen)

import Kwakwala.Parsing.Grubb (encodeFromGrubbWordsL)
import Kwakwala.Parsing.Arabic (encodeFromArabicWords)

import Kwakwala.Output.Grubb (defGrubbOptions, outputGrubbAsciiWords)
import Kwakwala.Output.Arabic
  ( outputArabicWords
  , defArabicOptions
  , ArabicAOption(..)
  , ArabicEOption(..)
  , ArabicGOption(..)
  , ArabicGuOption(..)
  , ArabicIOption(..)
  , ArabicLhOption(..)
  , ArabicOOption(..)
  , ArabicOptions
  , ArabicUOption(..)
  )

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

testArabicParse2 :: Gen Result
testArabicParse2 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ toLower $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputArabicWords (defArabicOptions {combHamza = false}) prs2
  prs3 <- pure $ encodeFromArabicWords out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)

testArabicParse3 :: Gen Result
testArabicParse3 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ toLower $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputArabicWords altOptions1 prs2
  prs3 <- pure $ encodeFromArabicWords out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)

testArabicParse4 :: Gen Result
testArabicParse4 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ toLower $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputArabicWords altOptions2 prs2
  prs3 <- pure $ encodeFromArabicWords out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)

testArabicParse5 :: Gen Result
testArabicParse5 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ toLower $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputArabicWords defArabicOptions prs2
  prs3 <- pure $ encodeFromArabicWords out2
  out3 <- pure $ outputArabicWords defArabicOptions prs3
  pure $ withHelp (out3 == out2) $ (diffStringDisp 40 out2 out3)


altOptions1 :: ArabicOptions
altOptions1 
  = { arbLhKind : LhLhah
    , arbGuKind : GuGhain
    , arbGKind  : GLikeQ
    , arbAKind  : AAlifDia
    , arbEKind  : EWedgeI
    , arbIKind  : IStandard
    , arbOKind  : OWedgeU
    , arbUKind  : UStandard
    , combHamza : false
    }

altOptions2 :: ArabicOptions
altOptions2 = altOptions1 {combHamza = true} 
