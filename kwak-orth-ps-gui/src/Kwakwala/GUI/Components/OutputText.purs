module Kwakwala.GUI.Components.OutputText
  ( outputTextComp
  , _outputText
  , OutputTextSlot
  , OutputTextQuery(..)
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
