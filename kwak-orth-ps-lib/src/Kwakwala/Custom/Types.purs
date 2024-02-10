module Kwakwala.Custom.Types
  ( class CasableHolder
  , selectMaj
  , selectMin
  , simplifyKey
  , Monocase(..)
  , Duocase(..)
  , AugLetter(..)
  , AugChar(..)
  , OrthographyKey
  , OrthographyKeyP
  , takePhone
  , takePhone'
  , takeChar
  , takeChar'
  ) where

import Prelude

import Kwakwala.Types

import Data.List.Types
import Data.String.NonEmpty

import Data.Maybe

import Data.List.NonEmpty (uncons)

import Data.List as List
import Data.Tuple

-- | Since some alphabets are cased and
-- | other's aren't, this reduces the
-- | need to just list the same letter
-- | twice for monocase alphabets.
class CasableHolder f where
  selectMaj :: forall a. f a -> a
  selectMin :: forall a. f a -> a

data Monocase a = Monocase a
data Duocase  a = Duocase a a

instance monoCasable :: CasableHolder Monocase where
  selectMaj (Monocase x) = x
  selectMin (Monocase x) = x

instance duoCasable  :: CasableHolder Duocase  where
  selectMaj (Duocase _ y) = y
  selectMin (Duocase x _) = x

instance showMonocase :: Show a => Show (Monocase a) where
  show (Monocase x) = show x

instance showDuocase  :: Show a => Show (Duocase  a) where
  show (Duocase x y) = "(" <> show x <> ", " <> show y <> ")"

instance eqMonocase :: Eq a => Eq (Monocase a) where
  eq (Monocase x) (Monocase y) = x == y

instance eqDuocase  :: Eq a => Eq (Duocase  a) where
  eq (Duocase x1 y1) (Duocase x2 y2) = (x1 == x2) && (y1 == y2)

instance ordMonocase :: (Ord a) => Ord (Monocase a) where
  compare (Monocase x) (Monocase y) = compare x y

instance ordDuocase  :: (Ord a) => Ord (Duocase  a) where
  compare (Duocase x1 y1) (Duocase x2 y2) = case (compare x1 x2) of
    EQ -> compare y1 y2
    z  -> z

instance functorMonocase :: Functor Monocase where
  map f (Monocase x) = Monocase (f x)

instance functorDuocase  :: Functor Duocase where
  map f (Duocase x y) = Duocase (f x) (f y)

type OrthographyKey f
  = { charSeq :: NonEmptyList (AugChar f)
    , phonSeq :: NonEmptyList AugLetter
    }

type OrthographyKeyC f
  = { charSeq :: List (AugChar f)
    , phonSeq :: NonEmptyList AugLetter
    }

type OrthographyKeyP f
  = { charSeq :: NonEmptyList (AugChar f)
    , phonSeq :: List AugLetter
    }

simplifyKey :: forall f. OrthographyKey f -> OrthographyKeyP f
simplifyKey x = { charSeq : x.charSeq, phonSeq : toList x.phonSeq }

takePhone :: forall f. OrthographyKey f -> (Tuple AugLetter (OrthographyKeyP f))
takePhone x = Tuple y.head ({charSeq : x.charSeq, phonSeq : y.tail})
  where y = uncons x.phonSeq

takePhone' :: forall f. OrthographyKeyP f -> (Tuple (Maybe AugLetter) (OrthographyKeyP f))
takePhone' x = case (List.uncons x.phonSeq) of
  Nothing  -> Tuple Nothing x
  (Just y) -> Tuple (Just y.head) ({charSeq : x.charSeq, phonSeq : y.tail})

takeChar :: forall f. OrthographyKey f -> (Tuple (AugChar f) (OrthographyKeyC f))
takeChar x = Tuple y.head ({charSeq : y.tail, phonSeq : x.phonSeq})
  where y = uncons x.charSeq

takeChar' :: forall f. OrthographyKeyC f -> (Tuple (Maybe (AugChar f)) (OrthographyKeyC f))
takeChar' x = case (List.uncons x.charSeq) of
  Nothing  -> Tuple Nothing x
  (Just y) -> Tuple (Just y.head) ({charSeq : y.tail, phonSeq : x.phonSeq})

-- | A variant of `KwakLetter` that
-- | has been augmented with matches
-- | for starts of words, ends of words,
-- | and not finished words.
data AugLetter
  = PlainLetter KwakLetter
  | WordStart
  | WordEnd
  | NotWordEnd

instance eqAugLetter :: Eq AugLetter where
  eq (PlainLetter x) (PlainLetter y) = x == y
  eq WordStart  WordStart  = true
  eq WordEnd    WordEnd    = true
  eq NotWordEnd NotWordEnd = true
  eq _ _ = false

instance showAugLetter :: Show AugLetter where
  show (PlainLetter x) = show x
  show WordStart = "^"
  show WordEnd = "$"
  show NotWordEnd = "..."

instance ordAugLetter :: Ord AugLetter where
  compare (PlainLetter x) (PlainLetter y) = compare x y
  compare WordStart WordStart = EQ
  compare WordStart _ = LT
  compare _ WordStart = GT

  compare WordEnd WordEnd = EQ
  compare WordEnd _ = GT
  compare _ WordEnd = LT

  -- Ones involving WordEnd are already covered.
  compare NotWordEnd NotWordEnd = EQ
  compare NotWordEnd _ = GT
  compare _ NotWordEnd = LT

-- | For writing patterns on the
-- | input side.
data AugChar f
  = PlainChar (f Char)
  | CharStart
  | CharEnd
  | NotCharEnd

instance showAugChar :: Show (f Char) => Show (AugChar f) where
  show (PlainChar x) = show x
  show CharStart = "^"
  show CharEnd = "$"
  show NotCharEnd = "..."

instance eqAugChar :: Eq (f Char) => Eq (AugChar f) where
  eq (PlainChar x) (PlainChar y) = x == y
  eq CharStart  CharStart  = true
  eq CharEnd    CharEnd    = true
  eq NotCharEnd NotCharEnd = true
  eq _ _ = false

instance ordAugChar :: Ord (f Char) => Ord (AugChar f) where
  compare (PlainChar x) (PlainChar y) = compare x y
  compare CharStart CharStart = EQ
  compare CharStart _ = LT
  compare _ CharStart = GT

  compare CharEnd CharEnd = EQ
  compare CharEnd _ = GT
  compare _ CharEnd = LT

  -- Ones involving CharEnd are already covered.
  compare NotCharEnd NotCharEnd = EQ
  compare NotCharEnd _ = GT
  compare _ NotCharEnd = LT


