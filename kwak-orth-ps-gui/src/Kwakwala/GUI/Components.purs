module Kwakwala.GUI.Components
  ( convertComp
  , ParentAction(..)
  
  , convertComp2
  , ParentAction2(..)

  -- , OrthInQuery
  -- , OrthOutQuery
  -- * Components in Slots
  -- , childGrubbComp
  -- , GrubbQuery
  )
  where


import Prelude
import Kwakwala.GUI.Types
import Type.Row

import Data.Time.Duration (Milliseconds(..))

import Kwakwala.GUI.Components.InSelect
import Kwakwala.GUI.Components.OutSelect
import Kwakwala.GUI.Components.GrubbOptions
import Kwakwala.GUI.Components.InputText
import Kwakwala.GUI.Components.OutputText
import Kwakwala.GUI.Components.InputFile
import Kwakwala.GUI.Components.OutputFile
import Kwakwala.GUI.Components.OrthOptions

import Control.Applicative (when)

import Effect (Effect)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Aff (forkAff, joinFiber, delay)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Console (debug)
import Effect.Console as Console

import Kwakwala.GUI.Convert
import Kwakwala.GUI.Types (FileData, AllOrthOptions, defAllOrthOptions)

import Control.Monad.State.Class (class MonadState, get)
import Control.Monad.Trans.Class (lift)
import Data.Maybe (Maybe(..))
import Data.MediaType (MediaType)
import Data.MediaType.Common (textPlain)
import Effect.Aff (joinFiber, forkAff)
import Effect.Aff.Class (class MonadAff, liftAff)
import Halogen (ComponentHTML)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Core (PropName(..))
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Query as HQ
import Halogen.Query.HalogenM as HM
import Halogen.Subscription as HS
import Kwakwala.Output.Grubb (GrubbOptions(..), GrubbOptions, defGrubbOptions)
import Type.Proxy (Proxy(..))

--------------------------------
-- Parent Component (Text)

type ParentSlots
  = ( inputSelect  :: InputSlot  Unit
    , outputSelect :: OutputSlot Unit
    , orthOptions  :: OrthSlot   Unit
    , inputText    :: InputTextSlot  Unit
    , outputText   :: OutputTextSlot Unit
    ) 

type ParentStateX r
  = { inputSelect  :: KwakInputType
    , outputSelect :: KwakOutputType
    , orthOptions  :: AllOrthOptions
    , inputText  :: String
    , outputText :: String
    -- , inputFile :: String
    | r
    }

type ParentState
  = { inputSelect  :: KwakInputType
    , outputSelect :: KwakOutputType
    , orthOptions  :: AllOrthOptions
    -- , inputText  :: String
    , outputText :: String
    , parentListener :: Maybe (HS.Listener String)
    , parentEmitter  :: Maybe (HS.Emitter  String)
    , parentSubscription :: Maybe (Hal.SubscriptionId)
    -- , inputFile :: String
    }

data ParentAction
  = ChangeOrthIn   KwakInputType
  | ChangeOrthOut  KwakOutputType
  | ChangeOrthOpts OrthOptions
  | ConvertText    String
  | ConvertPull
  | ConvertedString String
  | ParentInitialize
  | ParentFinalize

defParentState :: ParentState
defParentState = 
  { inputSelect  : InGrubb
  , outputSelect : OutGrubb
  , orthOptions : defAllOrthOptions
  -- , inputText  : ""
  , outputText : ""
  , parentListener : Nothing
  , parentEmitter  : Nothing
  , parentSubscription : Nothing
  -- , inputFile : ""
  }

convertComp :: forall m. (MonadAff m) => HC.Component _ ParentAction _ m
convertComp 
  = Hal.mkComponent
     { initialState : (\_ -> defParentState)
     , render : renderConverter
     , eval : HC.mkEval $ HC.defaultEval
       { receive = Just
       , handleAction = handleConvertAction
       , initialize = Just ParentInitialize
       , finalize   = Just ParentFinalize
       }
     }

