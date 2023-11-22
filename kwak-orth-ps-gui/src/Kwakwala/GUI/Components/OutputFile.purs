module Kwakwala.GUI.Components.OutputFile
  ( outputFileComp
  , _outputFile
  , OutputFileSlot
  , OutputFileQuery(..)
  ) where

import Prelude

import Kwakwala.GUI.Types (FileData)

import Control.Monad.State.Class (get)
import DOM.HTML.Indexed.InputAcceptType (mediaType)
-- import Data.Array as Arr
-- import Data.Array ((:))
-- import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.MediaType (MediaType)
import Data.MediaType.Common (textPlain) -- , textCSV)
import Data.String (null)
-- import Data.Unfoldable
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Aff (attempt)
import Effect.Aff.Class (class MonadAff) -- , liftAff)
import Halogen as Hal
import Halogen.Component as HC
import Halogen.HTML as Html
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties (InputAcceptType)
import Halogen.HTML.Properties as HP
import Type.Proxy (Proxy(..))
import Web.File.File as File
import Web.File.Blob as Blob
import Web.File.FileReader.Aff as FR
import Web.File.Url (createObjectURL)
import Web.HTML.Common (ClassName(..))

import Effect.Exception (message)

--------------------------------
-- Input Text Box

_outputFile :: Proxy "outputFile"
_outputFile = Proxy

type OutputFileX r = {outputFile :: String | r}

type OutputFileSlot x = Hal.Slot OutputFileQuery Void x

data OutputFileQuery a
  = ReceiveFileData FileData (String -> a)

type OutputFileAction = Unit
-- data OutputFileAction
--   = ChangeFile File.File
--   | Reconvert
--   | DoNothing

-- The URL to download.
type OutputFileState
  = { ofUrl :: String
    , ofTyp :: MediaType
    }

outputFileComp :: forall m. (MonadAff m) => HC.Component OutputFileQuery FileData Void m
outputFileComp
  = Hal.mkComponent
    { initialState : \_ -> {ofUrl : "", ofTyp : textPlain}
    , render : outputFileGUI
    , eval : HC.mkEval $ HC.defaultEval
      { handleQuery  = handleOutputFileQuery
      , handleAction = handleOutputFileAction
      }
    }

outputFileGUI :: forall m s. Monad m => OutputFileState -> Hal.ComponentHTML OutputFileAction s m
outputFileGUI stt
  = Html.div_
      [ Html.p_ 
        [Html.a
          [ HP.href stt.ofUrl
          , HP.download "output_text"
          , HP.type_ stt.ofTyp
          , HP.target "_blank"
          , HP.class_ (linkClass (null stt.ofUrl))
          ]
          [Html.text "Download"]]
      -- , Html.p_ [Html.text "Input"]
      -- , Html.p_ [Html.input [HP.type_ HP.InputFile, HP.accept inputTypes, HP.multiple false, HE.onFileUpload handleUpload]]
      -- , Html.p_ [Html.textarea [HP.rows 12, HP.cols 100, HP.id "output-box", HP.name "output-box", HP.readOnly true, HP.value stt.input]]
      -- , Html.p_ [Html.textarea [HP.autofocus true, HP.rows 12, HP.cols 100, HP.id "input-box", HP.name "input-box", HP.placeholder "Input Text", HE.onValueInput (\x -> ChangeInput x)]]
      -- , Html.p_ [Html.button [HP.id "convert-button", HP.name "convert-button", HE.onClick (\_ -> SendInput)] [Html.text "Convert"] ]
      -- , Html.p_ [Html.text "Errors"]
      -- , Html.p_ [Html.textarea [HP.rows 3, HP.cols 100, HP.id "error-box", HP.name "error-box", HP.readOnly true, HP.value (renderError stt.error)]]
      -- , Html.p_ [Html.button [HP.id "convert-button", HP.name "convert-button", HE.onClick (\_ -> Reconvert), HP.disabled (null stt.input)] [Html.text "Reconvert"]]
      ]

createBlob :: FileData -> Blob.Blob
createBlob fd = Blob.fromString fd.fileStr (fdType fd)

linkClass :: Boolean -> ClassName
linkClass true  = ClassName "no-link"
linkClass false = ClassName "down-link"

fdType :: FileData -> MediaType
fdType fd = case fd.fileTyp of
  Nothing  -> textPlain
  (Just x) -> x

handleOutputFileQuery :: forall a s m. MonadEffect m => OutputFileQuery a -> Hal.HalogenM OutputFileState OutputFileAction s Void m (Maybe a)
handleOutputFileQuery (ReceiveFileData fdat reply) = do
  ftp <- pure $ fdType fdat
  blb <- pure $ Blob.fromString fdat.fileStr ftp
  str <- liftEffect $ createObjectURL blb
  Hal.put { ofUrl : str , ofTyp : ftp }
  pure $ Just (reply str)

handleOutputFileAction :: forall m s. (MonadAff m) => OutputFileAction -> Hal.HalogenM OutputFileState OutputFileAction s Void m Unit 
handleOutputFileAction _ = pure unit
-- handleInputFileAction (DoNothing) = pure unit
{-
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
-}