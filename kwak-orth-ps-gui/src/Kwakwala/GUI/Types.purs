module Kwakwala.GUI.Types
  ( KwakOutputType(..)
  , KwakInputType(..)
  -- , GrubbOptions
  )
  where

import Prelude

import Kwakwala.Output.Grubb (GrubbOptions)

data KwakOutputType
  = OutGrubb -- GrubbOptions
  | OutNapa
  | OutUmista
  | OutSyllabic

derive instance  eqKwakOutType :: Eq  KwakOutputType
derive instance ordKwakOutType :: Ord KwakOutputType

instance showKwakOut :: Show KwakOutputType where
  show OutGrubb    = "Grubb"
  show OutNapa     = "NAPA"
  show OutUmista   = "U'mista"
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

