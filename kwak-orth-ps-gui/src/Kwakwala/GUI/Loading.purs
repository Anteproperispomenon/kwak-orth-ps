module Kwakwala.GUI.Loading
  ( getLoader
  , removeElement
  , removeLoader
  )
  where

import Prelude

import Data.Maybe (Maybe(..))
import Effect.Aff (Aff)
import Effect.Class (liftEffect) -- , class MonadEffect
import Halogen.Aff.Util (selectElement)
import Web.DOM.ChildNode (remove)
import Web.DOM.ParentNode (QuerySelector(..))
import Web.HTML (HTMLElement)
import Web.HTML.HTMLElement (toChildNode)

getLoader :: Aff (Maybe HTMLElement)
getLoader = selectElement (QuerySelector ".loader")

-- based partially on
-- https://stackoverflow.com/questions/68279713/clearing-out-all-child-elements-from-a-div-with-purescript
removeElement :: HTMLElement -> Aff Unit
removeElement elm = do
  cnod <- pure $ toChildNode elm
  liftEffect $ remove cnod

removeLoader :: Aff Unit
removeLoader = do
  mldr <- getLoader
  case mldr of
    Nothing -> pure unit
    (Just elm) -> removeElement elm


