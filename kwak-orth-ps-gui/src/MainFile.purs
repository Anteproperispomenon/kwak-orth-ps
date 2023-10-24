module MainFile where

import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Class (class MonadEffect)
import Effect.Class.Console (logShow)
import Halogen as Hal
import Halogen.Aff as HA
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)
-- import Type.Proxy (Proxy(..))

import Kwakwala.GUI.Components (convertComp2, ParentAction2(..))

main :: Effect Unit
main = HA.runHalogenAff do
  body <- HA.awaitBody
  runUI convertComp2 (ConvertText2 "") body