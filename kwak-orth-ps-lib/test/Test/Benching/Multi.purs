module Test.Benching.Multi
  ( benchMulti 
  , benchMulti2
  , benchMulti3
  , benchMultiLR
  , benchUmista
  )
 where

import Prelude

import Benchotron.Core (Benchmark, benchFn, mkBenchmark)

import Test.Benching.Gen

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

benchMulti :: Benchmark
benchMulti = mkBenchmark
  { slug  : "multi-orth-time"
  , title : "Comparing Various Parsers"
  , sizes : [5,10,20,30,40,50,60,70,80,90,100,150,200,250,300]
  , sizeInterpretation : "Words"
  , inputsPerSize : 10
  , gen : randomWordsMult
  , functions: [ benchFn "Original Grubb"     ( encodeFromGrubbWordsL      <<< _.grubbSentence  )
               , benchFn "New Grubb 1"        ( encodeFromGrubbWordsFastL  <<< _.grubbSentence  )
               , benchFn "New Grubb 2"        ( encodeFromGrubbWordsFast2L <<< _.grubbSentence  )
               , benchFn "Original NAPA"      ( encodeFromNapaWordsL       <<< _.napaSentence   )
               , benchFn "New NAPA"           ( encodeFromNapaWordsFastL   <<< _.napaSentence   )
               , benchFn "Umista Left-Words"  ( encodeFromUmistaWordsL     <<< _.umistaSentence )
               , benchFn "Umista Right-Words" ( encodeFromUmistaWordsR     <<< _.umistaSentence )
               , benchFn "Arabic Parser"      ( encodeFromArabicWords      <<< _.arabicSentence )
               ]
  }

benchMulti2 :: Benchmark
benchMulti2 = mkBenchmark
  { slug  : "multi-orth-time-2"
  , title : "Comparing Various Parsers"
  , sizes : [5,10,20,30,50,75,100,150,200]
  , sizeInterpretation : "Words"
  , inputsPerSize : 5
  , gen : randomWordsMult
  , functions: -- [ benchFn "Original Grubb"     ( encodeFromGrubbWordsL      <<< _.grubbSentence  )
               [ benchFn "New Grubb 1"        ( encodeFromGrubbWordsFastL  <<< _.grubbSentence  )
               -- , benchFn "New Grubb 2"        ( encodeFromGrubbWordsFast2L <<< _.grubbSentence  )
               , benchFn "Original NAPA"      ( encodeFromNapaWordsL       <<< _.napaSentence   )
               , benchFn "New NAPA"           ( encodeFromNapaWordsFastL   <<< _.napaSentence   )
               , benchFn "Umista Left-Words"  ( encodeFromUmistaWordsL     <<< _.umistaSentence )
               -- , benchFn "Umista Right-Words" ( encodeFromUmistaWordsR     <<< _.umistaSentence )
               , benchFn "Arabic Parser"      ( encodeFromArabicWords      <<< _.arabicSentence )
               ]
  }

benchMulti3 :: Benchmark
benchMulti3 = mkBenchmark
  { slug  : "multi-orth-time-3"
  , title : "Comparing Various Parsers"
  , sizes : [5,10,20,30,50,75,100,150,200]
  , sizeInterpretation : "Words"
  , inputsPerSize : 5
  , gen : randomWordsMult
  , functions: [ benchFn "Original Grubb"     ( encodeFromGrubbWordsL      <<< _.grubbSentence    )
               , benchFn "New Grubb 1"        ( encodeFromGrubbWordsFastL  <<< _.grubbSentence    )
               -- , benchFn "New Grubb 2"        ( encodeFromGrubbWordsFast2L <<< _.grubbSentence  )
               , benchFn "Syllabic"           ( encodeFromSyllabicW        <<< _.syllabicSentence )
               , benchFn "Umista Left-Words"  ( encodeFromUmistaWordsL     <<< _.umistaSentence   )
               -- , benchFn "Umista Right-Words" ( encodeFromUmistaWordsR     <<< _.umistaSentence )
               , benchFn "Arabic Parser"      ( encodeFromArabicWords      <<< _.arabicSentence   )
               ]
  }

benchMultiLR :: Benchmark
benchMultiLR = mkBenchmark
  { slug  : "multi-orth-time-LR"
  , title : "Comparing Various Parsers"
  , sizes : [5,10,20,30,50,75,100,150,200]
  , sizeInterpretation : "Words"
  , inputsPerSize : 5
  , gen : randomWordsMult
  , functions: -- [ benchFn "Original Grubb"     ( encodeFromGrubbWordsL      <<< _.grubbSentence  )
               [ benchFn "New Grubb L"        ( encodeFromGrubbWordsFastL  <<< _.grubbSentence  )
               , benchFn "New Grubb R"        ( encodeFromGrubbWordsFastR  <<< _.grubbSentence  )
               -- , benchFn "New Grubb 2"        ( encodeFromGrubbWordsFast2L <<< _.grubbSentence  )
               , benchFn "Original NAPA L"    ( encodeFromNapaWordsL       <<< _.napaSentence   )
               , benchFn "Original NAPA R"    ( encodeFromNapaWordsR       <<< _.napaSentence   )
               -- , benchFn "New NAPA"           ( encodeFromNapaWordsFastL   <<< _.napaSentence   )
               -- , benchFn "Umista Left-Words"  ( encodeFromUmistaWordsL     <<< _.umistaSentence )
               -- , benchFn "Umista Right-Words" ( encodeFromUmistaWordsR     <<< _.umistaSentence )
               -- , benchFn "Arabic Parser"      ( encodeFromArabicWords      <<< _.arabicSentence )
               ]
  }

benchUmista :: Benchmark
benchUmista = mkBenchmark
  { slug  : "umista-orth-time-1"
  , title : "Comparing U'mista Parsers"
  , sizes : [5,10,20,30,50,75,100,150,200]
  , sizeInterpretation : "Words"
  , inputsPerSize : 5
  , gen : randomWordsMult
  , functions: [ benchFn "Fast U'mista"       ( encodeFromUmistaWordsFast <<< _.umistaSentence )
               , benchFn "Umista Left-Words"  ( encodeFromUmistaWordsL    <<< _.umistaSentence )
               , benchFn "Umista Right-Words" ( encodeFromUmistaWordsR    <<< _.umistaSentence )
               ]
  }
