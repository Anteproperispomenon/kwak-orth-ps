module Kwakwala.GUI.Components.OutSelect 
  ( outputComp
  , _outputSelect
  , OrthOutQuery
  , OutputSlot
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
import Kwakwala.GUI.Types (KwakOutputType(..), toolbelowC, toolbelowFC, tooltiptextC)
import Type.Proxy (Proxy(..))
import Web.HTML.Common (ClassName(..))

--------------------------------
-- Output Select Component

_outputSelect :: Proxy "outputSelect"
_outputSelect = Proxy

type OutputSlot x = Hal.Slot OrthOutQuery KwakOutputType x

outputComp :: forall m inp. (MonadEffect m) => HC.Component OrthOutQuery inp KwakOutputType m
outputComp 
  = Hal.mkComponent
     { initialState : (\_ -> OutGrubb)
     , render : radioButtonsO
     , eval : HC.mkEval $ HC.defaultEval 
       { handleAction = handleOrthOut
       , handleQuery  = handleOrthOutQuery
       }
     }

radioButtonsO :: forall m slots. KwakOutputType -> Hal.ComponentHTML KwakOutputType slots m
radioButtonsO kwk
  = Html.div [HP.class_ (ClassName "radio-in")]
      [ Html.input [HP.type_ HP.InputRadio, HP.id "grubb-out" , HP.name "ROutput", HP.value "guh1", HE.onClick (\_ -> OutGrubb)   , HP.checked (kwk == OutGrubb)]
      , Html.label [HP.for "grubb-out", HP.class_ toolbelowFC] 
        [ Html.text "Grubb"
        , Html.span [HP.class_ tooltiptextC] [Html.text "ASCII-compatible orthography for simple applications."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "umista-out", HP.name "ROutput", HP.value "guh2", HE.onClick (\_ -> OutUmista)  , HP.checked (kwk == OutUmista)]
      , Html.label [HP.for "umista-out", HP.class_ toolbelowC] 
        [ Html.text "Umista"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Common Orthography generally used further north."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "napa-out"  , HP.name "ROutput", HP.value "guh3", HE.onClick (\_ -> OutNapa)    , HP.checked (kwk == OutNapa)]
      , Html.label [HP.for "napa-out", HP.class_ toolbelowC] 
        [ Html.text "NAPA"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Orthography based on the North American Phonetic Alphabet. Generally used further South."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "ipa-out"   , HP.name "ROutput", HP.value "guh4", HE.onClick (\_ -> OutIPA)     , HP.checked (kwk == OutIPA)]
      , Html.label [HP.for "ipa-out", HP.class_ toolbelowC] 
        [ Html.text "IPA"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Standard IPA Orthography. If this isn't what you expected, try NAPA instead."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "syll-out"  , HP.name "ROutput", HP.value "guh5", HE.onClick (\_ -> OutSyllabic), HP.checked (kwk == OutSyllabic)]
      , Html.label [HP.for "syll-out", HP.class_ toolbelowC] 
        [ Html.text "Syllabic (Carrier)"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Experimental syllabic orthography. Based on CAS in general, and Carrier in specific."]
        ]
      , Html.input [HP.type_ HP.InputRadio, HP.id "arb-out"  , HP.name "ROutput", HP.value "guh6", HE.onClick (\_ -> OutArabic), HP.checked (kwk == OutArabic)]
      , Html.label [HP.for "arb-out", HP.class_ toolbelowC] 
        [ Html.text "Arabic"
        , Html.span [HP.class_ tooltiptextC] [Html.text "Experimental orthography loosely based on various Arabic scripts."]
        ]
      ]

handleOrthOut :: forall m act slots. KwakOutputType -> Hal.HalogenM KwakOutputType act slots KwakOutputType m Unit -- forall m . (MonadState KwakOutputType m) => KwakOutputType -> m _
handleOrthOut kot = do 
  Hal.put kot
  HM.raise kot

data OrthOutQuery a
  = GetOutputOrth (KwakOutputType -> a)

handleOrthOutQuery :: forall a slots m out act. Monad m => OrthOutQuery a -> Hal.HalogenM KwakOutputType act slots out m (Maybe a)
handleOrthOutQuery (GetOutputOrth reply) = do
  kit <- get
  pure $ Just (reply kit)

