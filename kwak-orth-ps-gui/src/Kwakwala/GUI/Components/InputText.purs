module Kwakwala.GUI.Components.InputText
  ( inputTextComp
  , _inputText
  , InputTextQuery(..)
  , InputTextSlot
  ) where

import Prelude

import Control.Monad.State.Class (get)
import Data.Maybe (Maybe(..))
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Type.Proxy (Proxy(..))
import Web.HTML.Common (ClassName(..))

--------------------------------
-- Input Text Box

_inputText :: Proxy "inputText"
_inputText = Proxy

type InputTextX r = {inputText :: String | r}

type InputTextSlot x = Hal.Slot InputTextQuery String x

type InputTextState
  = { itString :: String
    , itStyle  :: String
    }

data InputTextQuery a
  = InputString (String -> a)
  | InputSetIsland a
  | InputSetNonIsland a

data InputTextAction
  = ChangeInput String
  | SendInput

inputTextComp :: forall m. (Monad m) => HC.Component InputTextQuery String String m
inputTextComp
  = Hal.mkComponent
    { initialState : \x -> { itString : x, itStyle : "normal" }
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
         ]]
      , Html.p_ [Html.button [HP.id "convert-button", HP.name "convert-button", HE.onClick (\_ -> SendInput)] [Html.text "Convert"] ]
      ]

handleInputTextQuery :: forall a s m. Monad m => InputTextQuery a -> Hal.HalogenM InputTextState InputTextAction s String m (Maybe a)
handleInputTextQuery (InputString reply) = do
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


handleInputTextAction :: forall m s. InputTextAction -> Hal.HalogenM InputTextState InputTextAction s String m Unit 
handleInputTextAction (ChangeInput str) = Hal.modify_ $ \st -> st { itString = str}
handleInputTextAction SendInput = do
  str <- Hal.gets _.itString
  Hal.raise str