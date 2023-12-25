-- | This module contains the main Parent Components
-- | that are passed to the main function. There are
-- | two versions, one for direct text input, and one
-- | for uploaded file input. They probably should
-- | be separated into separate modules, but 

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

-- import Type.Row

import Data.Time.Duration (Milliseconds(..))

import Kwakwala.GUI.Components.InSelect  (InputSlot, _inputSelect, inputComp)
import Kwakwala.GUI.Components.OutSelect (OutputSlot, _outputSelect, outputComp)
import Kwakwala.GUI.Components.InputText 
  ( InputTextInput(..)
  , InputTextQuery(..)
  , InputTextRaise(..)
  , InputTextSlot
  , _inputText
  , inputTextComp
  )
import Kwakwala.GUI.Components.OutputText  (OutputTextQuery(..), OutputTextSlot, _outputText, outputTextComp)
import Kwakwala.GUI.Components.InputFile   (InputFileQuery(..) , InputFileSlot , InputFileRaise(..), _inputFile , inputFileComp )
import Kwakwala.GUI.Components.OutputFile  (OutputFileQuery(..), OutputFileSlot, _outputFile, outputFileComp)
import Kwakwala.GUI.Components.OrthOptions (OrthOptions(..), OrthSlot, _orthOptions, orthComp)

import Kwakwala.GUI.RecentStore (RecentStoreEff, addElementM, clearStoreM, newRecentStoreMP)

-- import Control.Applicative (when)

-- import Effect (Effect)
import Effect.Class (liftEffect) -- , class MonadEffect)
import Effect.Aff (forkAff, delay) -- , joinFiber)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Console (debug)
import Effect.Console as Console

import Kwakwala.GUI.Convert 
  ( convertOrthographyWL
  , convertOrthographyParL'
  -- , convertOrthographyParL
  , encodeByTypeParL'
  , outputByTypePar
  , CachedParse
  )
import Kwakwala.GUI.Types (AllOrthOptions, FileData, KwakInputType(..), KwakOutputType(..), defAllOrthOptions)

import Parsing.Chunking (chunkifyText, numChunks) -- , ChunkifiedString)

-- import Control.Monad.Trans.Class (lift)
import Data.Maybe (Maybe(..), isJust)
-- import Data.MediaType (MediaType)
-- import Data.MediaType.Common (textPlain)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
-- import Halogen.HTML.Core (PropName(..))
-- import Halogen.HTML.Events as HE
-- import Halogen.HTML.Properties as HP
import Halogen.Query as HQ
-- import Halogen.Query.HalogenM as HM
import Halogen.Subscription as HS
-- import Type.Proxy (Proxy(..))

import Web.File.Url (revokeObjectURL)

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
    -- , inputChunks :: Maybe ChunkifiedString
    , inputParsed :: Maybe CachedParse
    , outputText  :: String
    -- , parentListener :: Maybe (HS.Listener (ProgressUpdate ChunkifiedString String))
    -- , parentEmitter  :: Maybe (HS.Emitter  (ProgressUpdate ChunkifiedString String))
    , parentListener :: Maybe (HS.Listener (ProgressUpdate CachedParse String))
    , parentEmitter  :: Maybe (HS.Emitter  (ProgressUpdate CachedParse String))
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
  -- | ChunksReady ChunkifiedString
  | FinishedParse CachedParse
  | ClearParseCache
  | ParentAlert String
  | ParentInitialize
  | ParentFinalize

defParentState :: ParentState
defParentState = 
  { inputSelect  : InGrubb
  , outputSelect : OutGrubb
  , orthOptions : defAllOrthOptions
  -- , inputText  : ""
  -- , inputChunks : Nothing
  , inputParsed : Nothing
  , outputText  : ""
  , parentListener : Nothing
  , parentEmitter  : Nothing
  , parentSubscription : Nothing
  -- , inputFile : ""
  }

