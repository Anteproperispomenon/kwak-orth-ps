module Kwakwala.GUI.Components
  ( inputComp
  , outputComp
  , grubbComp
  , convertComp

  , OrthInQuery
  , OrthOutQuery
  , ParentAction(..)
  -- * Components in Slots
  -- , childGrubbComp
  , GrubbQuery
  )
  where

import Kwakwala.GUI.Types
import Prelude
import Type.Row

import Effect (Effect)
import Effect.Class (class MonadEffect, liftEffect)

import Kwakwala.GUI.Convert

import Control.Monad.State.Class (class MonadState, get)
import Control.Monad.Trans.Class (lift)
import Data.Maybe (Maybe(..))
import Halogen (ComponentHTML)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Core (PropName(..))
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Query as HQ
import Halogen.Query.HalogenM as HM
import Kwakwala.Output.Grubb (GrubbOptions(..), GrubbOptions, defGrubbOptions)
import Type.Proxy (Proxy(..))

-- Explanations:
-- 
-- The monad for child and parent components must be
-- the same, therefore the constraints on all child
-- components must be unifiable. i.e. we can't have
-- one child component that uses a Monad with constraint
-- (MonadState KwakInputType m) and another with
-- constraint (MonadState KwakOutputType m). Those two
-- would not be unifiable. However, if we lift these
-- states into an extensible row/record type, we CAN
-- unify the two; unifying
--
-- >>> {inputSelect :: KwakInputType | r}
--
-- and
--
-- >>> {outputSelect :: KwakOutputType | r}
--
-- yields
--
-- >>> {inputSelect :: KwakInputType, outputSelect :: KwakOutputType | r}
--
-- Which is exactly what we would want the parent
-- component's state to be.
--
-- Note that we don't have to unify the internal states
-- of the child components; those are handled when
-- connecting them to the parents.

--------------------------------
-- Parent Component

type ParentSlots
  = ( inputSelect  :: InputSlot  Unit
    , outputSelect :: OutputSlot Unit
    , grubbOptions :: GrubbSlot  Unit
    , inputText    :: InputTextSlot  Unit
    , outputText   :: OutputTextSlot Unit
    ) 

type ParentStateX r
  = { inputSelect  :: KwakInputType
    , outputSelect :: KwakOutputType
    , grubbOptions :: GrubbOptions
    , inputText  :: String
    , outputText :: String
    | r
    }

type ParentState
  = { inputSelect  :: KwakInputType
    , outputSelect :: KwakOutputType
    , grubbOptions :: GrubbOptions
    , inputText  :: String
    , outputText :: String
    }

data ParentAction
  = ChangeOrthIn  KwakInputType
  | ChangeOrthOut KwakOutputType
  | ChangeGrubb   GrubbOptions
  | ConvertText   String

defParentState :: ParentState
defParentState = 
  { inputSelect  : InGrubb
  , outputSelect : OutGrubb
  , grubbOptions : defGrubbOptions
  , inputText  : ""
  , outputText : ""
  }

-- convertComp :: forall m r. (MonadState (ParentStateX r) m) => HC.Component _ _ _ m
convertComp :: forall m. (MonadEffect m) => HC.Component _ _ _ m
convertComp 
  = Hal.mkComponent
     { initialState : (\_ -> defParentState)
     , render : renderConverter
     , eval : HC.mkEval $ HC.defaultEval
       { receive = Just
       , handleAction = handleConvertAction
       }
     }

renderConverter :: forall m. MonadEffect m => ParentState -> Hal.ComponentHTML ParentAction ParentSlots m
renderConverter st
  = Html.div_
    [ Html.p_ [Html.text "Individual Orthograph Options"]
    , Html.p_ [Html.slot  _grubbOptions unit grubbComp  st.grubbOptions ChangeGrubb]
    , Html.p_ [Html.text "Input Orthography"]
    , Html.p_ [Html.slot  _inputSelect  unit inputComp  st.inputSelect  ChangeOrthIn]
    , Html.p_ [Html.text "Output Orthography"]
    , Html.p_ [Html.slot  _outputSelect unit outputComp st.outputSelect ChangeOrthOut]
    , Html.p_ [Html.text "Input Text"]
    , Html.p_ [Html.slot  _inputText    unit inputTextComp  st.inputText ConvertText]
    , Html.p_ [Html.text "Output Text"]
    , Html.p_ [Html.slot_ _outputText   unit outputTextComp st.outputText]
    ]

