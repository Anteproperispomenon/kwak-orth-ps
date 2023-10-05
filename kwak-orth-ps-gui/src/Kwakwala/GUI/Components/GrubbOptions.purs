module Kwakwala.GUI.Components.GrubbOptions
  ( grubbComp
  , _grubbOptions
  , GrubbSlot
  , GrubbQuery(..)
  ) where

import Prelude

-- import Kwakwala.GUI.Types (KwakInputType(..))

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

import Kwakwala.Output.Grubb (GrubbOptions(..), GrubbOptions, defGrubbOptions)

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

grubbComp :: forall m. (MonadEffect m) => HC.Component _ GrubbOptions GrubbOptions m
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
