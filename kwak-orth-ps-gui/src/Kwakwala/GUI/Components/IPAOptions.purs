module Kwakwala.GUI.Components.IPAOptions
  ( ipaComp
  , _ipaOptions
  , IPASlot
  , IPAQuery(..)
  ) where

import Prelude

import Data.Maybe (Maybe(..))
import Effect.Class (class MonadEffect)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Query.HalogenM as HM
import Kwakwala.Output.IPA (IPAOptions)
import Type.Proxy (Proxy(..))
import Web.HTML.Common (ClassName(..))

--------------------------------
-- IPA Options Select

_ipaOptions :: Proxy "ipaOptions"
_ipaOptions = Proxy

-- | eXtensible record with `grubbOptions` as a field.
type IPAOptionsX r = {ipaOptions :: IPAOptions | r}

type IPASlot x = Hal.Slot IPAQuery IPAOptions x

data IPAQuery a
  = GetIPA (IPAOptions -> a)
  -- | SetIPA IPAOptions a

handleIPAChange :: forall m s. IPAToggle -> Hal.HalogenM IPAOptions IPAToggle s IPAOptions m IPAOptions
handleIPAChange tog = do
  x <- Hal.modify  (toggleIPA tog)
  HM.raise x
  pure x

handleIPAChange_ :: forall m s. IPAToggle -> Hal.HalogenM IPAOptions IPAToggle s IPAOptions m Unit
handleIPAChange_ tog = do 
  x <- Hal.modify (toggleIPA tog)
  HM.raise x

handleIPAQuery :: forall m s a. IPAQuery a -> Hal.HalogenM IPAOptions IPAToggle s IPAOptions m (Maybe a)
handleIPAQuery (GetIPA reply) = do
  x <- Hal.get
  pure $ Just (reply x)

ipaComp :: forall m. (MonadEffect m) => HC.Component IPAQuery IPAOptions IPAOptions m
ipaComp
  = Hal.mkComponent
    { initialState : \x -> x
    , render : \st -> grubbOptionsGUI st
    , eval : HC.mkEval $ HC.defaultEval 
       { handleAction = handleIPAChange_ 
       , handleQuery  = handleIPAQuery
       }
    }

grubbOptionsGUI :: forall m s. IPAOptions -> Hal.ComponentHTML IPAToggle s m
grubbOptionsGUI ops
  = Html.div [HP.class_ (ClassName "orth-options")]
    [ Html.p_
      [ Html.span [HP.class_ (ClassName "orth-span")]
        [ Html.label [HP.for "ipa-tie"]
          [ Html.input  [HP.type_ HP.InputCheckbox, HP.id "ipa-tie", HP.name "CIPA", HP.value "ipa1", HE.onClick (\_ -> IpaTogTie), HP.checked ops.ipaUseTies] 
          , Html.text "Include ties in the middle of affricates"
          ]
        ]
      ]
    , Html.p_
      [ Html.span [HP.class_ (ClassName "orth-span")]
        [ Html.label [HP.for "ipa-pal"]
          [ Html.input  [HP.type_ HP.InputCheckbox, HP.id "ipa-pal", HP.name "CIPA", HP.value "ipa2", HE.onClick (\_ -> IpaTogPal), HP.checked ops.ipaShowPal] 
          , Html.text "Include palatalisation marks for velar consonants"
          ]
        ]
      ]
    ]

data IPAToggle
  = IpaTogPal
  | IpaTogTie

derive instance  eqIpaTog :: Eq  IPAToggle
derive instance ordIpaTog :: Ord IPAToggle

toggleIPA :: IPAToggle -> IPAOptions -> IPAOptions
toggleIPA IpaTogPal ops = ops {ipaShowPal = not ops.ipaShowPal}
toggleIPA IpaTogTie ops = ops {ipaUseTies = not ops.ipaUseTies}
