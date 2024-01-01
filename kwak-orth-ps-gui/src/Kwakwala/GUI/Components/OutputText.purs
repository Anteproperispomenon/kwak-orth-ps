module Kwakwala.GUI.Components.OutputText
  ( outputTextComp
  , _outputText
  , OutputTextSlot
  , OutputTextQuery(..)
  ) where

import Prelude

import Data.Maybe (Maybe(..))
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Properties as HP
import Type.Proxy (Proxy(..))
import Web.HTML.Common (ClassName(..))

--------------------------------
-- Output Text Box

_outputText :: Proxy "outputText"
_outputText = Proxy

type OutputTextX r = {outputText :: String | r}

type OutputTextSlot x = Hal.Slot OutputTextQuery Void x

type OutputTextState
  = { otString :: String
    , otStyle  :: String
    }

data OutputTextQuery a
  = OutputString String a
  | GetOutputString (String -> a)
  | SetOutputStyle String a

-- outputTextComp :: forall m r. (MonadState (OutputTextX r) m) => HC.Component OutputTextQuery String String m
outputTextComp :: forall m. (Monad m) => HC.Component OutputTextQuery String Void m
outputTextComp
  = Hal.mkComponent
    { initialState : \str -> { otString : str, otStyle : "default-out"}
    , render : outputTextGUI
    , eval : HC.mkEval $ HC.defaultEval
       { handleAction = handleOutputAction
       , handleQuery = handleOutputTextQuery
       -- , receive = (\str -> Just str) -- Don't do this if the parent doesn't store the output string.
       } -- {handleAction = lift <<< }
    }

handleOutputAction :: forall (m :: Type -> Type) s out. Monad m => String -> Hal.HalogenM OutputTextState String s out m Unit
handleOutputAction str = Hal.modify_ $ \st -> st {otString = str}

-- handleOutputTextQuery :: forall m r s a. (MonadState (OutputTextX r) m) => OutputTextQuery a -> Hal.HalogenM String _ s _ m (Maybe a)
handleOutputTextQuery :: forall m s a out. (Monad m) => OutputTextQuery a -> Hal.HalogenM OutputTextState String s out m (Maybe a)
handleOutputTextQuery (OutputString str x) = do
  Hal.modify_ $ \st -> st {otString = str}
  pure (Just x)
handleOutputTextQuery (GetOutputString reply) = Just <<< reply <$> Hal.gets _.otString
  -- str <- Hal.get
  -- pure $ Just (reply str)
handleOutputTextQuery (SetOutputStyle sty x) = do
  Hal.modify_ $ \st -> st {otStyle = sty}
  pure (Just x)


-- outputTextGUI :: forall m r. MonadState (OutputTextX r) m => String -> Hal.ComponentHTML String _ m
outputTextGUI :: forall m s. Monad m => OutputTextState -> Hal.ComponentHTML String s m
outputTextGUI st
  = Html.div_
      [ Html.p_ [Html.text "Output"]
      , Html.p_ [Html.textarea 
        [ HP.rows 12
        , HP.cols 100
        , HP.class_ (ClassName st.otStyle)
        , HP.id "output-box"
        , HP.name "output-box"
        , HP.readOnly true
        , HP.value st.otString
        ]]
      ]
