module Test.Parsing.Arabic
  ( testArabicParse1
  ) where

import Prelude
import Test.Words

import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Foldable (fold)
import Data.String (uncons, null)

import Data.String.Common (toLower)

import Parsing.Chunking
import Test.QuickCheck (withHelp, Result)
import Test.QuickCheck.Gen (Gen)

import Kwakwala.Parsing.Arabic
import Kwakwala.Parsing.Grubb

import Kwakwala.Output.Arabic
import Kwakwala.Output.Grubb

testArabicParse1 :: Gen Result
testArabicParse1 = do
  wrds <- randomWords 3
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ toLower $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsL out1
  out2 <- pure $ outputArabicWords defArabicOptions prs2
  prs3 <- pure $ encodeFromArabicWords out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffString 0 out1 out3) <> "\nString 1: " <> out1 <> "\nString 2: " <> out3

diffString :: Int -> String -> String -> String
diffString idx str1 str2
  | null str1 && null str2 = "Both Strings end at index " <> show idx
  | null str1 = "String 1 ends before String 2 at index " <> show idx
  | null str2 = "String 2 ends before String 1 at index " <> show idx
  | otherwise = case (uncons str1) of
    Nothing -> "Weird error."
    (Just str1uc) -> case (uncons str2) of
      Nothing -> "Weird error."
      (Just str2uc) -> if (str1uc.head == str2uc.head)
        then diffString (idx+1) str1uc.tail str2uc.tail
        else "The two strings differ at index " <> show idx

