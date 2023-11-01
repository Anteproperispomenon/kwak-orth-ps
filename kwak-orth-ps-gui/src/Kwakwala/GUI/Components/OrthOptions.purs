module Kwakwala.GUI.Components.OrthOptions
  ( orthComp
  , _orthOptions
  , OrthOptions(..)
  , OrthSlot
  , OrthQuery(..)
  ) where


import Prelude

import Kwakwala.GUI.Components.GrubbOptions

import Effect.Class (class MonadEffect)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Query.HalogenM as HM
import Kwakwala.Output.Grubb (GrubbOptions, defGrubbOptions)
import Type.Proxy (Proxy(..))

--------------------------------
-- Orthography Options Select

_orthOptions :: Proxy "grubbOptions"
_orthOptions = Proxy

-- | eXtensible record with `grubbOptions` as a field.
type OrthOptionsX r = {grubbOptions :: GrubbOptions | r}

type OrthSlot x = Hal.Slot OrthQuery OrthOptions x

type OrthSlots
  = ( grubbOptions :: GrubbSlot Unit
    -- , ipaOptions :: IPASlot Unit
    -- , georgianOptions :: GeorgianSlot Unit
    )

data OrthQuery a
  = OrthGetGrubb (GrubbOptions -> a)
  | OrthSetGrubb GrubbOptions a
  -- | OrthGetIPA (IPAOptions -> a)
  -- | OrthSetIPA IPAOptions a
  -- | OrthGetGeorgian (GeorgianOptions -> a)
  -- | OrthSetGeorgian GeorgianOptions a

data OrthAction
  = OrthToggleBox
  | OrthRaiseOptions OrthOptions

orthRaiseGrubb :: GrubbOptions -> OrthAction
orthRaiseGrubb = OrthGrubbOptions >>> OrthRaiseOptions

data OrthOptions
  = OrthGrubbOptions GrubbOptions
  -- | OrthIPAOptions IPAOptions
  -- | OrthGeorgianOptions GeorgianOptions


type OrthState
  = { orthOpen :: Boolean
    }
  -- = {orthGrubb :: GrubbOptions
    -- , orthIPA :: IPAOptions
    -- , orthGeorgian :: GeorgianOptions
    -- }

{-
handleOrthChange :: forall m s act. OrthToggle -> Hal.HalogenM Unit act s OrthOptions m OrthOptions
handleOrthChange OrthToggleBox = do
handleOrthChange tog = do
  x <- Hal.modify  (toggleGrubb tog)
  HM.raise x
  pure x
-}

-- handleGrubbChange_ :: forall m r. MonadState {grubbOptions :: GrubbOptions | r} m => GrubbToggle -> m Unit
-- handleGrubbChange_ tog = Hal.modify_ (\x -> x {grubbOptions = toggleGrubb tog x.grubbOptions})
handleOrthChange_ :: forall m. OrthAction -> Hal.HalogenM OrthState OrthAction OrthSlots OrthOptions m Unit
handleOrthChange_ OrthToggleBox = Hal.modify_ (\x -> x {orthOpen = (not x.orthOpen)})
handleOrthChange_ (OrthRaiseOptions opts) = HM.raise opts
  -- x <- Hal.modify (toggleGrubb tog)
  -- HM.raise x

orthComp :: forall m. (MonadEffect m) => HC.Component OrthQuery Unit OrthOptions m
orthComp
  = Hal.mkComponent
    { initialState : \_ -> {orthOpen : false}
    , render : \st -> orthOptionsGUI st
    , eval : HC.mkEval $ HC.defaultEval {handleAction = handleOrthChange_}
    }

orthOptionsGUI :: forall m. MonadEffect m => OrthState -> Hal.ComponentHTML OrthAction OrthSlots m
orthOptionsGUI orst
  = Html.div_
      [ Html.p_ [Html.text "Grubb Options"]
      , Html.p_ [Html.slot  _grubbOptions unit grubbComp {-orst.orthGrubb-} defGrubbOptions orthRaiseGrubb]
      -- , Html.p_ [Html.txt "IPA Options"]
      -- , Html.p_ [Html.slot  _ipaOptions unit ipaComp defIPAOptions OrthIPAOptions]
      ]

