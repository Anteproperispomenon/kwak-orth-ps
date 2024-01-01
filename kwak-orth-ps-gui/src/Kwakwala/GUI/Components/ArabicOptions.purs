module Kwakwala.GUI.Components.ArabicOptions
  ( arabicComp
  , _arabicOptions
  , ArabicSlot
  , ArabicQuery(..)
  , ArabicToggle
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
import Kwakwala.GUI.Types (checkboxC)
import Kwakwala.Output.Arabic (ArabicAOption(..), ArabicEOption(..), ArabicGOption(..), ArabicGuOption(..), ArabicIOption(..), ArabicLhOption(..), ArabicOOption(..), ArabicOptions, ArabicUOption(..))
import Type.Proxy (Proxy(..))
import Web.HTML.Common (ClassName(..))

--------------------------------
-- Arabic Options Select

-- _arabicSelect :: Proxy "arabicOptions"
-- _arabicSelect = Proxy

_arabicOptions :: Proxy "arabicOptions"
_arabicOptions = Proxy

-- | eXtensible record with `arabicOptions` as a field.
type ArabicOptionsX r = {arabicOptions :: ArabicOptions | r}

type ArabicSlot x = Hal.Slot ArabicQuery ArabicOptions x

data ArabicQuery a
  = GetArabic (ArabicOptions -> a)
  -- | SetArabic ArabicOptions a

handleArabicChange :: forall m s act. ArabicToggle -> Hal.HalogenM ArabicOptions act s ArabicOptions m ArabicOptions
handleArabicChange tog = do
  x <- Hal.modify  (toggleArabic tog)
  HM.raise x
  pure x

-- handleArabicChange_ :: forall m r. MonadState {arabicOptions :: ArabicOptions | r} m => ArabicToggle -> m Unit
-- handleArabicChange_ tog = Hal.modify_ (\x -> x {arabicOptions = toggleArabic tog x.arabicOptions})
handleArabicChange_ :: forall m s act. ArabicToggle -> Hal.HalogenM ArabicOptions act s ArabicOptions m Unit
handleArabicChange_ tog = do 
  x <- Hal.modify (toggleArabic tog)
  HM.raise x

handleArabicQuery :: forall m s act a. ArabicQuery a -> Hal.HalogenM ArabicOptions act s ArabicOptions m (Maybe a)
handleArabicQuery (GetArabic reply) = do
  x <- Hal.get
  pure $ Just (reply x)

arabicComp :: forall m. (MonadEffect m) => HC.Component ArabicQuery ArabicOptions ArabicOptions m
arabicComp
  = Hal.mkComponent
    { initialState : \x -> x
    , render : \st -> arabicOptionsGUI st
    , eval : HC.mkEval $ HC.defaultEval 
       { handleAction = handleArabicChange_ 
       , handleQuery  = handleArabicQuery
       }
    }

arabicOptionsGUI :: forall m s. ArabicOptions -> Hal.ComponentHTML ArabicToggle s m
arabicOptionsGUI ops
  = Html.div [HP.class_ (ClassName "orth-options")]
      [ Html.p [HP.class_ arbClass]
        [ Html.label [HP.for "arb-hamzah", HP.class_ (ClassName "orth-span")]
          [ Html.input [HP.type_ HP.InputCheckbox, HP.id "arb-hamzah", HP.name "CArabicHamzah", HP.class_ checkboxC, HP.value "arb0", HE.onClick (\_ -> ArbHamzahToggle), HP.checked ops.combHamza]
          , Html.text "Integrate Hamzahs with vowels"
          ]
      ]
      , Html.p_ [Html.text "Phoneme Options"]
      , Html.p [HP.class_ arbClass]
        [ Html.text "/ɬ/"
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-lh-sh" , HP.name "CArabicLh", HP.value "arb1", HE.onClick (\_ -> (ArbLhToggle LhSheen))   , HP.checked (ops.arbLhKind == LhSheen)]
        , Html.label [HP.for "arb-lh-sh"] -- , HP.class_ toolbelowFC] 
          [ Html.text "\x634 (Sheen)"
          ]
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-lh-lh", HP.name "CArabicLh", HP.value "arb2", HE.onClick (\_ -> (ArbLhToggle LhLhah))  , HP.checked (ops.arbLhKind == LhLhah)]
        , Html.label [HP.for "arb-lh-lh"] -- , HP.class_ toolbelowC] 
          [ Html.text "\x6b5 (Lhah)"
          ]
        ]
      , Html.p [HP.class_ arbClass]
        [ Html.text "/ɢ/"
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-gu-gh" , HP.name "CArabicGu", HP.value "arb3", HE.onClick (\_ -> (ArbGuToggle GuGhain))   , HP.checked (ops.arbGuKind == GuGhain)]
        , Html.label [HP.for "arb-gu-gh"] -- , HP.class_ toolbelowFC] 
          [ Html.text "\x63a (Ghain)"
          ]
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-gu-qh", HP.name "CArabicGu", HP.value "arb4", HE.onClick (\_ -> (ArbGuToggle GuLikeQ))  , HP.checked (ops.arbGuKind == GuLikeQ)]
        , Html.label [HP.for "arb-gu-qh"] -- , HP.class_ toolbelowC] 
          [ Html.text "\x6a8 (Like Qah)"
          ]
        ]
      , Html.p [HP.class_ arbClass]
        [ Html.text "/g/"
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-g-k" , HP.name "CArabicG", HP.value "arb5", HE.onClick (\_ -> (ArbGToggle GLikeK))   , HP.checked (ops.arbGKind == GLikeK)]
        , Html.label [HP.for "arb-g-k"] -- , HP.class_ toolbelowFC] 
          [ Html.text "\x6ac (Like Kah)"
          ]
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-g-q", HP.name "CArabicG", HP.value "arb6", HE.onClick (\_ -> (ArbGToggle GLikeQ))  , HP.checked (ops.arbGKind == GLikeQ)]
        , Html.label [HP.for "arb-g-q"] -- , HP.class_ toolbelowC] 
          [ Html.text "\x6a7 (Like Qah)"
          ]
        ]
      , Html.p [HP.class_ arbClass]
        [ Html.text "/e/"
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-e-a" , HP.name "CArabicE", HP.value "arb7", HE.onClick (\_ -> (ArbEToggle EAlifDia))   , HP.checked (ops.arbEKind == EAlifDia)]
        , Html.label [HP.for "arb-e-a"] -- , HP.class_ toolbelowFC] 
          [ Html.text "\x627\x650 (Alif Kasrah)" ]
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-e-i", HP.name "CArabicE", HP.value "arb8", HE.onClick (\_ -> (ArbEToggle EWedgeI))  , HP.checked (ops.arbEKind == EWedgeI)]
        , Html.label [HP.for "arb-e-i"] -- , HP.class_ toolbelowC] 
          [ Html.text "\x6ce (Ya Wedge)" ]
        ]
      , Html.p [HP.class_ arbClass]
        [ Html.text "/e/"
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-o-a" , HP.name "CArabicO", HP.value "arb9", HE.onClick (\_ -> (ArbOToggle OAlifDia))   , HP.checked (ops.arbOKind == OAlifDia)]
        , Html.label [HP.for "arb-o-a"] -- , HP.class_ toolbelowFC] 
          [ Html.text "\x627\x64f (Alif Dammah)" ]
        , Html.input [HP.type_ HP.InputRadio, HP.id "arb-o-u", HP.name "CArabicO", HP.value "arb10", HE.onClick (\_ -> (ArbOToggle OWedgeU))  , HP.checked (ops.arbOKind == OWedgeU)]
        , Html.label [HP.for "arb-o-u"] -- , HP.class_ toolbelowC] 
          [ Html.text "\x6c9 (Waw Wedge)" ]
        ]
      ]

