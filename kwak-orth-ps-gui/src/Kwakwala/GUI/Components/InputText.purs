module Kwakwala.GUI.Components.InputText
  ( inputTextComp
  , _inputText
  , InputTextQuery(..)
  , InputTextSlot
  ) where

import Prelude

import Control.Monad.State.Class (get)
import Data.Maybe (Maybe(..))
import Effect.Class (class MonadEffect)
-- import Halogen (ComponentHTML)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Query.HalogenM as HM
import Type.Proxy (Proxy(..))

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