renderConverter :: forall m. MonadAff m => ParentState -> Hal.ComponentHTML ParentAction ParentSlots m
renderConverter st
  = Html.div_
    [ Html.h1_ [Html.text "Kwak'wala Orthography Conversion (Text)"]
    , Html.p_ [Html.slot  _orthOptions  unit orthComp  unit ChangeOrthOpts]
    , Html.p_ [Html.text "Input Orthography"]
    , Html.p_ [Html.slot  _inputSelect  unit inputComp  st.inputSelect  ChangeOrthIn]
    , Html.p_ [Html.text "Output Orthography"]
    , Html.p_ [Html.slot  _outputSelect unit outputComp st.outputSelect ChangeOrthOut]
    -- , Html.p_ [Html.text "Input Text"]
    , Html.p_ [Html.slot  _inputText    unit inputTextComp  (SetInString "") handleInputText]
    -- , Html.p_ [Html.text "Output Text"]
    , Html.p_ [Html.slot_ _outputText   unit outputTextComp st.outputText]
    -- , Html.p_ [Html.text "Test"]
    -- , Html.p_ [Html.slot_ _inputFile unit inputFileComp st.inputFile]
    ]

handleInputText :: InputTextRaise -> ParentAction
handleInputText (RaiseInput str) = ConvertText str
handleInputText PullInput = ConvertPull

handleConvertAction :: forall m. (MonadAff m) => ParentAction -> Hal.HalogenM ParentState ParentAction ParentSlots _ m Unit
handleConvertAction x = case x of
  ParentInitialize -> do
    emtPair <- Hal.liftEffect HS.create
    sbsc    <- Hal.subscribe (ConvertedString <$> emtPair.emitter)
      -- Console.debug "Hello?"
      -- pure $ ConvertedString str
    Hal.modify_ $ \st -> st 
      { parentListener = Just emtPair.listener 
      , parentEmitter  = Just emtPair.emitter
      , parentSubscription = Just sbsc
      }
  ParentFinalize -> do
    pure unit
    -- Subscriptions auto end when finalized.
    {-
    msbs <- Hal.gets _.parentEmitter
    case msbs of
      Nothing -> pure unit
      (Just sbs) -> HS.unsubscribe sbs
    -}
  (ChangeOrthIn  kit) -> do
    old <- Hal.gets _.inputSelect
    Hal.modify_ (\st -> st {inputSelect  = kit })
    when (kit == InIsland && old /= InIsland) $ do
      void $ HQ.query _inputText unit (InputSetIsland unit)
    when (old == InIsland && kit /= InIsland) $ do
      void $ HQ.query _inputText unit (InputSetNonIsland unit)
    void $ HQ.query _inputText unit (InputReset unit)
  (ChangeOrthOut kot) -> do
    Hal.modify_ (\st -> st {outputSelect = kot})
    void $ HQ.query _inputText unit (InputReset unit)
  (ChangeOrthOpts (OrthGrubbOptions gbo)) -> do
    Hal.modify_ (\st -> st {orthOptions {grubbOrthOptions = gbo}})
  (ChangeOrthOpts (OrthIPAOptions ops)) -> do
    Hal.modify_ (\st -> st {orthOptions {ipaOrthOptions = ops}})
  -- (ChangeOrthOpts (OrthGeorgianOptions ops)) -> do
  --   Hal.modify_ (\st -> st {orthOptions {georgianOrthOptions = ops}})
  (ConvertText str) -> do
    -- Removing this portion to reduce memory usage.
    -- stt <- Hal.modify (\st -> st {inputText = str})
    stt <- Hal.get
    case stt.parentListener of
      Nothing      -> liftEffect $ Console.error "Parent Listener not found."
      (Just lstnr) -> forkConverter lstnr stt.inputSelect stt.outputSelect stt.orthOptions str
  (ConvertedString str) -> do
    Hal.modify_ (\st -> st {outputText = str})
    void $ HQ.query _outputText unit (OutputString   str unit)
    void $ HQ.query _inputText  unit (InputSetButtonDone unit)
  (ConvertPull) -> do
    stt  <- Hal.get
    mstr <- HQ.query _inputText unit (InputStringQ (\x -> x))
    {-
    fib  <- forkAff $ liftAff $ do
      case mstr of
        Nothing    -> pure Nothing
        (Just str) -> pure $ Just $ convertOrthography stt.inputSelect stt.outputSelect stt.orthOptions str
    -}
    str <- case mstr of
      Nothing  -> pure ""
      (Just s) -> pure s

    -- newStr <- pure $ convertOrthography stt.inputSelect stt.outputSelect stt.orthOptions str
    newStr <- pure $ convertOrthographyWL  stt.inputSelect stt.outputSelect stt.orthOptions str
    
    
    Hal.modify_ (\st -> st {outputText = newStr}) -- , inputText = str})
    void $ HQ.query _outputText unit (OutputString newStr unit)
    void $ HQ.query _inputText  unit (InputSetButtonDone  unit)