arbClass :: ClassName
arbClass = (ClassName "radio-arb")

-- "\x6a7"
-- "\x6ac"

data ArabicToggle
  = ArbLhToggle ArabicLhOption
  | ArbGuToggle ArabicGuOption
  | ArbGToggle  ArabicGOption
  | ArbAToggle  ArabicAOption
  | ArbEToggle  ArabicEOption
  | ArbIToggle  ArabicIOption
  | ArbOToggle  ArabicOOption
  | ArbUToggle  ArabicUOption
  | ArbHamzahToggle

derive instance  eqArabicTog :: Eq  ArabicToggle
-- derive instance ordArabicTog :: Ord ArabicToggle

toggleArabic :: ArabicToggle -> ArabicOptions -> ArabicOptions
toggleArabic (ArbLhToggle tog) ops = ops {arbLhKind = tog}
toggleArabic (ArbGuToggle tog) ops = ops {arbGuKind = tog}
toggleArabic (ArbGToggle  tog) ops = ops {arbGKind  = tog}
toggleArabic (ArbAToggle  tog) ops = ops {arbAKind  = tog}
toggleArabic (ArbEToggle  tog) ops = ops {arbEKind  = tog}
toggleArabic (ArbIToggle  tog) ops = ops {arbIKind  = tog}
toggleArabic (ArbOToggle  tog) ops = ops {arbOKind  = tog}
toggleArabic (ArbUToggle  tog) ops = ops {arbUKind  = tog}
toggleArabic ArbHamzahToggle   ops = ops {combHamza = not ops.combHamza}

{-
  = { arbLhKind :: ArabicLhOption
    , arbGuKind :: ArabicGuOption
    , arbGKind  :: ArabicGOption
    , arbAKind  :: ArabicAOption
    , arbEKind  :: ArabicEOption
    , arbIKind  :: ArabicIOption
    , arbOKind  :: ArabicOOption
    , arbUKind  :: ArabicUOption

-}
