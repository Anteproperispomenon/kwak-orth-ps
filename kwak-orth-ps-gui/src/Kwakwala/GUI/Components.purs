module Kwakwala.GUI.Components
  ( inputComp
  )
  where

import Prelude

import Kwakwala.GUI.Types

import Halogen as Hal
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.Component as HC
-- import Halogen.HTML.Elements as HE
import Halogen.HTML.Properties as HP
import Kwakwala.GUI.Types (KwakInputType)

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

-- handleOrthIn :: _
handleOrthIn x = Hal.put x

{-
radioButtonsI :: _
radioButtonsI 
  = Html.form_
      [ Html.fieldset_
        [ Html.legend_ []
        , Html.div_
          [ Html.input [HP.type_ HP.InputRadio, HP.id "grubb-in", HP.name "Grubb", HP.value "uh1"]
          , Html.label [HP.for "grubb-in"] [Html.text "Grubb"]
          , Html.input [HP.type_ HP.InputRadio, HP.id "umista-in", HP.name "Umista", HP.value "uh2"]
          , Html.label [HP.for "Umista-in"] [Html.text "Umista"]
          , Html.input [HP.type_ HP.InputRadio, HP.id "napa-in", HP.name "NAPA", HP.value "uh3"]
          , Html.label [HP.for "napa-in"] [Html.text "NAPA"]
          ]
        ]
      ]
-}

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

{-
radioButtonsO :: _
radioButtonsO 
  = Html.form_
      [ Html.fieldset_
        [ Html.legend_ []
        , Html.div_
          [ Html.input [HP.type_ HP.InputRadio, HP.id "grubb-out", HP.name "Grubb", HP.value "guh1"]
          , Html.label [HP.for "grubb-out"] [Html.text "Grubb"]
          , Html.input [HP.type_ HP.InputRadio, HP.id "umista-out", HP.name "Umista", HP.value "guh2"]
          , Html.label [HP.for "Umista-out"] [Html.text "Umista"]
          , Html.input [HP.type_ HP.InputRadio, HP.id "napa-out", HP.name "NAPA", HP.value "guh3"]
          , Html.label [HP.for "napa-out"] [Html.text "NAPA"]
          ]
        ]
      ]
-}

-- type Node r p i = Array (IProp r i) -> Array (HTML p i) -> HTML p i

-- form :: forall i p. Node HTMLform p i
-- form :: forall i p Array (IProp HTMLform i) -> Array (HTML p i) -> HTML p i

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