-- type Node r p i = Array (IProp r i) -> Array (HTML p i) -> HTML p i

-- form :: forall i p. Node HTMLform p i
-- form :: forall i p Array (IProp HTMLform i) -> Array (HTML p i) -> HTML p i

-- If I keep the type general enough, I may be able to
-- reuse this function for both Text input and File input.
forkConverter :: forall m pstate. MonadAff m => HS.Listener String -> KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> Hal.HalogenM pstate _ _ _ m Unit
-- forkConverter lstnr kin kout oops str = void $ Hal.fork $ do
forkConverter lstnr kin kout oops str = liftAff $ void $ forkAff $ do
  liftEffect $ debug "Feeding the converter..."
  -- Need to insert a slight delay for the other
  -- parts of the javascript to fire first. Otherwise,
  -- the HTML won't be updated first.
  delay $ Milliseconds 2.0
  newStr <- convertOrthographyParL kin kout oops str
  liftEffect $ debug "Finished conversion..."
  liftEffect $ HS.notify lstnr newStr

--------------------------------
-- Parent Component (File)

type ParentSlots2
  = ( inputSelect  :: InputSlot  Unit
    , outputSelect :: OutputSlot Unit
    , orthOptions  :: OrthSlot   Unit
    , inputFile    :: InputFileSlot  Unit
    , outputText   :: OutputTextSlot Unit
    , outputFile   :: OutputFileSlot Unit
    )

type ParentState2X r
  = { inputSelect  :: KwakInputType
    , outputSelect :: KwakOutputType
    , orthOptions  :: AllOrthOptions
    , inputFile  :: String
    , outputText :: String
    | r
    }

type ParentState2
  = { inputSelect  :: KwakInputType
    , outputSelect :: KwakOutputType
    , orthOptions  :: AllOrthOptions
    , inputFile  :: FileData
    , outputText :: String
    , parentListener :: Maybe (HS.Listener String)
    , parentEmitter  :: Maybe (HS.Emitter  String)
    , parentSubscription :: Maybe (Hal.SubscriptionId)
    }

defParentState2 :: ParentState2
defParentState2 = 
  { inputSelect  : InGrubb
  , outputSelect : OutGrubb
  , orthOptions  : defAllOrthOptions
  , inputFile  : { fileStr : "", fileTyp : Nothing}
  , outputText : ""
  , parentListener : Nothing
  , parentEmitter : Nothing
  , parentSubscription : Nothing
  }

data ParentAction2
  = ChangeOrthIn2   KwakInputType
  | ChangeOrthOut2  KwakOutputType
  | ChangeOrthOpts2 OrthOptions
  | ConvertText2    FileData
  | ConvertedString2 String
  | ParentInitialize2
  | ParentFinalize2

convertComp2 :: forall m. (MonadAff m) => HC.Component _ ParentAction2 _ m
convertComp2 
  = Hal.mkComponent
     { initialState : (\_ -> defParentState2)
     , render : renderConverter2
     , eval : HC.mkEval $ HC.defaultEval
       { receive = Just
       , handleAction = handleConvertAction2
       , initialize = Just ParentInitialize2
       , finalize   = Just ParentFinalize2
       }
     }

