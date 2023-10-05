module Kwakwala.GUI.Components
  ( convertComp
  , ParentAction(..)

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

import Kwakwala.GUI.Components.InSelect
import Kwakwala.GUI.Components.OutSelect
import Kwakwala.GUI.Components.GrubbOptions
import Kwakwala.GUI.Components.InputText
import Kwakwala.GUI.Components.OutputText

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

convertComp :: forall m. (MonadEffect m) => HC.Component _ ParentAction _ m
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

handleConvertAction :: forall m. ParentAction -> Hal.HalogenM ParentState _ ParentSlots _ m Unit
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


-- type Node r p i = Array (IProp r i) -> Array (HTML p i) -> HTML p i

-- form :: forall i p. Node HTMLform p i
-- form :: forall i p Array (IProp HTMLform i) -> Array (HTML p i) -> HTML p i




