module Test.Parsing.Grubb
  ( grubbTimer
  , benchGrubb
  , testGrubbParse1
  , testGrubbParse2
  ) where

import Prelude
import Test.Words (randomWords)

import Benchotron.Core (Benchmark, benchFn, mkBenchmark)

import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Writer (class MonadWriter)

import Data.String.Common (toLower)
import Data.Traversable (for, for_)

import Data.Time (diff, Time)
import Data.Time.Duration (Milliseconds)
import Effect (Effect)
import Effect.Class (liftEffect, class MonadEffect)
import Effect.Now (nowTime)
import Effect.Exception (Error)
import Effect.Class.Console (log)

import Test.Helpers (diffStringDisp)
import Test.QuickCheck (withHelp, Result)
import Test.QuickCheck.Gen (Gen, randomSample')
import Test.Spec.Console (tellLn)
import Test.Words 
import Test.Spec (Spec, it)
-- import Test.Spec (itclass Example)
import Test.Spec.Assertions (shouldEqual)

import Kwakwala.Parsing.Grubb (encodeFromGrubbWordsL, encodeFromGrubbWordsFastL, encodeFromGrubbWordsFast2L)

import Kwakwala.Output.Grubb (defGrubbOptions, outputGrubbAsciiWords)


-- grubbTimer :: forall t arg g. Example t arg g => t
-- grubbTimer :: forall m. MonadEffect m => MonadWriter String m => MonadThrow Error m => Monad m => m Unit
-- grubbTimer :: Spec Unit
grubbTimer :: forall m. MonadEffect m => MonadThrow Error m => Monad m => m Unit
grubbTimer = do
  wrds1 <- liftEffect $ randomSample' 50 (randomWords 150)
  
  tm1 <- liftEffect $ nowTime
  rslts1 <- for wrds1 $ \sntc -> do
    pure $ encodeFromGrubbWordsFastL sntc
  tm2 <- liftEffect $ nowTime
  let dur1 = diffMS tm2 tm1

  tm3 <- liftEffect $ nowTime
  rslts2 <- for wrds1 $ \sntc -> do
    pure $ encodeFromGrubbWordsL sntc
  tm4 <- liftEffect $ nowTime
  let dur2 = diffMS tm4 tm3

  tm5 <- liftEffect $ nowTime
  rslts3 <- for wrds1 $ \sntc -> do
    pure $ encodeFromGrubbWordsFast2L sntc
  tm6 <- liftEffect $ nowTime
  let dur3 = diffMS tm6 tm5

  liftEffect $ log $ "Original Version: " <> show dur2 <> " ms"
  liftEffect $ log $ "Newer    Version: " <> show dur1 <> " ms"
  liftEffect $ log $ "Newerer  Version: " <> show dur3 <> " ms"
  outs1 <- pure $ map (outputGrubbAsciiWords defGrubbOptions) rslts1
  outs2 <- pure $ map (outputGrubbAsciiWords defGrubbOptions) rslts2
  outs3 <- pure $ map (outputGrubbAsciiWords defGrubbOptions) rslts3

  outs1 `shouldEqual` outs2
  outs3 `shouldEqual` outs2

-- grubbTimer' :: _
-- grubbTimer' = runSpec [] it "blah" grubbTimer

diffMS :: Time -> Time -> Milliseconds
diffMS = diff

benchGrubb :: Benchmark
benchGrubb = mkBenchmark
  { slug  : "grubb-time-6"
  , title : "Comparing Different Grubb Parsers"
  , sizes : [5,10,20,30,40,50,60,70,80,90,100,150,200,250,300]
  , sizeInterpretation : "Words"
  , inputsPerSize : 10
  , gen : randomWords
  , functions: [ benchFn "Original Grubb" encodeFromGrubbWordsL
               , benchFn "New Grubb 1" encodeFromGrubbWordsFastL
               , benchFn "New Grubb 2" encodeFromGrubbWordsFast2L
               ]
  }

testGrubbParse1 :: Gen Result
testGrubbParse1 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsFastL out1
  out2 <- pure $ outputGrubbAsciiWords {grbUseJ : true, grbUse' : true, grbUse7 : true} prs2
  prs3 <- pure $ encodeFromGrubbWordsFastL out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)

testGrubbParse2 :: Gen Result
testGrubbParse2 = do
  wrds <- randomWords 30
  prs1 <- pure $ encodeFromGrubbWordsL wrds
  out1 <- pure $ outputGrubbAsciiWords defGrubbOptions prs1
  prs2 <- pure $ encodeFromGrubbWordsFastL out1
  out2 <- pure $ outputGrubbAsciiWords {grbUseJ : false, grbUse' : false, grbUse7 : false} prs2
  prs3 <- pure $ encodeFromGrubbWordsFastL out2
  out3 <- pure $ outputGrubbAsciiWords defGrubbOptions prs3
  pure $ withHelp (out3 == out1) $ (diffStringDisp 40 out1 out3)


{-
type GrubbOptions
  = { grbUseJ :: Boolean
    , grbUse' :: Boolean -- Keep apostrophes at start of words
    , grbUse7 :: Boolean
    }
-}




        -- wrds1 <- liftEffect $ randomSample' 50 (randomWords 150)
        -- chks1 <- pure $ map (chunkifyText 128 128) wrds1
        -- for_ chks1 $ \chks -> do
          -- rslt1 <- pure $ encodeFromGrubbWordsL $ 
          -- rslt2 <- pure $ encodeFromGrubbWordsFastL $ fromChunkified chks
          -- rslt1 `shouldEqual` rslt2