convertComp :: forall m qr op. (MonadAff m) => Boolean -> HC.Component qr ParentAction op m
convertComp hiMem
  = Hal.mkComponent
     { initialState : (\_ -> defParentState)
     , render : renderConverter
     , eval : HC.mkEval $ HC.defaultEval
       { receive = Just
       , handleAction = handleConvertAction hiMem
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
handleInputText (RaiseInput str)  = ConvertText str
handleInputText InputStringChange = ClearParseCache
handleInputText PullInput = ConvertPull

-- handleConverted :: ProgressUpdate ChunkifiedString String -> ParentAction
handleConverted :: ProgressUpdate CachedParse String -> ParentAction
handleConverted (Notice  str) = ParentAlert str
handleConverted (Payload str) = ConvertedString str
handleConverted (Partway prs) = FinishedParse prs
-- handleConverted (Partway chk) = ChunksReady chk

handleConvertAction :: forall m ops. (MonadAff m) => Boolean -> ParentAction -> Hal.HalogenM ParentState ParentAction ParentSlots ops m Unit
handleConvertAction hiMem x = case x of
  ParentInitialize -> do
    emtPair <- Hal.liftEffect HS.create
    sbsc    <- Hal.subscribe (handleConverted <$> emtPair.emitter)
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
      (Just sbs) -> Hal.unsubscribe sbs
    -}
  (ChangeOrthIn  kit) -> do
    st <- Hal.get -- s _.inputSelect
    let old = st.inputSelect
        st2 = st {inputSelect = kit }
    when (kit == InIsland && old /= InIsland) $ do
      void $ HQ.query _inputText unit (InputSetIsland unit)
    when (old == InIsland && kit /= InIsland) $ do
      void $ HQ.query _inputText unit (InputSetNonIsland unit)
    let st3 = if (kit == old) then st2 else (st2 {inputParsed = Nothing})
    when ((kit /= old) && (isJust st2.inputParsed)) $ liftEffect $ debug "Removed Cached Parse (Orthography Change)"
    Hal.put st3
    void $ HQ.query _inputText unit (InputReset unit)
  (ChangeOrthOut kot) -> do
    st <- Hal.get
    let old = st.outputSelect
        st2 = st {outputSelect = kot}
    when (kot == OutArabic && old /= OutArabic) $ do
      void $ HQ.query _outputText unit (SetOutputStyle "arabic" unit)
    when (old == OutArabic && kot /= OutArabic) $ do
      void $ HQ.query _outputText unit (SetOutputStyle "default-out" unit)
    Hal.put st2
    void $ HQ.query _inputText unit (InputReset unit)
  (ChangeOrthOpts (OrthGrubbOptions gbo)) -> do
    Hal.modify_ (\st -> st {orthOptions {grubbOrthOptions = gbo}})
  (ChangeOrthOpts (OrthIPAOptions ops)) -> do
    Hal.modify_ (\st -> st {orthOptions {ipaOrthOptions = ops}})
  -- (ChangeOrthOpts (OrthGeorgianOptions ops)) -> do
  --   Hal.modify_ (\st -> st {orthOptions {georgianOrthOptions = ops}})
  (ChangeOrthOpts (OrthArabicOptions ops)) -> do
    Hal.modify_ (\st -> st {orthOptions {arabicOrthOptions = ops}})
  (ConvertText str) -> do
    -- Removing this line to reduce memory usage.
    -- stt <- Hal.modify (\st -> st {inputText = str})
    stt <- Hal.get
    case stt.parentListener of
      Nothing      -> liftEffect $ Console.error "Parent Listener not found."
      (Just lstnr) -> case stt.inputParsed of
        (Just prsd) -> forkConverterC lstnr stt.outputSelect stt.orthOptions prsd
        Nothing     -> if hiMem 
          then forkConverterP lstnr stt.inputSelect stt.outputSelect stt.orthOptions str
          else forkConverter  lstnr stt.inputSelect stt.outputSelect stt.orthOptions str
  (ConvertedString str) -> do
    Hal.modify_ (\st -> st {outputText = str})
    void $ HQ.query _outputText unit (OutputString   str unit)
    void $ HQ.query _inputText  unit (InputSetButtonDone unit)
  -- Alternative way to convert text. Instead of
  -- being provided an action with the input `String`
  -- in it, it instead queries the Input component
  -- for its current String, and then converts that
  -- `String`. Also note that this portion was written
  -- before changing to subscriber-style code, so it
  -- performs the conversion all in this block.
  (ConvertPull) -> do
    stt  <- Hal.get
    mstr <- HQ.query _inputText unit (InputStringQ (\z -> z))
    str <- case mstr of
      Nothing  -> pure ""
      (Just s) -> pure s
    newStr <- pure $ convertOrthographyWL stt.inputSelect stt.outputSelect stt.orthOptions str
    
    Hal.modify_ (\st -> st {outputText = newStr})
    void $ HQ.query _outputText unit (OutputString newStr unit)
    void $ HQ.query _inputText  unit (InputSetButtonDone  unit)
  -- (ChunksReady chk) -> Hal.modify_ $ \st -> st {inputChunks = Just chk}
  (ParentAlert str) -> liftEffect $ debug str
  (FinishedParse prs) -> Hal.modify_ $ \st -> st {inputParsed = Just prs}
  ClearParseCache -> do 
    st <- Hal.get
    when (isJust st.inputParsed) $ liftEffect $ debug "Removed Cached Parse (Input Change)"
    Hal.put $ st {inputParsed = Nothing}
    

-- type Node r p i = Array (IProp r i) -> Array (HTML p i) -> HTML p i

-- form :: forall i p. Node HTMLform p i
-- form :: forall i p Array (IProp HTMLform i) -> Array (HTML p i) -> HTML p i

--------------------------------
-- Joint Operations

-- | A type meant for Subscriptions to be
-- | able to send feedback partway through
-- | execution.
data ProgressUpdate b a
  = Notice  String
  | Partway b
  | Payload a

-- If I keep the type general enough, I may be able to
-- reuse this function for both Text input and File input.
-- This version doesn't supply the ChunkifiedString to the user.
forkConverter :: forall m pstate acts slots ops pw. MonadAff m => HS.Listener (ProgressUpdate pw String) -> KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> Hal.HalogenM pstate acts slots ops m Unit
-- forkConverter lstnr kin kout oops str = void $ Hal.fork $ do
forkConverter lstnr kin kout oops str = liftAff $ void $ forkAff $ do
  liftEffect $ debug "Feeding the converter..."
  -- Need to insert a slight delay for the other
  -- parts of the javascript to fire first. Otherwise,
  -- the HTML won't be updated first.
  delay $ Milliseconds 30.0
  
  chks <- pure $ chunkifyText 1024 512 str

  liftEffect $ debug $ "String Chunkified: " <> (show (numChunks chks)) <> " chunks."
  liftEffect $ HS.notify lstnr (Notice "String Chunkified.")

  newStr <- convertOrthographyParL' kin kout oops chks
  liftEffect $ debug "Finished conversion..."
  liftEffect $ HS.notify lstnr (Payload newStr)

-- This version *does* send the chunkified string
-- back to the component.
{-
forkConverterX :: forall m pstate acts slots ops. MonadAff m => HS.Listener (ProgressUpdate ChunkifiedString String) -> KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> Hal.HalogenM pstate acts slots ops m Unit
-- forkConverter lstnr kin kout oops str = void $ Hal.fork $ do
forkConverterX lstnr kin kout oops str = liftAff $ void $ forkAff $ do
  liftEffect $ debug "Feeding the converter..."
  -- Need to insert a slight delay for the other
  -- parts of the javascript to fire first. Otherwise,
  -- the HTML won't be updated first.
  delay $ Milliseconds 30.0

  chks <- pure $ chunkifyText 1024 512 str

  liftEffect $ debug $ "String Chunkified: " <> (show (numChunks chks)) <> " chunks."
  liftEffect $ HS.notify lstnr (Notice "String Chunkified.")
  liftEffect $ HS.notify lstnr (Partway chks)

  newStr <- convertOrthographyParL' kin kout oops chks
  liftEffect $ debug "Finished conversion..."
  liftEffect $ HS.notify lstnr (Payload newStr)
-}

forkConverterP :: forall m pstate acts slots ops. MonadAff m => HS.Listener (ProgressUpdate CachedParse String) -> KwakInputType -> KwakOutputType -> AllOrthOptions -> String -> Hal.HalogenM pstate acts slots ops m Unit
-- forkConverter lstnr kin kout oops str = void $ Hal.fork $ do
forkConverterP lstnr kin kout oops str = liftAff $ void $ forkAff $ do
  liftEffect $ debug "Feeding the converter..."
  -- Need to insert a slight delay for the other
  -- parts of the javascript to fire first. Otherwise,
  -- the HTML won't be updated first.
  delay $ Milliseconds 30.0
  
  chks <- pure $ chunkifyText 1024 512 str

  liftEffect $ debug $ "String Chunkified: " <> (show (numChunks chks)) <> " chunks."
  liftEffect $ HS.notify lstnr (Notice "String Chunkified.")
  
  prsdStr <- encodeByTypeParL' kin chks 
  liftEffect $ HS.notify lstnr (Notice "String Parsed!")
  liftEffect $ HS.notify lstnr (Partway prsdStr)

  -- newStr <- convertOrthographyParL' kin kout oops chks
  newStr <- outputByTypePar kout oops prsdStr
  liftEffect $ debug "Finished conversion..."
  liftEffect $ HS.notify lstnr (Payload newStr)

-- This version uses the cached Parsed String.
forkConverterC :: forall m pstate acts slots ops. MonadAff m => HS.Listener (ProgressUpdate CachedParse String) -> KwakOutputType -> AllOrthOptions -> CachedParse -> Hal.HalogenM pstate acts slots ops m Unit
-- forkConverter lstnr kin kout oops str = void $ Hal.fork $ do
forkConverterC lstnr kout oops prs = liftAff $ void $ forkAff $ do
  liftEffect $ debug "Using Cached Parse..."
  -- Need to insert a slight delay for the other
  -- parts of the javascript to fire first. Otherwise,
  -- the HTML won't be updated first.
  delay $ Milliseconds 10.0
  
  -- chks <- pure $ chunkifyText 1024 512 str

  -- liftEffect $ debug $ "String Chunkified: " <> (show (numChunks chks)) <> " chunks."
  -- liftEffect $ HS.notify lstnr (Notice "String Chunkified.")
  
  -- prsdStr <- encodeByTypeParL' kin chks 
  liftEffect $ HS.notify lstnr (Notice "Outputting String...")

  -- newStr <- convertOrthographyParL' kin kout oops chks
  newStr <- outputByTypePar kout oops prs
  liftEffect $ debug "Finished conversion..."
  liftEffect $ HS.notify lstnr (Payload newStr)

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
    , inputFile   :: FileData
    -- , inputChunks :: Maybe ChunkifiedString
    -- , outputText :: String
    -- , parentListener :: Maybe (HS.Listener (ProgressUpdate ChunkifiedString String))
    -- , parentEmitter  :: Maybe (HS.Emitter  (ProgressUpdate ChunkifiedString String))
    , inputParsed :: Maybe CachedParse
    , parentListener :: Maybe (HS.Listener (ProgressUpdate CachedParse String))
    , parentEmitter  :: Maybe (HS.Emitter  (ProgressUpdate CachedParse String))
    , parentSubscription :: Maybe (Hal.SubscriptionId)
    , parentUrlStore :: RecentStoreEff String
    }

