module Test.Words
  ( randomWord
  , randomWords
  , exampleWords
  ) where

import Prelude

import Data.Array.NonEmpty as NEA
import Data.Foldable (intercalate)

import Test.QuickCheck.Gen (elements, Gen, vectorOf)

-- | Pick a number of random words,
-- | and then join them with a space
-- | between words.
randomWords :: Int -> Gen String
randomWords n = do
  wrds <- vectorOf n randomWord
  pure $ intercalate " " wrds

randomWord :: Gen String
randomWord = elements exampleWords

exampleWords :: NEA.NonEmptyArray String
exampleWords = NEA.cons' "abels"
    [ "adlebu"
    , "atl'i"
    , "edlebu"
    , "edlebu'oxh"
    , "edlebu'oxh"
    , "em"
    , "em"
    , "emlem"
    , "emlidzas"
    , "em'xhukw'ena"
    , "be'na'dzi'"
    , "dadapa"
    , "dadats'e'akw"
    , "dagens"
    , "dagens"
    , "da'dagens"
    , "didzu'yu"
    , "digi'lats'i"
    , "di'deganu"
    , "di'xhstanu"
    , "di'yu"
    , "dukhwelaxhden"
    , "dzadzuts'a"
    , "dzekhwa dagens"
    , "dzekhwa ghwilhghwa'ehla"
    , "dzemba"
    , "gawekh'anem"
    , "ga'yas"
    , "gembuts"
    , "gensuxh"
    , "gen'sa'os"
    , "gigalilha'sidzi'"
    , "gukwdzi"
    , "ghadlekw"
    , "ghaghe'o"
    , "ghaghe'o"
    , "ghedzekh"
    , "ghilakas'la"
    , "ghilakas'la"
    , "ghiwas"
    , "ghulali"
    , "ghulali"
    , "ghwa'wina"
    , "ghwelkwsem"
    , "ghwelxsem"
    , "helakas'la"
    , "helakas'la"
    , "helakas'mowesdla"
    , "hem'yats'i"
    , "hem'yats'i"
    , "henxhsolas"
    , "he'madzu"
    , "he'mats'i"
    , "he'mats'ibidu"
    , "he'mats'idzi"
    , "he'me'ehlas"
    , "he'madzu"
    , "ik"
    , "ik"
    , "ik"
    , "ik'a'dzi'"
    , "ix'mas"
    , "ix'mas"
    , "ix'men"
    , "ix'men"
    , "kaxtle'akw kw'exh"
    , "kelwilas"
    , "kwa'lilas"
    , "kwegayu"
    , "kwegayu"
    , "kwehdzats'i"
    , "kwikw"
    , "kwikw"
    , "kwikw"
    , "kwu'si"
    , "kwu'si"
    , "k'adadzu"
    , "k'adayu"
    , "k'ak'adexwsiladzu"
    , "k'awayu"
    , "k'ebayu"
    , "k'i"
    , "k'isen 'wi'wots'ekha"
    , "kw'axde'milh"
    , "kw'axde'milh"
    , "kw'a'as"
    , "kw'a'as"
    , "kw'edayu"
    , "kw'emdzu'yu"
    , "kw'emdzu'yu"
    , "kw'e'ma"
    , "kw'isa"
    , "khabats'i"
    , "khalxha'mina"
    ]


