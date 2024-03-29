module Test.Main where

import Prelude

import Control.Parallel (class Parallel, parTraverse, parTraverse_)
import Data.Foldable (fold)
import Data.Traversable (for, for_)
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Effect.Aff (launchAff_, delay)
import Effect.Aff.Class 
import Kwakwala.Parsing.Grubb
import Kwakwala.Parsing.Parallel
import Parsing.Chunking
import Test.Spec (pending, describe, it)
import Test.Spec as Spec
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Config (defaultConfig)
import Test.Spec.QuickCheck (quickCheck)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (runSpec, runSpecT)
import Test.Chunking
import Test.Chunking.Parsing
import Test.Parsing.Arabic
import Test.Parsing.Napa
import Test.Parsing.Umista
import Test.QuickCheck.Gen
import Test.Words


main :: Effect Unit
main = launchAff_ $ runSpec [consoleReporter] $ do
  describe "Chunkifying Tests" do
    describe "Simple Test(s)" do
      it "concat (chunkify str) == str" do
        quickCheck (testChunkingGen 300)
    describe "Comparing Parses" do
      it "encode str == encodeInChunks str" do
        quickCheck testGrubbChunk1
      it "Parallel encoding Works as expected" do
        wrds1 <- liftEffect $ randomSample' 50 (randomWords 150)
        chks1 <- pure $ map (chunkifyText 128 128) wrds1
        for_ chks1 $ \chks -> do
          rslt1 <- pure $ encodeFromGrubbWordsL $ fromChunkified chks
          rslt2 <- fold <$> encodeFromGrubbWordsParL' chks
          rslt1 `shouldEqual` rslt2
  describe "Parsing Tests" do
    describe "Arabic Tests" do
      it "Grubb -> Arabic -> Grubb (Default)" do
        quickCheck testArabicParse1
      it "Grubb -> Arabic -> Grubb (Uncombined Hamzahs)" do
        quickCheck testArabicParse2
      it "Grubb -> Arabic -> Grubb (Alternative 2)" do
        quickCheck testArabicParse3
      it "Grubb -> Arabic -> Grubb (Alternative 3)" do
        quickCheck testArabicParse4
    describe "NAPA Tests" do
      it "Grubb -> NAPA -> Grubb" do
        quickCheck testNapaParse1
      it "Grubb -> NAPA -> Grubb 2" do
        quickCheck testNapaParse2
      it "Grubb -> NAPA -> NAPA (Idempotence)" do
        quickCheck testNapaParse3
    describe "Umista Tests" do
      it "Grubb -> Umista -> Grubb" do
        quickCheck testUmistaParse1
      it "Grubb -> Umista -> Grubb 2" do
        quickCheck testUmistaParse2
      it "Grubb -> Umista -> Umista (Idempotence)" do
        quickCheck testUmistaParse3

{-
main :: Effect Unit
main = do
  log "🍕"
  log "You should add some tests."
-}

-- parFor_ :: forall f m t a b. Parallel f m => Applicative f => Traversable t => t a -> (a -> m b) -> m (t b)
-- parFor_ t act = parTraverse_ act t

