module Kwakwala.GUI.Components.InputText
  ( inputTextComp
  , _inputText
  , InputTextQuery(..)
  , InputTextSlot
  , InputTextRaise(..)
  ) where

import Prelude

import Control.Monad.State.Class (get)
import Data.Maybe (Maybe(..))
import Effect.Aff.Class (class MonadAff)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Kwakwala.GUI.Types (ConvertState(..), convertStateC)
import Type.Proxy (Proxy(..))
import Web.HTML.Common (ClassName(..))

--------------------------------
-- Input Text Box

_inputText :: Proxy "inputText"
_inputText = Proxy

type InputTextX r = {inputText :: String | r}

type InputTextSlot x = Hal.Slot InputTextQuery InputTextRaise x

type InputTextState
  = { itString :: String
    , itStyle  :: String
    , itConvert :: ConvertState
    }

data InputTextQuery a
  = InputStringQ (String -> a)
  | InputSetIsland a
  | InputSetNonIsland a
  | InputSetButtonDone a
  | InputReset a

data InputTextAction
  = ChangeInput String
  | SendInput
  | SendInputPull
  | SetInProgress
  | DoneButton
  | RevertButton

data InputTextRaise
  = RaiseInput String
  | PullInput

inputTextComp :: forall m. (MonadAff m) => HC.Component InputTextQuery String InputTextRaise m
inputTextComp
  = Hal.mkComponent
    { initialState : \x -> { itString : x, itStyle : "normal", itConvert : ConvertReady }
    , render : inputTextGUI
    , eval : HC.mkEval $ HC.defaultEval 
      { handleQuery = handleInputTextQuery
      , handleAction = handleInputTextAction
      }
    }

inputTextGUI :: forall m s. Monad m => InputTextState -> Hal.ComponentHTML InputTextAction s m
inputTextGUI st
  = Html.div_
      [ Html.p_ [Html.text "Input"]
      , Html.p_ [Html.textarea 
         [ HP.autofocus true
         , HP.rows 12
         , HP.cols 100
         , HP.id "input-box"
         , HP.name "input-box"
         , HP.placeholder "Input Text"
         , HE.onValueInput (\x -> ChangeInput x)
         , HP.class_ (ClassName st.itStyle)
         ] ]
      , Html.p_ 
        [ Html.button 
          [ HP.id "convert-button"
          , HP.name "convert-button"
          , HE.onClick (\_ -> SendInput)
          -- , HE.onClick (\_ -> SendInputPull)
          -- , HE.onMouseDown (\_ -> SetInProgress)
          , HP.class_ (getConvertClass st)
          -- Note: if the call stack size is exceded,
          -- The button will be stuck in the ConvertProgress
          -- state. Thus, we don't disable the button
          -- while in that state.
          -- , HP.disabled (st.itConvert == ConvertProgress)
          ]
          [ Html.text (getButtonText st.itConvert) ] ]
      ]

getConvertClass :: InputTextState -> ClassName
getConvertClass = _.itConvert >>> convertStateC

getButtonText :: ConvertState -> String
getButtonText ConvertReady    = "Convert"
getButtonText ConvertProgress = "Converting..."
getButtonText ConvertDone     = "Conversion Complete"

handleInputTextQuery :: forall a s m. Monad m => InputTextQuery a -> Hal.HalogenM InputTextState InputTextAction s InputTextRaise m (Maybe a)
handleInputTextQuery (InputStringQ reply) = do
  st <- get
  pure $ Just (reply st.itString)
handleInputTextQuery (InputSetIsland x) = do
  st <- get
  Hal.put $ st {itStyle = "island"}
  pure $ Just x
handleInputTextQuery (InputSetNonIsland x) = do
  st <- get
  Hal.put $ st {itStyle = "normal"}
  pure $ Just x
handleInputTextQuery (InputSetButtonDone x) = do
  Hal.modify_ $ \st -> st { itConvert = ConvertDone }
  pure $ Just x
handleInputTextQuery (InputReset x) = do
  cvt <- Hal.gets _.itConvert
  when (cvt == ConvertDone) $ Hal.modify_ $ \st -> st { itConvert = ConvertReady }
  pure $ Just x

handleInputTextAction :: forall m s. MonadAff m => InputTextAction -> Hal.HalogenM InputTextState InputTextAction s InputTextRaise m Unit 
handleInputTextAction (ChangeInput str) = do
  stx <- Hal.modify $ \st -> st { itString = str }
  when (stx.itConvert == ConvertDone) (Hal.modify_ $ \st -> st { itConvert = ConvertReady })
  -- Might want to check whether st.itConvert is in progress first.
  -- = Hal.modify_ $ \st -> st { itString = str , itConvert = ConvertReady }
handleInputTextAction SetInProgress = do
  Hal.modify_ $ \st -> st { itConvert = ConvertProgress }
handleInputTextAction SendInput = do
  Hal.modify_ $ \st -> st { itConvert = ConvertProgress }
  str <- Hal.gets _.itString
  Hal.raise (RaiseInput str)
handleInputTextAction SendInputPull = do
  Hal.modify_ $ \st -> st { itConvert = ConvertProgress }
  -- str <- Hal.gets _.itString
  Hal.raise PullInput
handleInputTextAction DoneButton   = Hal.modify_ $ \st -> st { itConvert = ConvertDone  }
handleInputTextAction RevertButton = Hal.modify_ $ \st -> st { itConvert = ConvertReady }
