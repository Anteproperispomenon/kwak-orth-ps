module Test.Benching.Gen
  ( MultipleOrths
  , randomWordsMult
  ) where

import Prelude

import Test.QuickCheck.Gen (Gen)
import Test.Words

import Kwakwala.Output.Grubb
import Kwakwala.Output.Napa
import Kwakwala.Output.Umista
import Kwakwala.Output.Arabic
import Kwakwala.Output.Syllabic

import Kwakwala.Parsing.Grubb
import Kwakwala.Parsing.Napa
import Kwakwala.Parsing.Umista
import Kwakwala.Parsing.Arabic
import Kwakwala.Parsing.Syllabic

-- | A type to be used to generate the same
-- | "sentence" in multiple orthographies.
-- | The reason for this is that Benchotron
-- | requires that all tests to run on the
-- | generated data use the same input data.
-- | Converting it to the required orthography
-- | after the generation step would be counted
-- | as part of the benchmarking time, severely
-- | inflating the time taken. This type allows
-- | the benchmarked function to simply select
-- | the orthography from the record.
type MultipleOrths
  = { grubbSentence    :: String
    , napaSentence     :: String
    , umistaSentence   :: String
    , arabicSentence   :: String
    , syllabicSentence :: String
    }

randomWordsMult :: Int -> Gen MultipleOrths
randomWordsMult n = do
  wrds <- randomWords n
  let grubbParsed   = encodeFromGrubbWordsFastL wrds
      grubbWords    = outputGrubbAsciiWords  defGrubbOptions grubbParsed
      napaWords     = outputNapaWords   grubbParsed
      umistaWords   = outputUmistaWords grubbParsed
      arabicWords   = outputArabicWords defArabicOptions grubbParsed
      syllabicWords = outputSyllabicsWords grubbParsed
  pure
    { grubbSentence    : grubbWords
    , napaSentence     : napaWords
    , umistaSentence   : umistaWords
    , arabicSentence   : arabicWords
    , syllabicSentence : syllabicWords
    }