defParentState2 :: ParentState2
defParentState2 = 
  { inputSelect  : InGrubb
  , outputSelect : OutGrubb
  , orthOptions  : defAllOrthOptions
  , inputFile  : { fileStr : "", fileTyp : Nothing}
  , inputParsed : Nothing
  -- , inputChunks : Nothing
  -- , outputText : "" -- Unnecessary duplication of state.
  , parentListener : Nothing
  , parentEmitter : Nothing
  , parentSubscription : Nothing
  , parentUrlStore : newRecentStoreMP 5 revokeObjectURL
  }

-- | The Action type used by the
-- | File Output `Component`.
data ParentAction2
  = ChangeOrthIn2    KwakInputType
  | ChangeOrthOut2   KwakOutputType
  | ChangeOrthOpts2  OrthOptions
  | ConvertTextNew2  FileData
  | ConvertText2     FileData
  | ConvertedString2 String
  -- | ChunksReady2 ChunkifiedString
  | FinishedParse2 CachedParse
  | ClearParseCache2
  | ParentAlert2 String
  | ParentInitialize2
  | ParentFinalize2

-- | The main `Component` for file output.
convertComp2 :: forall m qr slt. (MonadAff m) => Boolean -> HC.Component qr ParentAction2 slt m
convertComp2 hiMem
  = Hal.mkComponent
     { initialState : (\_ -> defParentState2)
     , render : renderConverter2
     , eval : HC.mkEval $ HC.defaultEval
       { receive = Just
       , handleAction = handleConvertAction2 hiMem
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
    , Html.p_ [Html.slot  _inputFile unit inputFileComp st.inputFile.fileStr handleFileInput]
    -- , Html.p_ [Html.text "Output Text"]
    , Html.p_ [Html.slot_ _outputText unit outputTextComp ""] -- st.outputText]
    , Html.p_ [Html.slot_ _outputFile unit outputFileComp {fileStr : "" , fileTyp : st.inputFile.fileTyp} ]
    -- , Html.p_ [Html.slot_ _outputFile unit outputFileComp {fileStr : st.outputText , fileTyp : st.inputFile.fileTyp} ]
    ]

