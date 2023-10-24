module Kwakwala.GUI.Components.InputFile
  ( InputFileAction(..)
  , InputFileQuery(..)
  , InputFileSlot
  , InputFileX
  , _inputFile
  , handleInputFileAction
  , handleInputFileQuery
  , inputFileComp
  , inputTypes
  )
  where

import Prelude

import Control.Monad.State.Class (get)
import DOM.HTML.Indexed.InputAcceptType (mediaType)
import Data.Array as Arr
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.MediaType (MediaType)
import Data.MediaType.Common (textPlain, textCSV)
import Data.String (null)
import Effect.Aff (attempt)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Exception (message)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties (InputAcceptType)
import Halogen.HTML.Properties as HP
import Kwakwala.GUI.Types (FileData)
import Type.Proxy (Proxy(..))
import Web.File.File as File
import Web.File.FileReader.Aff as FR

--------------------------------
-- Input File Dialog/Box

_inputFile :: Proxy "inputFile"
_inputFile = Proxy

type InputFileX r = {inputFile :: String | r}

type InputFileSlot x = Hal.Slot InputFileQuery FileData x

data InputFileQuery a
  = InputString (FileData -> a)

-- | Because we can only change the text
-- | by uploading a file, there's no real
-- | point to separating sending the input
-- | from changing it.
data InputFileAction
  = ChangeFile File.File
  | Reconvert
  | DoNothing
  -- | ReceiveInput String
  -- | ReceiveError String
  -- = ChangeInput String
  -- x | SendInput

inputFileComp :: forall m. (MonadAff m) => HC.Component InputFileQuery String FileData m
inputFileComp
  = Hal.mkComponent
    { initialState : \x -> {input : x, error : Nothing, ftype : Nothing}
    , render : inputFileGUI
    , eval : HC.mkEval $ HC.defaultEval
      { handleQuery  = handleInputFileQuery
      , handleAction = handleInputFileAction
      }
    }

type InputFileState
  = { input :: String
    , error :: Maybe String
    , ftype :: Maybe MediaType
    }

inputFileGUI :: forall m s. Monad m => InputFileState -> Hal.ComponentHTML InputFileAction s m
inputFileGUI stt
  = Html.div_
      [ Html.p_ [Html.text "Input"]
      , Html.p_ [Html.input [HP.type_ HP.InputFile, HP.accept inputTypes, HP.multiple false, HE.onFileUpload handleUpload]]
      , Html.p_ [Html.textarea [HP.rows 12, HP.cols 100, HP.id "output-box", HP.name "output-box", HP.readOnly true, HP.value stt.input]]
      -- , Html.p_ [Html.textarea [HP.autofocus true, HP.rows 12, HP.cols 100, HP.id "input-box", HP.name "input-box", HP.placeholder "Input Text", HE.onValueInput (\x -> ChangeInput x)]]
      -- , Html.p_ [Html.button [HP.id "convert-button", HP.name "convert-button", HE.onClick (\_ -> SendInput)] [Html.text "Convert"] ]
      , Html.p_ [Html.text "Errors"]
      , Html.p_ [Html.textarea [HP.rows 3, HP.cols 100, HP.id "error-box", HP.name "error-box", HP.readOnly true, HP.value (renderError stt.error)]]
      , Html.p_ [Html.button [HP.id "convert-button", HP.name "convert-button", HE.onClick (\_ -> Reconvert), HP.disabled (null stt.input)] [Html.text "Reconvert"]]
      ]

renderError :: Maybe String -> String
renderError Nothing  = "No Errors"
renderError (Just x) = x

handleUpload :: Array File.File -> InputFileAction
handleUpload xs = case (Arr.head xs) of
  Nothing  -> DoNothing
  (Just x) -> ChangeFile x

inputTypes :: InputAcceptType
inputTypes = (mediaType textPlain) <> (mediaType textCSV)

handleInputFileQuery :: forall a s m. Monad m => InputFileQuery a -> Hal.HalogenM InputFileState InputFileAction s FileData m (Maybe a)
handleInputFileQuery (InputString reply) = do
  stt <- get
  pure $ Just $ reply $ makeFileData stt

handleInputFileAction :: forall m s. (MonadAff m) => InputFileAction -> Hal.HalogenM InputFileState InputFileAction s FileData m Unit 
handleInputFileAction (DoNothing) = pure unit
handleInputFileAction (ChangeFile fl) = do
  -- pure unit
  estr <- liftAff $ attempt $ FR.readAsText $ File.toBlob fl
  ftyp <- pure $ File.type_ fl
  case estr of
    Left err -> do
      stt <- Hal.get
      -- Won't overwrite the previous string
      Hal.put $ stt { error = Just (message err)}
    Right str -> do
      Hal.put { input : str , error : Nothing, ftype : ftyp}
      Hal.raise { fileStr : str, fileTyp : ftyp}
handleInputFileAction Reconvert = do
  str <- Hal.gets _.input
  typ <- Hal.gets _.ftype
  Hal.raise { fileStr : str, fileTyp : typ}

makeFileData :: InputFileState -> FileData
makeFileData stt = { fileStr : stt.input , fileTyp : stt.ftype}

-- handleInputTextAction (ChangeInput str) = do
--   Hal.put str
--   Hal.raise str
-- handleInputTextAction SendInput = do
--   str <- Hal.get
--   Hal.raise str