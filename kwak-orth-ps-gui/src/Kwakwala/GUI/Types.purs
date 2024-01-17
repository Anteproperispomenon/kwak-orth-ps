module Kwakwala.GUI.Types
  ( KwakOutputType(..)
  , KwakInputType(..)
  , AllOrthOptions
  , defAllOrthOptions
  , FileData
  , checkboxC
  , containerC
  -- , tooltipC
  , toolaboveC
  , toolbelowC
  , toolaboveFC
  , toolbelowFC
  , tooltiptextC
  , ConvertState(..)
  , convertStateC
  -- , GrubbOptions
  )
  where

import Prelude

import Data.Maybe (Maybe)
import Data.MediaType (MediaType)
import Kwakwala.Output.Arabic (ArabicOptions, defArabicOptions)
import Kwakwala.Output.Grubb (GrubbOptions, defGrubbOptions)
import Kwakwala.Output.IPA (IPAOptions, defIPAOptions)
import Web.HTML.Common (ClassName(..))

data KwakOutputType
  = OutGrubb -- GrubbOptions
  | OutNapa
  | OutUmista
  | OutIPA
  | OutSyllabic
  | OutArabic

derive instance  eqKwakOutType :: Eq  KwakOutputType
derive instance ordKwakOutType :: Ord KwakOutputType

instance showKwakOut :: Show KwakOutputType where
  show OutGrubb    = "Grubb"
  show OutNapa     = "NAPA"
  show OutUmista   = "U'mista"
  show OutIPA      = "IPA"
  show OutSyllabic = "Syllabic"
  show OutArabic   = "Arabic"

data KwakInputType
  = InGrubb
  | InNapa
  | InUmista
  | InIsland
  | InBoas
  | InArabic

derive instance  eqKwakInType :: Eq  KwakInputType
derive instance ordKwakInType :: Ord KwakInputType

instance showKwakIn :: Show KwakInputType where
  show InGrubb  = "Grubb"
  show InNapa   = "NAPA"
  show InUmista = "U'mista"
  show InBoas   = "Boas"
  show InIsland = "Island"
  show InArabic = "Arabic"

type FileData
  = { fileStr :: String
    , fileTyp :: Maybe MediaType
    }

type AllOrthOptions
  = { grubbOrthOptions :: GrubbOptions
    , ipaOrthOptions :: IPAOptions
    , arabicOrthOptions :: ArabicOptions
    -- , georgianOrthOptions :: GeorgianOptions
    }

defAllOrthOptions :: AllOrthOptions
defAllOrthOptions
  = { grubbOrthOptions : defGrubbOptions
    , ipaOrthOptions : defIPAOptions
    , arabicOrthOptions : defArabicOptions
    -- , georgianOrthOptions : defGeorgianOptions
    }

checkboxC :: ClassName
checkboxC = ClassName "checkbox"

containerC :: ClassName
containerC = ClassName "container"

-- tooltipC :: ClassName
-- tooltipC = ClassName "tooltip"

toolaboveC :: ClassName
toolaboveC = ClassName "tooltip toolabove"

toolbelowC :: ClassName
toolbelowC = ClassName "tooltip toolbelow"

tooltiptextC :: ClassName
tooltiptextC = ClassName "tooltiptext"

toolaboveFC :: ClassName
toolaboveFC = ClassName "tooltip toolabove toolfirst"

toolbelowFC :: ClassName
toolbelowFC = ClassName "tooltip toolbelow toolfirst"

data ConvertState 
  = ConvertReady
  | ConvertProgress
  | ConvertDone
  | ConvertError

derive instance  eqConvertState :: Eq  ConvertState
derive instance ordConvertState :: Ord ConvertState

convertStateC :: ConvertState -> ClassName
convertStateC ConvertReady    = ClassName "cvb convert-ready"
convertStateC ConvertProgress = ClassName "cvb convert-progress"
convertStateC ConvertDone     = ClassName "cvb convert-done"
convertStateC ConvertError    = ClassName "cvb convert-error"