handleFileInput :: InputFileRaise -> ParentAction2
handleFileInput (NewFileInput ftyp) = ConvertTextNew2 ftyp
handleFileInput (OldFileInput ftyp) = ConvertText2    ftyp

handleConvertAction2 :: forall m outp. (MonadAff m) => Boolean -> ParentAction2 -> Hal.HalogenM ParentState2 ParentAction2 ParentSlots2 outp m Unit
handleConvertAction2 hiMem x = case x of
  -- Change orthography input, with special
  -- handling of Island input.
  (ChangeOrthIn2  kit) -> do
    st <- Hal.get -- s _.inputSelect
    let old = st.inputSelect
        st2 = st {inputSelect = kit }
    when (kit == InIsland && old /= InIsland) $ do
      void $ HQ.query _inputFile unit (InputFileIsland unit)
    when (old == InIsland && kit /= InIsland) $ do
      void $ HQ.query _inputFile unit (InputFileNonIsland unit)

    -- let st3 = if (kit == old) then st2 else (st2 {inputParsed = Nothing})
    -- Hal.put st3
    Hal.put $ if (kit == old) then st2 else (st2 {inputParsed = Nothing})

    void $ HQ.query _inputFile unit (InputFileButtonReset unit)
  -- Change output orthography. Also changes
  -- "convert" button style.
  (ChangeOrthOut2 kot) -> do
    Hal.modify_ (\st -> st {outputSelect = kot})
    void $ HQ.query _inputFile unit (InputFileButtonReset unit)
  -- Change specific orthography settings.
  (ChangeOrthOpts2 (OrthGrubbOptions gbo)) -> do
    Hal.modify_ (\st -> st {orthOptions {grubbOrthOptions = gbo}})
  (ChangeOrthOpts2 (OrthIPAOptions ops)) -> do
    Hal.modify_ (\st -> st {orthOptions {ipaOrthOptions = ops}})
  (ChangeOrthOpts2 (OrthArabicOptions ops)) -> do
    Hal.modify_ (\st -> st {orthOptions {arabicOrthOptions = ops}})
  -- Receive text that is to be converted, and
  -- then send it off to be converted. Also
  -- changes the style of the "Convert" button.
  (ConvertText2 fdt) -> do
    stt <- Hal.modify (\st -> st {inputFile = fdt})

    case stt.parentListener of
      Nothing      -> liftEffect $ Console.error "Parent Listener not found."
      (Just lstnr) -> case stt.inputParsed of
        (Just prsd) -> forkConverterC lstnr stt.outputSelect stt.orthOptions prsd
        Nothing     -> if hiMem 
          then forkConverterP lstnr stt.inputSelect stt.outputSelect stt.orthOptions fdt.fileStr
          else forkConverter  lstnr stt.inputSelect stt.outputSelect stt.orthOptions fdt.fileStr
  (ConvertTextNew2 fdt) -> do
    stt <- Hal.modify (\st -> st {inputFile = fdt})
    case stt.parentListener of
      Nothing      -> liftEffect $ Console.error "Parent Listener not found."
      (Just lstnr) -> forkConverterP lstnr stt.inputSelect stt.outputSelect stt.orthOptions fdt.fileStr
  -- Receive the converted text, and then give
  -- it to the child output component to display
  -- it. Also send the file data to the download
  -- button.
  (ConvertedString2 str) -> do
    -- Maybe change to just get the current state?
    -- stt <- Hal.modify (\st -> st {outputText = str})
    stt <- Hal.get
    void $  HQ.query _outputText unit (OutputString    str unit)
    void $  HQ.query _inputFile  unit (InputFileButtonDone unit)
    murl <- HQ.query _outputFile unit (ReceiveFileData (stt.inputFile {fileStr = str}) (\z -> z))
    
    -- Add the new url to the url store.
    case murl of
      Nothing    -> pure unit
      (Just url) -> do
        nstore <- liftEffect $ addElementM url stt.parentUrlStore
        Hal.modify_ $ \st -> st { parentUrlStore = nstore }

  -- (ChunksReady2 chks) -> Hal.modify_ $ \st -> st {inputChunks = Just chks}
  (ParentAlert2 alrt) -> liftEffect $ debug alrt

  (FinishedParse2 prs) -> do
    st <- Hal.get
    liftEffect $ debug "Sending Parsed Output to Cache."
    Hal.put (st {inputParsed = (Just prs)})
  ClearParseCache2 -> Hal.modify_ $ \st -> st {inputParsed = Nothing}

  -- Initialize the component. It does this by
  -- creating the listener/emitter pair and
  -- storing them in the component's state.
  ParentInitialize2 -> do
    emtPair <- Hal.liftEffect HS.create
    sbsc    <- Hal.subscribe (handleConverted2 <$> emtPair.emitter)
    Hal.modify_ $ \st -> st 
      { parentListener = Just emtPair.listener 
      , parentEmitter  = Just emtPair.emitter
      , parentSubscription = Just sbsc
      }
  ParentFinalize2 -> do
    -- This is probably unnecessary.
    rs <- Hal.gets _.parentUrlStore
    void $ liftEffect $ clearStoreM rs
  -- Fallback
  -- _ -> pure unit

-- handleConverted2 :: ProgressUpdate ChunkifiedString String -> ParentAction2
handleConverted2 :: ProgressUpdate CachedParse String -> ParentAction2
handleConverted2 (Notice  str) = ParentAlert2 str
handleConverted2 (Payload str) = ConvertedString2 str
handleConverted2 (Partway prs) = FinishedParse2 prs
-- handleConverted2 (Partway chk) = ChunksReady2 chk

