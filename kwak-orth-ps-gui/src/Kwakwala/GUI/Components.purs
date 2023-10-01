module Kwakwala.GUI.Components
  ( inputComp
  , outputComp
  , grubbComp

  -- * Components in Slots
  -- , childGrubbComp
  , GrubbQuery
  )
  where

import Kwakwala.GUI.Types
import Prelude

import Control.Monad.Trans.Class (lift)
import Control.Monad.State.Class (class MonadState)
import Halogen (ComponentHTML)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Kwakwala.Output.Grubb (GrubbOptions(..), GrubbOptions, defGrubbOptions)
import Type.Proxy (Proxy(..))
import Type.Row

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
-- Re-usable Functions

-- handleOrthIn :: _
handleOrthIn_ x = Hal.put x

handleOrthIn  :: forall m r. (MonadState {inputSelect  :: KwakInputType  | r} m) => KwakInputType  -> m Unit
handleOrthIn  kit = Hal.modify_ $ \x -> x {inputSelect = kit}

handleOrthOut :: forall m r. (MonadState {outputSelect :: KwakOutputType | r} m) => KwakOutputType -> m Unit
handleOrthOut kot = Hal.modify_ $ \x -> x {outputSelect = kot}

--------------------------------
-- Input Select Component

_inputSelect :: Proxy "inputSelect"
_inputSelect = Proxy

inputComp :: forall m r. (MonadState {inputSelect :: KwakInputType | r} m) => HC.Component _ _ _ m
inputComp 
  = Hal.mkComponent
     { initialState : (\_ -> InGrubb)
     , render : radioButtonsI
     , eval : HC.mkEval $ HC.defaultEval {handleAction = lift <<< handleOrthIn}
     }

radioButtonsI :: KwakInputType -> _
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

--------------------------------

_outputSelect :: Proxy "outputSelect"
_outputSelect = Proxy

outputComp :: forall m r. (MonadState {outputSelect :: KwakOutputType | r} m) => HC.Component _ _ _ m
outputComp 
  = Hal.mkComponent
     { initialState : (\_ -> OutGrubb)
     , render : radioButtonsO
     , eval : HC.mkEval $ HC.defaultEval {handleAction = lift <<< handleOrthOut}
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

handleGrubbChange  :: forall m r. MonadState (GrubbOptionsX r) m => GrubbToggle -> m (GrubbOptionsX r)
handleGrubbChange  tog = Hal.modify  (\x -> x {grubbOptions = toggleGrubb tog x.grubbOptions})

handleGrubbChange_ :: forall m r. MonadState {grubbOptions :: GrubbOptions | r} m => GrubbToggle -> m Unit
handleGrubbChange_ tog = Hal.modify_ (\x -> x {grubbOptions = toggleGrubb tog x.grubbOptions})

-- childGrubbComp :: forall m r. (MonadState {grubbOptions :: GrubbOptions | r} m) => {grubbOptions :: GrubbOptions | r} -> _ -> ComponentHTML _ _ m
{-
childGrubbComp 
  :: forall m r s x a parentAction (fullRow :: Row Type). (Ord x) 
  => (MonadState {grubbOptions :: GrubbOptions | r} m)
  => Cons "grubbOptions" (GrubbSlot x) s fullRow
  => GrubbOptions
  -> (GrubbOptions -> parentAction)
  -> x 
  -> ComponentHTML parentAction fullRow m
childGrubbComp ops qry x = Html.slot _grubbOptions x grubbComp ops qry
-}

-- We have to lift `handleGrubbChange` since both m and
-- HalogenM ... are instances of MonadState, but with
-- different state types. `m` is the same Monad as the
-- parent's monad, so it has to have an extensible state
-- type. HalogenM, on the other hand, is specific to this
-- component, so its state type should be `GrubbOptions`,
-- rather than an extensible type.

grubbComp :: forall m r. (MonadState {grubbOptions :: GrubbOptions | r} m) => HC.Component _ GrubbOptions GrubbOptions m
grubbComp
  = Hal.mkComponent
    { initialState : \x -> x -- \_ -> defGrubbOptions
    , render : \st -> grubbOptionsGUI st
    , eval : HC.mkEval $ HC.defaultEval {handleAction = \tog -> lift $ handleGrubbChange_ tog}
    }
    {-
    { initialState : \x -> x -- \_ -> defGrubbOptions
    , render : \st -> grubbOptionsGUI st.grubbOptions
    , eval : HC.mkEval $ HC.defaultEval {handleAction = handleGrubbChange_}
    }
    -}

grubbOptionsGUI :: forall m r. MonadState (GrubbOptionsX r) m => GrubbOptions -> Hal.ComponentHTML GrubbToggle _ m
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




{-

<form>
  <fieldset>
    <legend>Please select your preferred contact method:</legend>
    <div>
      <input type="radio" id="contactChoice1" name="contact" value="email" />
      <label for="contactChoice1">Email</label>
      <input type="radio" id="contactChoice2" name="contact" value="phone" />
      <label for="contactChoice2">Phone</label>
      <input type="radio" id="contactChoice3" name="contact" value="mail" />
      <label for="contactChoice3">Mail</label>
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </fieldset>
</form>
<pre id="log"></pre>

-}