-- handleConvertAction :: _
handleConvertAction x = case x of
  (ChangeOrthIn  kit) -> do
    Hal.modify_ (\st -> st {inputSelect  = kit })
  (ChangeOrthOut kot) -> do
    Hal.modify_ (\st -> st {outputSelect = kot})
  (ChangeGrubb gbo) -> do
    Hal.modify_ (\st -> st {grubbOptions = gbo})
  (ConvertText str) -> do
    stt <- Hal.modify (\st -> st {inputText = str})
    -- stt.inputSelect
    -- stt.outputSelect
    -- stt.grubbOptions
    newStr <- pure $ convertOrthography stt.inputSelect stt.outputSelect stt.grubbOptions str
    void $ HQ.query _outputText unit (OutputString newStr unit)
    Hal.modify_ (\st -> st {outputText = newStr})



--------------------------------
-- Re-usable Functions

-- handleOrthIn :: _
handleOrthIn_ x = Hal.put x

--------------------------------
-- Input Select Component

_inputSelect :: Proxy "inputSelect"
_inputSelect = Proxy

type InputSlot x = Hal.Slot OrthInQuery KwakInputType x

-- inputComp :: forall m r. (MonadState {inputSelect :: KwakInputType | r} m) => HC.Component _ _ _ m
inputComp :: forall m. (MonadEffect m) => HC.Component OrthInQuery _ KwakInputType m
inputComp 
  = Hal.mkComponent
     { initialState : (\_ -> InGrubb)
     , render : radioButtonsI
     , eval : HC.mkEval $ HC.defaultEval 
       { handleAction = handleOrthIn
       , handleQuery  = handleOrthInQuery
       }
     }

radioButtonsI :: KwakInputType -> Html.HTML _ KwakInputType
radioButtonsI kwk
  = Html.div_
      [ Html.input [HP.type_ HP.InputRadio, HP.id "grubb-in",  HP.name "RInput", HP.value "uh1", HE.onClick (\_ -> InGrubb),  HP.checked (kwk == InGrubb)]
      , Html.label [HP.for "grubb-in"] [Html.text "Grubb"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "umista-in", HP.name "RInput", HP.value "uh2", HE.onClick (\_ -> InUmista), HP.checked (kwk == InUmista)]
      , Html.label [HP.for "Umista-in"] [Html.text "Umista"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "napa-in",   HP.name "RInput", HP.value "uh3", HE.onClick (\_ -> InNapa),   HP.checked (kwk == InNapa)]
      , Html.label [HP.for "napa-in"] [Html.text "NAPA"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "boas-in",   HP.name "RInput", HP.value "uh4", HE.onClick (\_ -> InBoas),   HP.checked (kwk == InBoas)]
      , Html.label [HP.for "boas-in"] [Html.text "Boas"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "island-in", HP.name "RInput", HP.value "uh5", HE.onClick (\_ -> InIsland), HP.checked (kwk == InIsland)]
      , Html.label [HP.for "island-in"] [Html.text "Island"]
      ]

handleOrthIn :: KwakInputType -> _ -- forall m . MonadState KwakInputType m => KwakInputType -> m Unit
handleOrthIn kit = do 
  Hal.put kit
  HM.raise kit

data OrthInQuery a
  = GetInputOrth (KwakInputType -> a)

handleOrthInQuery :: forall a s m. Monad m => OrthInQuery a -> Hal.HalogenM KwakInputType _ s _ m (Maybe a)
handleOrthInQuery (GetInputOrth reply) = do
  kit <- get
  pure $ Just (reply kit)

--------------------------------
-- Output Select Component

_outputSelect :: Proxy "outputSelect"
_outputSelect = Proxy

type OutputSlot x = Hal.Slot OrthOutQuery KwakOutputType x

outputComp :: forall m. (MonadEffect m) => HC.Component OrthOutQuery _ _ m
outputComp 
  = Hal.mkComponent
     { initialState : (\_ -> OutGrubb)
     , render : radioButtonsO
     , eval : HC.mkEval $ HC.defaultEval 
       { handleAction = handleOrthOut
       , handleQuery  = handleOrthOutQuery
       }
     }

radioButtonsO :: KwakOutputType -> _
radioButtonsO kwk
  = Html.div_
      [ Html.input [HP.type_ HP.InputRadio, HP.id "grubb-out" , HP.name "ROutput", HP.value "guh1", HE.onClick (\_ -> OutGrubb) , HP.checked (kwk == OutGrubb)]
      , Html.label [HP.for "grubb-out"] [Html.text "Grubb"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "umista-out", HP.name "ROutput", HP.value "guh2", HE.onClick (\_ -> OutUmista), HP.checked (kwk == OutUmista)]
      , Html.label [HP.for "Umista-out"] [Html.text "Umista"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "napa-out"  , HP.name "ROutput", HP.value "guh3", HE.onClick (\_ -> OutNapa)  , HP.checked (kwk == OutNapa)]
      , Html.label [HP.for "napa-out"] [Html.text "NAPA"]
      ]

