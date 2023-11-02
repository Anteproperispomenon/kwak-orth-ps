module Kwakwala.GUI.Components.OrthOptions
  ( orthComp
  , _orthOptions
  , OrthOptions(..)
  , OrthSlot
  , OrthQuery(..)
  , AllOrthOptions
  , defAllOrthOptions
  ) where


import Kwakwala.GUI.Components.GrubbOptions
import Prelude

import Data.Maybe (Maybe(..))
import Effect.Class (class MonadEffect)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Query as HQ
import Halogen.Query.HalogenM as HM
import Kwakwala.Output.Grubb (GrubbOptions, defGrubbOptions)
import Type.Proxy (Proxy(..))
import Web.HTML.Common (ClassName(..))

--------------------------------
-- Orthography Options Select

_orthOptions :: Proxy "orthOptions"
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
  -- | OrthSetGrubb GrubbOptions a
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

type AllOrthOptions
  = { grubbOrthOptions :: GrubbOptions
    -- , ipaOrthOptions :: IPAOptions
    -- , georgianOrthOptions :: GeorgianOptions
    }

defAllOrthOptions :: AllOrthOptions
defAllOrthOptions
  = { grubbOrthOptions : defGrubbOptions
    -- , ipaOrthOptions : defIPAOrthOptions
    -- , georgianOrthOptions : defGeorgianOrthOptions
    }

type OrthState
  = { orthOpen :: Boolean
    }
  -- = {orthGrubb :: GrubbOptions
    -- , orthIPA :: IPAOptions
    -- , orthGeorgian :: GeorgianOptions
    -- }

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
        , Html.p_ [Html.slot  _grubbOptions unit grubbComp {-orst.orthGrubb-} defGrubbOptions orthRaiseGrubb]
        -- , Html.p_ [Html.txt "IPA Options"]
        -- , Html.p_ [Html.slot  _ipaOptions unit ipaComp defIPAOptions OrthIPAOptions]
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

handleOrthQuery :: forall a m. Monad m => OrthQuery a -> Hal.HalogenM OrthState OrthAction OrthSlots OrthOptions m (Maybe a)
handleOrthQuery (OrthGetGrubb reply) = do
  rslt <- HQ.query _grubbOptions unit (GetGrubb (\x -> x))
  pure $ reply <$> rslt
