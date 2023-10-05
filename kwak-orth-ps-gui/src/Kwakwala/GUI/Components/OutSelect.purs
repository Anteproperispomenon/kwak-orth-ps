module Kwakwala.GUI.Components.OutSelect 
  ( outputComp
  , _outputSelect
  , OrthOutQuery
  , OutputSlot
  ) where

import Prelude

import Kwakwala.GUI.Types (KwakOutputType(..))

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