handleOrthOut :: KwakOutputType -> _ -- forall m . (MonadState KwakOutputType m) => KwakOutputType -> m _
handleOrthOut kot = do 
  Hal.put kot
  HM.raise kot

data OrthOutQuery a
  = GetOutputOrth (KwakOutputType -> a)

handleOrthOutQuery :: forall a s m. Monad m => OrthOutQuery a -> Hal.HalogenM KwakOutputType _ s _ m (Maybe a)
handleOrthOutQuery (GetOutputOrth reply) = do
  kit <- get
  pure $ Just (reply kit)

-- type Node r p i = Array (IProp r i) -> Array (HTML p i) -> HTML p i

-- form :: forall i p. Node HTMLform p i
-- form :: forall i p Array (IProp HTMLform i) -> Array (HTML p i) -> HTML p i

--------------------------------
-- Grubb Options Select

_grubbSelect :: Proxy "grubbOptions"
_grubbSelect = Proxy

_grubbOptions :: Proxy "grubbOptions"
_grubbOptions = Proxy

-- | eXtensible record with `grubbOptions` as a field.
type GrubbOptionsX r = {grubbOptions :: GrubbOptions | r}

-- type GrubbOptionsS r = {grubbOptions :: Hal.Slot _ GrubbOptions _}
type GrubbSlot x = Hal.Slot GrubbQuery GrubbOptions x

-- type GrubbSlotX :: Type -> Row Type -> Row Type
-- type GrubbSlotX x r = {grubbOptions :: GrubbSlot x | r}

data GrubbQuery a
  = GetGrubb (GrubbOptions -> a)
  | SetGrubb GrubbOptions a

-- handleGrubbChange  :: forall m r. MonadState (GrubbOptionsX r) m => GrubbToggle -> m (GrubbOptionsX r)
-- handleGrubbChange  tog = Hal.modify  (\x -> x {grubbOptions = toggleGrubb tog x.grubbOptions})
handleGrubbChange :: GrubbToggle -> _ --  forall m. MonadState GrubbOptions m => GrubbToggle -> m GrubbOptions
handleGrubbChange tog = do
  x <- Hal.modify  (toggleGrubb tog)
  HM.raise x
  pure x

-- handleGrubbChange_ :: forall m r. MonadState {grubbOptions :: GrubbOptions | r} m => GrubbToggle -> m Unit
-- handleGrubbChange_ tog = Hal.modify_ (\x -> x {grubbOptions = toggleGrubb tog x.grubbOptions})
handleGrubbChange_ :: GrubbToggle -> _ -- forall m. MonadState GrubbOptions m => GrubbToggle -> m Unit
handleGrubbChange_ tog = do 
  x <- Hal.modify (toggleGrubb tog)
  HM.raise x

grubbComp :: forall m r. (MonadEffect m) => HC.Component _ GrubbOptions GrubbOptions m
grubbComp
  = Hal.mkComponent
    { initialState : \x -> x -- \_ -> defGrubbOptions
    , render : \st -> grubbOptionsGUI st
    , eval : HC.mkEval $ HC.defaultEval {handleAction = handleGrubbChange_}
    }

