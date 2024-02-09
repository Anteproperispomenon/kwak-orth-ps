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
import Kwakwala.GUI.Types (KwakInputType(..), toolaboveC, toolaboveFC, tooltiptextC)
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
      , Html.label [HP.for "grubb-in", HP.class_ toolaboveFC] 
        [ Html.text "Grubb"
        , Html.span [HP.class_ tooltiptextC] [Html.text "ASCII-compatible orthography for simple applications."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "umista-in", HP.name "RInput", HP.value "uh2", HE.onClick (\_ -> InUmista), HP.checked (kwk == InUmista)]
      , Html.label [HP.for "umista-in", HP.class_ toolaboveC] 
        [ Html.text "Umista"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Common Orthography generally used further north."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "napa-in",   HP.name "RInput", HP.value "uh3", HE.onClick (\_ -> InNapa),   HP.checked (kwk == InNapa)]
      , Html.label [HP.for "napa-in", HP.class_ toolaboveC] 
        [ Html.text "NAPA"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Orthography based on the North American Phonetic Alphabet. Generally used further South."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "boas-in",   HP.name "RInput", HP.value "uh4", HE.onClick (\_ -> InBoas),   HP.checked (kwk == InBoas)]
      , Html.label [HP.for "boas-in", HP.class_ toolaboveC] 
        [ Html.text "Boas"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Orthography used by Franz Boas and related anthropologists."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "island-in", HP.name "RInput", HP.value "uh5", HE.onClick (\_ -> InIsland), HP.checked (kwk == InIsland)]
      , Html.label [HP.for "island-in", HP.class_ toolaboveC] 
        [ Html.text "Island"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Variant of NAPA that uses the specific 'Island' Font."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "syll-in"  , HP.name "RInput", HP.value "uh6", HE.onClick (\_ -> InSyllabic), HP.checked (kwk == InSyllabic)]
      , Html.label [HP.for "syll-in", HP.class_ toolaboveC] 
        [ Html.text "Syllabic (Carrier)"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Experimental syllabic orthography. Based on CAS in general, and Carrier in specific."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "arabic-in", HP.name "RInput", HP.value "uh7", HE.onClick (\_ -> InArabic), HP.checked (kwk == InArabic)]
      , Html.label [HP.for "arabic-in", HP.class_ toolaboveC] 
        [ Html.text "Arabic"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Experimental orthography loosely based on various Arabic scripts."]
        ]
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
