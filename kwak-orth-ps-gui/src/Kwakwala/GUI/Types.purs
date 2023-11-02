module Kwakwala.GUI.Types
  ( KwakOutputType(..)
  , KwakInputType(..)
  , AllOrthOptions
  , defAllOrthOptions
  , FileData
  -- , GrubbOptions
  )
  where

import Prelude

import Data.Maybe (Maybe)
import Data.MediaType (MediaType)
import Kwakwala.Output.Grubb (GrubbOptions, defGrubbOptions)
import Kwakwala.Output.IPA   (IPAOptions  , defIPAOptions)

data KwakOutputType
  = OutGrubb -- GrubbOptions
  | OutNapa
  | OutUmista
  | OutIPA
  | OutSyllabic

derive instance  eqKwakOutType :: Eq  KwakOutputType
derive instance ordKwakOutType :: Ord KwakOutputType

instance showKwakOut :: Show KwakOutputType where
  show OutGrubb    = "Grubb"
  show OutNapa     = "NAPA"
  show OutUmista   = "U'mista"
  show OutIPA      = "IPA"
  show OutSyllabic = "Syllabic"

data KwakInputType
  = InGrubb
  | InNapa
  | InUmista
  | InIsland
  | InBoas

derive instance  eqKwakInType :: Eq  KwakInputType
derive instance ordKwakInType :: Ord KwakInputType

instance showKwakIn :: Show KwakInputType where
  show InGrubb  = "Grubb"
  show InNapa   = "NAPA"
  show InUmista = "U'mista"
  show InBoas   = "Boas"
  show InIsland = "Island"

type FileData
  = { fileStr :: String
    , fileTyp :: Maybe MediaType
    }

type AllOrthOptions
  = { grubbOrthOptions :: GrubbOptions
    , ipaOrthOptions :: IPAOptions
    -- , georgianOrthOptions :: GeorgianOptions
    }

defAllOrthOptions :: AllOrthOptions
defAllOrthOptions
  = { grubbOrthOptions : defGrubbOptions
    , ipaOrthOptions : defIPAOptions
    -- , georgianOrthOptions : defGeorgianOptions
    }