-- grubbOptionsGUI :: forall m r. MonadState (GrubbOptionsX r) m => GrubbOptions -> Hal.ComponentHTML GrubbToggle _ m
grubbOptionsGUI :: GrubbOptions -> _ -- Hal.ComponentHTML GrubbToggle _ m
grubbOptionsGUI grb
  = Html.div_
      [ Html.input [HP.type_ HP.InputCheckbox, HP.id "grubb-j", HP.name "CGrubb", HP.value "grb1", HE.onClick (\_ -> GrbTogJ), HP.checked grb.grbUseJ]
      , Html.label [HP.for "grubb-j"] [Html.text "Use J for /h/"]
      , Html.input [HP.type_ HP.InputCheckbox, HP.id "grubb-e", HP.name "CGrubb", HP.value "grb2", HE.onClick (\_ -> GrbTog'), HP.checked grb.grbUse']
      , Html.label [HP.for "grubb-e"] [Html.text "Omit apostrophes at start"]
      , Html.input [HP.type_ HP.InputCheckbox, HP.id "grubb-7", HP.name "CGrubb", HP.value "grb3", HE.onClick (\_ -> GrbTog7), HP.checked grb.grbUse7]
      , Html.label [HP.for "grubb-7"] [Html.text "Replace apostrophes with 7s"]
      ]

data GrubbToggle
  = GrbTogJ
  | GrbTog'
  | GrbTog7

derive instance  eqGrubbTog :: Eq  GrubbToggle
derive instance ordGrubbTog :: Ord GrubbToggle

toggleGrubb :: GrubbToggle -> GrubbOptions -> GrubbOptions
toggleGrubb GrbTogJ grb = grb {grbUseJ = not grb.grbUseJ}
toggleGrubb GrbTog' grb = grb {grbUse' = not grb.grbUse'}
toggleGrubb GrbTog7 grb = grb {grbUse7 = not grb.grbUse7}

--------------------------------
-- Input Text Box

_inputText :: Proxy "inputText"
_inputText = Proxy

type InputTextX r = {inputText :: String | r}

type InputTextSlot x = Hal.Slot InputTextQuery String x

data InputTextQuery a
  = InputString (String -> a)

data InputTextAction
  = ChangeInput String
  | SendInput

-- inputTextComp :: forall m r. (MonadState {inputText :: String | r} m) => HC.Component _ String String m
inputTextComp :: forall m. (Monad m) => HC.Component InputTextQuery String String m
inputTextComp
  = Hal.mkComponent
    { initialState : \x -> x -- \_ -> defGrubbOptions
    , render : inputTextGUI
    , eval : HC.mkEval $ HC.defaultEval 
      { handleQuery = handleInputTextQuery
      , handleAction = handleInputTextAction
      }
    }

inputTextGUI :: forall m. Monad m => String -> Hal.ComponentHTML InputTextAction _ m
inputTextGUI str
  = Html.div_
      [ Html.p_ [Html.text "Input"]
      , Html.p_ [Html.textarea [HP.autofocus true, HP.rows 12, HP.cols 100, HP.id "input-box", HP.name "input-box", HP.placeholder "Input Text", HE.onValueInput (\x -> ChangeInput x)]]
      , Html.p_ [Html.button [HP.id "convert-button", HP.name "convert-button", HE.onClick (\_ -> SendInput)] [Html.text "Convert"] ]
      -- , Html.p_ [Html.input [HP.type_ HP.InputButton, HP.id "input-button", HP.name "input-button"]] -- , HE.onClick (\_ -> GrbTogJ)]
      -- , Html.label [HP.for "input-button"] [Html.text "Convert"]
      ]

handleInputTextQuery :: forall a s m. Monad m => InputTextQuery a -> Hal.HalogenM String InputTextAction s String m (Maybe a)
handleInputTextQuery (InputString reply) = do
  str <- get
  pure $ Just (reply str)

handleInputTextAction :: InputTextAction -> _
handleInputTextAction (ChangeInput str) = Hal.put str
handleInputTextAction SendInput = do
  str <- Hal.get
  Hal.raise str

--------------------------------
-- Output Text Box

_outputText :: Proxy "outputText"
_outputText = Proxy

type OutputTextX r = {outputText :: String | r}

type OutputTextSlot x = Hal.Slot OutputTextQuery Void x

data OutputTextQuery a
  = OutputString String a

-- outputTextComp :: forall m r. (MonadState (OutputTextX r) m) => HC.Component OutputTextQuery String String m
outputTextComp :: forall m. (Monad m) => HC.Component OutputTextQuery String Void m
outputTextComp
  = Hal.mkComponent
    { initialState : \x -> x -- \_ -> defGrubbOptions
    , render : outputTextGUI
    , eval : HC.mkEval $ HC.defaultEval 
       { receive = (\str -> Just str)
       , handleAction = handleOutputAction
       , handleQuery = handleOutputTextQuery
       } -- {handleAction = lift <<< }
    }

handleOutputAction :: forall (m :: Type -> Type) s q. Monad m => String -> Hal.HalogenM String String s q m Unit
handleOutputAction str = Hal.put str

-- handleOutputTextQuery :: forall m r s a. (MonadState (OutputTextX r) m) => OutputTextQuery a -> Hal.HalogenM String _ s _ m (Maybe a)
handleOutputTextQuery :: forall m s a. (Monad m) => OutputTextQuery a -> Hal.HalogenM String _ s _ m (Maybe a)
handleOutputTextQuery (OutputString str x) = do
  Hal.put str
  pure (Just x)

-- outputTextGUI :: forall m r. MonadState (OutputTextX r) m => String -> Hal.ComponentHTML String _ m
outputTextGUI :: forall m. Monad m => String -> Hal.ComponentHTML String _ m
outputTextGUI str
  = Html.div_
      [ Html.p_ [Html.text "Input"]
      , Html.p_ [Html.textarea [HP.rows 12, HP.cols 100, HP.id "output-box", HP.name "output-box", HP.readOnly true, HP.value str]]
      -- , Html.p_ [Html.input [HP.type_ HP.InputButton, HP.id "input-button", HP.name "input-button"]] -- , HE.onClick (\_ -> GrbTogJ)]
      -- , Html.label [HP.for "input-button"] [Html.text "Convert"]
      ]


