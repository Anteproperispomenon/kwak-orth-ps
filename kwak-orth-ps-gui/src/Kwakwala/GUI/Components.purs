module Kwakwala.GUI.Components
  ( inputComp
  , outputComp
  , grubbComp
  )
  where

import Kwakwala.GUI.Types
import Prelude

import Control.Monad.State.Class (class MonadState)
import Halogen (ComponentHTML)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Kwakwala.Output.Grubb (GrubbOptions(..), GrubbOptions, defGrubbOptions)
import Type.Proxy (Proxy(..))

--------------------------------
-- Re-usable Functions

-- handleOrthIn :: _
handleOrthIn x = Hal.put x

--------------------------------
-- Input Select Component

_inputSelect :: Proxy "inputSelect"
_inputSelect = Proxy

inputComp :: _
inputComp 
  = Hal.mkComponent
     { initialState : (\_ -> InGrubb)
     , render : radioButtonsI
     , eval : HC.mkEval $ HC.defaultEval {handleAction = handleOrthIn}
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

outputComp :: _
outputComp 
  = Hal.mkComponent
     { initialState : (\_ -> OutGrubb)
     , render : radioButtonsO
     , eval : HC.mkEval $ HC.defaultEval {handleAction = handleOrthIn}
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

_grubbSelect :: Proxy "grubbSelect"
_grubbSelect = Proxy

handleGrubbChange  :: forall m r. MonadState {grubbOptions :: GrubbOptions | r} m => GrubbToggle -> m {grubbOptions :: GrubbOptions | r}
handleGrubbChange  tog = Hal.modify  (\x -> x {grubbOptions = toggleGrubb tog x.grubbOptions})

handleGrubbChange_ :: forall m r. MonadState {grubbOptions :: GrubbOptions | r} m => GrubbToggle -> m Unit
handleGrubbChange_ tog = Hal.modify_ (\x -> x {grubbOptions = toggleGrubb tog x.grubbOptions})

childGrubbComp :: forall m r. (MonadState {grubbOptions :: GrubbOptions | r} m) => {grubbOptions :: GrubbOptions | r} -> _ -> ComponentHTML _ _ m
childGrubbComp ops qry = Html.slot _grubbSelect 0 grubbComp ops qry

grubbComp :: forall m r. (MonadState {grubbOptions :: GrubbOptions | r} m) => HC.Component _ _ _ m
grubbComp
  = Hal.mkComponent
    { initialState : \x -> x -- \_ -> defGrubbOptions
    , render : \st -> grubbOptionsGUI st.grubbOptions
    , eval : HC.mkEval $ HC.defaultEval {handleAction = handleGrubbChange_}
    }

grubbOptionsGUI :: GrubbOptions -> _
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