renderConverter2 :: forall m. MonadAff m => ParentState2 -> Hal.ComponentHTML ParentAction2 ParentSlots2 m
renderConverter2 st
  = Html.div_
    [ Html.h1_ [Html.text "Kwak'wala Orthography Conversion (File)"]
    , Html.p_ [Html.slot  _orthOptions  unit orthComp  unit ChangeOrthOpts2]
    , Html.p_ [Html.text "Input Orthography"]
    , Html.p_ [Html.slot  _inputSelect  unit inputComp  st.inputSelect  ChangeOrthIn2]
    , Html.p_ [Html.text "Output Orthography"]
    , Html.p_ [Html.slot  _outputSelect unit outputComp st.outputSelect ChangeOrthOut2]
    -- , Html.p_ [Html.text "Input File"]
    , Html.p_ [Html.slot  _inputFile unit inputFileComp st.inputFile.fileStr ConvertText2]
    -- , Html.p_ [Html.text "Output Text"]
    , Html.p_ [Html.slot_ _outputText unit outputTextComp st.outputText]
    , Html.p_ [Html.slot_ _outputFile unit outputFileComp {fileStr : st.outputText , fileTyp : st.inputFile.fileTyp} ]
    ]

handleConvertAction2 :: forall m outp. (MonadAff m) => ParentAction2 -> Hal.HalogenM ParentState2 ParentAction2 ParentSlots2 outp m Unit
handleConvertAction2 x = case x of
  (ChangeOrthIn2  kit) -> do
    old <- Hal.gets _.inputSelect
    Hal.modify_ (\st -> st {inputSelect  = kit })
    when (kit == InIsland && old /= InIsland) $ do
      void $ HQ.query _inputFile unit (InputFileIsland unit)
    when (old == InIsland && kit /= InIsland) $ do
      void $ HQ.query _inputFile unit (InputFileNonIsland unit)
    void $ HQ.query _inputFile unit (InputFileButtonReset unit)
  (ChangeOrthOut2 kot) -> do
    Hal.modify_ (\st -> st {outputSelect = kot})
    void $ HQ.query _inputFile unit (InputFileButtonReset unit)
  (ChangeOrthOpts2 (OrthGrubbOptions gbo)) -> do
    Hal.modify_ (\st -> st {orthOptions {grubbOrthOptions = gbo}})
  (ChangeOrthOpts2 (OrthIPAOptions ops)) -> do
    Hal.modify_ (\st -> st {orthOptions {ipaOrthOptions = ops}})
  -- (ChangeOrthOpts2 (OrthGeorgianOptions ops)) -> do
  --   Hal.modify_ (\st -> st {orthOptions {georgianOrthOptions = ops}})
  (ConvertText2 fdt) -> do
    stt <- Hal.modify (\st -> st {inputFile = fdt})
    -- stt.inputSelect
    -- stt.outputSelect
    -- stt.grubbOptions
    
    
    -- newStr <- pure $ convertOrthography stt.inputSelect stt.outputSelect stt.orthOptions fdt.fileStr
    -- void $ HQ.query _outputText unit (OutputString newStr unit)
    -- void $ HQ.query _outputFile unit (ReceiveFileData (fdt {fileStr = newStr}) unit)

    case stt.parentListener of
      Nothing      -> liftEffect $ Console.error "Parent Listener not found."
      (Just lstnr) -> forkConverter lstnr stt.inputSelect stt.outputSelect stt.orthOptions fdt.fileStr


    -- Hal.modify_ (\st -> st {outputText = newStr})
    
  ParentInitialize2 -> do
    emtPair <- Hal.liftEffect HS.create
    sbsc    <- Hal.subscribe (ConvertedString2 <$> emtPair.emitter)
      -- Console.debug "Hello?"
      -- pure $ ConvertedString str
    Hal.modify_ $ \st -> st 
      { parentListener = Just emtPair.listener 
      , parentEmitter  = Just emtPair.emitter
      , parentSubscription = Just sbsc
      }
  ParentFinalize2 -> do
    pure unit
  (ConvertedString2 str) -> do
    Hal.modify_ (\st -> st {outputText = str})
    void $ HQ.query _outputText unit (OutputString   str unit)
    void $ HQ.query _inputFile  unit (InputFileButtonDone unit)
  -- Fallback
  -- _ -> pure unit

