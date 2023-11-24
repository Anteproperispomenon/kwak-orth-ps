module Kwakwala.GUI.Components.OrthOptions
  ( orthComp
  , _orthOptions
  , OrthOptions(..)
  , OrthSlot
  , OrthQuery(..)
  -- , AllOrthOptions
  -- , defAllOrthOptions
  ) where

import Prelude

import Kwakwala.GUI.Components.GrubbOptions (GrubbQuery(..), GrubbSlot, _grubbOptions, grubbComp)
import Kwakwala.GUI.Components.IPAOptions (IPAQuery(..), IPASlot, _ipaOptions, ipaComp)
-- import Kwakwala.GUI.Types (AllOrthOptions, defAllOrthOptions)

import Data.Maybe (Maybe)
import Effect.Class (class MonadEffect)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Query as HQ
import Halogen.Query.HalogenM as HM
import Kwakwala.Output.Grubb (GrubbOptions, defGrubbOptions)
import Kwakwala.Output.IPA (IPAOptions, defIPAOptions)
import Type.Proxy (Proxy(..))
import Web.HTML.Common (ClassName(..))

--------------------------------
-- Orthography Options Select

_orthOptions :: Proxy "orthOptions"
_orthOptions = Proxy

type OrthSlot x = Hal.Slot OrthQuery OrthOptions x

type OrthSlots
  = ( grubbOptions :: GrubbSlot Unit
    , ipaOptions :: IPASlot Unit
    -- , georgianOptions :: GeorgianSlot Unit
    )

data OrthQuery a
  = OrthGetGrubb (GrubbOptions -> a)
  | OrthGetIPA (IPAOptions -> a)
  -- | OrthGetGeorgian (GeorgianOptions -> a)
  -- | OrthSetGrubb GrubbOptions a
  -- | OrthSetIPA IPAOptions a
  -- | OrthSetGeorgian GeorgianOptions a

data OrthAction
  = OrthToggleBox
  | OrthRaiseOptions OrthOptions

orthRaiseGrubb :: GrubbOptions -> OrthAction
orthRaiseGrubb = OrthGrubbOptions >>> OrthRaiseOptions

orthRaiseIPA :: IPAOptions -> OrthAction
orthRaiseIPA = OrthIPAOptions >>> OrthRaiseOptions

-- orthRaiseGeorgian :: GeorgianOptions -> OrthAction
-- orthRaiseGeorgian = OrthGeorgianOptions >>> OrthRaiseOptions

data OrthOptions
  = OrthGrubbOptions GrubbOptions
  | OrthIPAOptions IPAOptions
  -- | OrthGeorgianOptions GeorgianOptions

-- | Only has one value, since the orthography
-- | options are stored in the child components.
type OrthState = { orthOpen :: Boolean }

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
    , eval : HC.mkEval $ HC.defaultEval
       { handleAction = handleOrthChange_
       , handleQuery  = handleOrthQuery
       }
    }

orthOptionsGUI :: forall m. MonadEffect m => OrthState -> Hal.ComponentHTML OrthAction OrthSlots m
orthOptionsGUI orst
  = Html.div_
      [ Html.button [HP.class_ (ClassName "collapsible"), HE.onClick (\_ -> OrthToggleBox) ] [Html.text $ buttonText orst ]
      , Html.div [HP.class_ (ClassName "hid-content"), HP.style (blockStyle orst)]
        [ Html.p_ [Html.text "Grubb Options"]
        , Html.p_ [Html.slot  _grubbOptions unit grubbComp defGrubbOptions orthRaiseGrubb]
        , Html.p_ [Html.text "IPA Options"]
        , Html.p_ [Html.slot  _ipaOptions unit ipaComp defIPAOptions orthRaiseIPA]
        ]
      ]

blockStyle :: OrthState -> String
blockStyle orst
  | orst.orthOpen = "display : block"
  | otherwise     = "display : none"
  -- | orst.orthOpen = "display : none"
  -- | otherwise     = "display : block"

buttonText :: OrthState -> String
buttonText orst
  | orst.orthOpen = "Hide Specific Orthography Options"
  | otherwise     = "Show Specific Orhtography Options"

-- | Handle queries by in turn querying the child components.
handleOrthQuery :: forall a m. Monad m => OrthQuery a -> Hal.HalogenM OrthState OrthAction OrthSlots OrthOptions m (Maybe a)
handleOrthQuery (OrthGetGrubb reply) = do
  rslt <- HQ.query _grubbOptions unit (GetGrubb (\x -> x))
  pure $ reply <$> rslt
handleOrthQuery (OrthGetIPA reply) = do
  rslt <- HQ.query _ipaOptions unit (GetIPA (\x -> x))
  pure $ reply <$> rslt
-- handleOrthQuery (OrthGetGeorgian reply) = do
--   rslt <- HQ.query _georgianOptions unit (GetGeorgian (\x -> x))
--   pure $ reply <$> rslt


