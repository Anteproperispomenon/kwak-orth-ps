module Kwakwala.GUI.Components.InSelect 
  ( inputComp
  , _inputSelect
  , OrthInQuery
  , InputSlot
  ) where

import Prelude

import Control.Monad.State.Class (get)
import Data.Maybe (Maybe(..))
import Effect.Class (class MonadEffect)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Query.HalogenM as HM
import Kwakwala.GUI.Types (KwakInputType(..))
import Type.Proxy (Proxy(..))
import Web.HTML.Common (ClassName(..))

--------------------------------
-- Input Select Component

_inputSelect :: Proxy "inputSelect"
_inputSelect = Proxy

type InputSlot x = Hal.Slot OrthInQuery KwakInputType x

-- inputComp :: forall m r. (MonadState {inputSelect :: KwakInputType | r} m) => HC.Component _ _ _ m
inputComp :: forall m. (MonadEffect m) => HC.Component OrthInQuery KwakInputType KwakInputType m
inputComp 
  = Hal.mkComponent
     { initialState : \x -> x -- (\_ -> InGrubb)
     , render : radioButtonsI
     , eval : HC.mkEval $ HC.defaultEval 
       { handleAction = handleOrthIn
       , handleQuery  = handleOrthInQuery
       }
     }

radioButtonsI :: forall x. KwakInputType -> Html.HTML x KwakInputType
radioButtonsI kwk
  = Html.div [HP.class_ (ClassName "radio-in")]
      [ Html.input [HP.type_ HP.InputRadio, HP.id "grubb-in",  HP.name "RInput", HP.value "uh1", HE.onClick (\_ -> InGrubb),  HP.checked (kwk == InGrubb)]
      , Html.label [HP.for "grubb-in"] [Html.text "Grubb"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "umista-in", HP.name "RInput", HP.value "uh2", HE.onClick (\_ -> InUmista), HP.checked (kwk == InUmista)]
      , Html.label [HP.for "umista-in"] [Html.text "Umista"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "napa-in",   HP.name "RInput", HP.value "uh3", HE.onClick (\_ -> InNapa),   HP.checked (kwk == InNapa)]
      , Html.label [HP.for "napa-in"] [Html.text "NAPA"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "boas-in",   HP.name "RInput", HP.value "uh4", HE.onClick (\_ -> InBoas),   HP.checked (kwk == InBoas)]
      , Html.label [HP.for "boas-in"] [Html.text "Boas"]
      , Html.input [HP.type_ HP.InputRadio, HP.id "island-in", HP.name "RInput", HP.value "uh5", HE.onClick (\_ -> InIsland), HP.checked (kwk == InIsland)]
      , Html.label [HP.for "island-in"] [Html.text "Island"]
      ]

 -- forall m . MonadState KwakInputType m => KwakInputType -> m Unit
handleOrthIn :: forall m s act. KwakInputType -> Hal.HalogenM KwakInputType act s KwakInputType m Unit
handleOrthIn kit = do 
  Hal.put kit
  HM.raise kit

data OrthInQuery a
  = GetInputOrth (KwakInputType -> a)

handleOrthInQuery :: forall a s m act. Monad m => OrthInQuery a -> Hal.HalogenM KwakInputType act s KwakInputType m (Maybe a)
handleOrthInQuery (GetInputOrth reply) = do
  kit <- get
  pure $ Just (reply kit)
