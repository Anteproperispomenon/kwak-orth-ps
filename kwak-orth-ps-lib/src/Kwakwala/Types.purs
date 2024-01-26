{-|
Module      : Kwakwala.Sounds
Description : Kwak'wala phonology codes
Copyright   : (c) David Wilson, 2023
License     : BSD-3
-}

-- | This module contains the types that
-- | are used internally to represent 
-- | Kwak'wala phonemes. Note that there
-- | are no stress markers, since most written
-- | Kwak'wala lacks them.
-- | 
-- | Mostly copied from the Haskell version
-- | of kwak-orth.

module Kwakwala.Types
    -- * Types
    ( KwakLetter(..)
    , CasedLetter(..)
    , CasedChar(..)
    , CasedWord(..)
    -- ** Extra Types
    , KwakConsonant(..)
    , KwakVowel(..)
    -- * Functions
    -- ** Capitalisation Helpers
    , makeCase
    , stripCase
    , mapCase
    , isMaj
    , isMin
    , toMin
    , toMaj
    , toMin'
    , toMaj'
    , toMinW
    , toMajW
    -- ** Mapping Functions
    , mapChar
    , mapChar2
    -- ** Predicates
    , isKwkVow
    , isKwkVow'
    , isKwkVow''
    , isSameCaseType
    , isCharLetter
    , isKwakWord
    -- ** Conversion Functions
    , toWordsL
    , toWordsR
    -- ** Other Functions
    , isLetter
    , fromWords
    )
  where

import Prelude
import Data.List (List(..), reverse, (:))
import Data.Maybe (Maybe(..))
import Data.Foldable (intercalate)


-- | The basic type representing sounds in Kwak'wala.
-- | Some conventions:
-- |
-- |  * __Y__ stands in for an apostrophe, and having
-- |  one after a letter indicates glottalisation
-- |  or an ejective consonant.
-- |
-- |  * __U__ after a consonant indicates that it is
-- |  the __U__vular version of that consonant, with
-- |  the exception of voiceless uvular plosives,
-- |  which are represented by __Q__.
-- |
-- |  * Palatalisation of velar consonants is not 
-- |  notated, as is the case with most orthographies.
-- |
-- Note that at the moment, the documentation
-- does not show up on individual constructors.
-- This is because doing it properly results in
-- a large indented block below each constructor,
-- rather than a small line of text next to the
-- constructor, as it would in haddock.
data KwakLetter

   -- Nasal Sounds
   = M  -- ^ Voiced Bilabial Nasal
   | MY -- ^ Glottalized Voiced Bilabial Nasal
   | N  -- ^ Voiced Alveolar Nasal
   | NY -- ^ Glottalized Voiced Alveolar Nasal
              
   -- Simple Plosives
   | P  -- ^ Voiceless Bilabial Plosive
   | T  -- ^ Voiceless Alveolar Plosive
   | B  -- ^ Voiced Bilabial Plosive
   | D  -- ^ Voiced Alveolar Plosive
   | PY -- ^ Ejective Bilabial Plosive
   | TY -- ^ Ejective Alveolar Plosive
              
   -- Affricates
   | TS  -- ^ Voiceless Alveolar Affricate
   | TL  -- ^ Voiceless Alveolar Lateral Affricate
   | DZ  -- ^ Voiced Alveolar Affricate
   | DL  -- ^ Voiced Alveolar Lateral Affricate
   | TSY -- ^ Ejective Alveolar Affricate
   | TLY -- ^ Ejective Alveolar Lateral Affricate
              
   -- Voiceless Fricatives
   | S  -- ^ Voiceless Alveolar (Sibilant) Fricative
   | LH -- ^ Voiceless Alveolar Lateral Fricative
              
   -- Approximants
   | L  -- ^ Voiced Alveolar Approximant
   | LY -- ^ Glottalized Voiced Alveolar Approximant
   | J  -- ^ Voiced Palatal Approximant
   | JY -- ^ Glottalized Voiced Palatal Approximant
              
   -- Velar Plosives
   | K   -- ^ Voiceless (Palatalized) Velar Plosive
   | KW  -- ^ Voiceless Labialized Velar Plosive
   | G   -- ^ Voiced (Palatalized) Velar Plosive
   | GW  -- ^ Voiced Labialized Velar Plosive
   | KY  -- ^ Ejective (Palatalized) Velar Plosive
   | KWY -- ^ Ejective Labialized Velar Plosive
              
   -- Uvular Plosives
   | Q   -- ^ Voiceless Uvular Plosive
   | QW  -- ^ Voiveless Labialized Uvular Plosive
   | GU  -- ^ Voiced Uvular Plosive
   | GUW -- ^ Voiced Labialized Uvular Plosive
   | QY  -- ^ Ejective Uvular Plosive
   | QWY -- ^ Ejective Labialized Uvular Plosive
              
   -- Velar/Uvular Fricatives
   | X   -- ^ Voiceless (Palatalized) Velar Fricative
   | XW  -- ^ Voiceless Labialized Velar Fricative
   | XU  -- ^ Voiceless Uvular Fricative
   | XUW -- ^ Voiceless Labialized Uvular Fricative
              
   -- Labial Sounds
   | W  -- ^ Voiced Labial-Velar Approximant
   | WY -- ^ Glottalized Voiced Labial-Velar Approximant
              
   -- Glottal Sounds
   | Y -- ^ Voiceless Glottal Plosive
   | H -- ^ Voiceless Glottal Fricative
              
   -- Vowels
   | A  -- ^ Open Front Unrounded Vowel
   | E  -- ^ Close-Mid Front Unrounded Vowel
   | I  -- ^ Close Front Unrounded Vowel
   | O  -- ^ Close-Mid Back Rounded Vowel
   | U  -- ^ Close Back Rounded Vowel
   | AU -- ^ Mid Central Vowel / Schwa

-- derive instance showKwakLetter :: Show KwakLetter
derive instance eqKwakLetter   :: Eq KwakLetter
derive instance ordKwakLetter  :: Ord KwakLetter

instance showKwakLetter :: Show KwakLetter where
  -- Nasal Sounds
  show M   = "M"
  show MY  = "M'"
  show N   = "N"
  show NY  = "N'"

  -- Simple Plosives
  show P   = "P"
  show T   = "T"
  show B   = "B"
  show D   = "D"
  show PY  = "P'"
  show TY  = "T'"
  
  -- 
  show TS  = "TS"
  show TL  = "TL"
  show DZ  = "DZ"
  show DL  = "DL"
  show TSY = "TS'"
  show TLY = "TL'"
  
  -- 
  show S   = "S"
  show LH  = "LH"
  
  --
  show L   = "L"
  show LY  = "L'"
  show J   = "J"
  show JY  = "J'"
  
  -- Velars
  show K   = "K"
  show KW  = "KW"
  show G   = "G"
  show GW  = "GW"
  show KY  = "K'"
  show KWY = "KW'"
  
  -- Uvulars
  show Q   = "Q" 
  show QW  = "QW"
  show GU  = "Gu"
  show GUW = "GuW"
  show QY  = "Q'"
  show QWY = "QW'"
   
  -- Velar Fricatives
  show X   = "X"
  show XW  = "XW"
  show XU  = "Xu"
  show XUW = "XuW"
 
  -- Labials
  show W   = "W"
  show WY  = "W'"
  
  -- Glottals
  show Y   = "'"
  show H   = "H"
  
  show A   = "A"
  show E   = "E"
  show I   = "I"
  show O   = "O"
  show U   = "U"
  show AU  = "AU"

-- | A letter/sound together with a capitalisation marker.
-- This is used for text rather than for phonetic transcriptions,
-- since capitalisation conveys some semantic value.
data CasedLetter = Maj KwakLetter    | Min KwakLetter

instance showCasedLetter :: Show CasedLetter where
  show (Maj x) = "Maj:" <> show x
  show (Min x) = show x

derive instance eqCasedLetter :: Eq CasedLetter

-- | Either a cased Kwak'wala letter, or some plaintext (usually punctuation).
data CasedChar = Kwak CasedLetter | Punct String

instance showCasedChar :: Show CasedChar where
  show (Kwak  chr) = show chr
  show (Punct str) = str

derive instance eqCasedChar :: Eq CasedChar

-- | Either a sequence of `CasedLetter`s, or some plaintext (usually punctuation).
data CasedWord = KwakW (List CasedLetter) | PunctW String

instance showCasedWord :: Show CasedWord where
  show (KwakW  wrd) = intercalate " " (map show wrd)
  show (PunctW str) = str

derive instance eqCasedWord :: Eq CasedWord

-- | Use a function to convert some `CasedChar` to `T.Text`,
-- or leave it alone if it's some punctuation.
mapChar :: (CasedLetter -> String) -> CasedChar -> String
mapChar f (Kwak  x) = f x
mapChar _ (Punct x) =   x

-- | A mapping from `CasedChar` to a target type.
mapChar2 :: forall b.
            (String -> b)      -- ^ The mapping over punctuation/plaintext.
         -> (CasedLetter -> b) -- ^ The mapping over `CasedLetter`s.
         -> CasedChar          -- ^ The input.
         -> b                  -- ^ The output value.
mapChar2 _ g (Kwak  x) = g x
mapChar2 f _ (Punct x) = f x

-- | Convert a `KwakLetter` to a `CasedLetter`
-- depending on the value of a `Bool`.
makeCase :: Boolean -> KwakLetter -> CasedLetter
makeCase true  x = Maj x
makeCase false x = Min x

-- | Remove the cased-ness from a `CasedLetter`.
stripCase :: CasedLetter -> KwakLetter
stripCase (Min x) = x
stripCase (Maj x) = x

-- | Convert a `CasedLetter` to another type,
-- using different functions depending on whether
-- the letter is upper or lower case.
mapCase :: forall b. (KwakLetter -> b) -> (KwakLetter -> b) -> CasedLetter -> b
mapCase f _ (Maj x) = f x
mapCase _ g (Min x) = g x

-- | Check whether a `CasedLetter` is upper-case.
isMaj :: CasedLetter -> Boolean
isMaj (Maj _) = true
isMaj (Min _) = false

-- | Check whether a `CasedLetter` is lower-case.
isMin :: CasedLetter -> Boolean
isMin (Min _) = true
isMin (Maj _) = false

-- | Like `toLower` but for `CasedLetter`.
toMin :: CasedLetter -> CasedLetter
toMin (Min x) = (Min x)
toMin (Maj x) = (Min x)

-- | Like `toUpper` but for `CasedLetter`.
toMaj :: CasedLetter -> CasedLetter
toMaj (Min x) = (Maj x)
toMaj (Maj x) = (Maj x)

-- | Like `toLower`/`toMin` but for `CasedChar`.
toMin' :: CasedChar -> CasedChar
toMin' (Kwak x) = Kwak $ toMin x
toMin' z = z

-- | Like `toUpper`/`toMaj` but for `CasedChar`.
toMaj' :: CasedChar -> CasedChar
toMaj' (Kwak x) = Kwak $ toMaj x
toMaj' z = z

-- | Like `toLower`/`toMin` but for `CasedWord`.
toMinW :: CasedWord -> CasedWord
toMinW (KwakW x) = KwakW $ map toMin x
toMinW z = z

-- | Like `toUpper`/`toMaj` but for `CasedWord`.
toMajW :: CasedWord -> CasedWord
toMajW (KwakW x) = KwakW $ map toMaj x
toMajW z = z

-- | Check whether a `KwakLetter` is a vowel.
isKwkVow :: KwakLetter -> Boolean
isKwkVow A  = true
isKwkVow E  = true
isKwkVow I  = true
isKwkVow O  = true
isKwkVow U  = true
isKwkVow AU = true
isKwkVow _  = false

-- | Check whether a `CasedLetter` is a vowel.
isKwkVow' :: CasedLetter -> Boolean
isKwkVow' (Maj x) = isKwkVow x
isKwkVow' (Min x) = isKwkVow x

-- | Check whether a `CasedChar` is a vowel.
isKwkVow'' :: CasedChar -> Boolean
isKwkVow'' (Kwak x) = isKwkVow' x
isKwkVow'' _        = false

-- | Check whether two `CasedChar`s are both
-- letters, or both punctuation.
isSameCaseType :: CasedChar -> CasedChar -> Boolean
isSameCaseType (Kwak _) (Kwak _) = true
isSameCaseType (Punct _) (Punct _) = true
isSameCaseType _ _ = false

-- | Check whether a `CasedChar` is the same
-- letter as a `KwakLetter`, ignoring capitalisation.
isCharLetter :: KwakLetter -> CasedChar -> Boolean
isCharLetter x (Kwak (Min y)) = x == y
isCharLetter x (Kwak (Maj y)) = x == y
isCharLetter _ _              = false

-- | Check whether a `CasedWord` is a word.
isKwakWord :: CasedWord -> Boolean
isKwakWord (KwakW _) = true
isKwakWord _         = false

isLetter :: CasedChar -> Boolean
isLetter (Kwak _) = true
isLetter _ = false

fromWords :: List CasedWord -> List CasedChar
fromWords Nil = Nil
fromWords (Cons (PunctW x) rst) = (Punct x)     : fromWords rst
fromWords (Cons (KwakW  x) rst) = (map Kwak x) <> fromWords rst

-- nullWord :: CasedWord -> Boolean
-- nullWord (KwakW x) = null x
-- nullWord 

---------------------------------------------------------------
-- Converting to `CasedWord`s.

{-
-- From Data.List
takeWhile :: forall a. (a -> Boolean) -> List a -> List a
takeWhile p = go Nil
  where
  go acc (x : xs) | p x = go (x : acc) xs
  go acc _ = reverse acc
-}

takeLetters :: List CasedChar -> Maybe ({chrs :: CasedWord, rst :: (List CasedChar)})
takeLetters Nil = Nothing
takeLetters (Cons (Punct x) lst) = Just {chrs : (PunctW x), rst : lst}
takeLetters lst = go Nil lst
  where
    go acc (Cons (Kwak c) cs) = go (c : acc) cs
    go acc xlst = Just {chrs : (KwakW $ reverse acc), rst : xlst}

-- | Convert a `List` of `CasedChar`s
-- | into a `List` of `CasedWord`s. This
-- | version uses an accumulator; try
-- | both this and `toWordsR` to see which
-- | has better performance.
toWordsL :: List CasedChar -> List CasedWord
toWordsL Nil = Nil
toWordsL lst = go Nil lst
  where
    go acc xlst = case (takeLetters xlst) of
      Nothing -> reverse acc
      (Just rslt) -> go (rslt.chrs : acc) rslt.rst

-- | Convert a `List` of `CasedChar`s
-- | into a `List` of `CasedWord`s. This
-- | version uses structural recursion; try
-- | both this and `toWordsL` to see which
-- | has better performance.
toWordsR :: List CasedChar -> List CasedWord
toWordsR lst = case (takeLetters lst) of
  Nothing -> Nil
  (Just rslt) -> (rslt.chrs) : (toWordsR rslt.rst)

---------------------------------------------------------------
-- Separate Vowels/Consonants

-- | A subset of `KwakLetter`s that only
-- | includes vowels. This is to make
-- | it easier to combine letters into
-- | syllables, since a function with
-- | the signature
-- |
-- | ```purescript
-- | KwakConsonant -> KwakVowel -> String
-- | ```
-- | 
-- | can be written, which greatly 
-- | reduces the number of possibly
-- | matching cases.
data KwakVowel
   = Av  -- ^ Open Front Unrounded Vowel
   | Ev  -- ^ Close-Mid Front Unrounded Vowel
   | Iv  -- ^ Close Front Unrounded Vowel
   | Ov  -- ^ Close-Mid Back Rounded Vowel
   | Uv  -- ^ Close Back Rounded Vowel
   | AUv -- ^ Mid Central Vowel / Schwa

instance showKwakVowel :: Show KwakVowel where
  show Av   = "A"
  show Ev   = "E"
  show Iv   = "I"
  show Ov   = "O"
  show Uv   = "U"
  show AUv  = "AU"

derive instance  eqKwakVowel :: Eq  KwakVowel
derive instance ordKwakVowel :: Ord KwakVowel

-- | A subset of `KwakLetter`s that only
-- | includes consonants. This is to make
-- | it easier to combine letters into
-- | syllables, since a function with
-- | the signature
-- |
-- | ```purescript
-- | KwakConsonant -> KwakVowel -> String
-- | ```
-- | 
-- | can be written. 
data KwakConsonant

   -- Nasal Sounds
   = Mc  -- ^ Voiced Bilabial Nasal
   | MYc -- ^ Glottalized Voiced Bilabial Nasal
   | Nc  -- ^ Voiced Alveolar Nasal
   | NYc -- ^ Glottalized Voiced Alveolar Nasal
              
   -- Simple Plosives
   | Pc  -- ^ Voiceless Bilabial Plosive
   | Tc  -- ^ Voiceless Alveolar Plosive
   | Bc  -- ^ Voiced Bilabial Plosive
   | Dc  -- ^ Voiced Alveolar Plosive
   | PYc -- ^ Ejective Bilabial Plosive
   | TYc -- ^ Ejective Alveolar Plosive
              
   -- Affricates
   | TSc  -- ^ Voiceless Alveolar Affricate
   | TLc  -- ^ Voiceless Alveolar Lateral Affricate
   | DZc  -- ^ Voiced Alveolar Affricate
   | DLc  -- ^ Voiced Alveolar Lateral Affricate
   | TSYc -- ^ Ejective Alveolar Affricate
   | TLYc -- ^ Ejective Alveolar Lateral Affricate
              
   -- Voiceless Fricatives
   | Sc  -- ^ Voiceless Alveolar (Sibilant) Fricative
   | LHc -- ^ Voiceless Alveolar Lateral Fricative
              
   -- Approximants
   | Lc  -- ^ Voiced Alveolar Approximant
   | LYc -- ^ Glottalized Voiced Alveolar Approximant
   | Jc  -- ^ Voiced Palatal Approximant
   | JYc -- ^ Glottalized Voiced Palatal Approximant
              
   -- Velar Plosives
   | Kc   -- ^ Voiceless (Palatalized) Velar Plosive
   | KWc  -- ^ Voiceless Labialized Velar Plosive
   | Gc   -- ^ Voiced (Palatalized) Velar Plosive
   | GWc  -- ^ Voiced Labialized Velar Plosive
   | KYc  -- ^ Ejective (Palatalized) Velar Plosive
   | KWYc -- ^ Ejective Labialized Velar Plosive
              
   -- Uvular Plosives
   | Qc   -- ^ Voiceless Uvular Plosive
   | QWc  -- ^ Voiveless Labialized Uvular Plosive
   | GUc  -- ^ Voiced Uvular Plosive
   | GUWc -- ^ Voiced Labialized Uvular Plosive
   | QYc  -- ^ Ejective Uvular Plosive
   | QWYc -- ^ Ejective Labialized Uvular Plosive
              
   -- Velar/Uvular Fricatives
   | Xc   -- ^ Voiceless (Palatalized) Velar Fricative
   | XWc  -- ^ Voiceless Labialized Velar Fricative
   | XUc  -- ^ Voiceless Uvular Fricative
   | XUWc -- ^ Voiceless Labialized Uvular Fricative
              
   -- Labial Sounds
   | Wc  -- ^ Voiced Labial-Velar Approximant
   | WYc -- ^ Glottalized Voiced Labial-Velar Approximant
              
   -- Glottal Sounds
   | Yc -- ^ Voiceless Glottal Plosive
   | Hc -- ^ Voiceless Glottal Fricative

derive instance  eqKwakConsonant :: Eq  KwakConsonant
derive instance ordKwakConsonant :: Ord KwakConsonant

instance showKwakConsonant :: Show KwakConsonant where
  -- Nasal Sounds
  show Mc   = "M"
  show MYc  = "M'"
  show Nc   = "N"
  show NYc  = "N'"

  -- Simple Plosives
  show Pc   = "P"
  show Tc   = "T"
  show Bc   = "B"
  show Dc   = "D"
  show PYc  = "P'"
  show TYc  = "T'"
  
  -- 
  show TSc  = "TS"
  show TLc  = "TL"
  show DZc  = "DZ"
  show DLc  = "DL"
  show TSYc = "TS'"
  show TLYc = "TL'"
  
  -- 
  show Sc   = "S"
  show LHc  = "LH"
  
  --
  show Lc   = "L"
  show LYc  = "L'"
  show Jc   = "J"
  show JYc  = "J'"
  
  -- Velars
  show Kc   = "K"
  show KWc  = "KW"
  show Gc   = "G"
  show GWc  = "GW"
  show KYc  = "K'"
  show KWYc = "KW'"
  
  -- Uvulars
  show Qc   = "Q" 
  show QWc  = "QW"
  show GUc  = "Gu"
  show GUWc = "GuW"
  show QYc  = "Q'"
  show QWYc = "QW'"
   
  -- Velar Fricatives
  show Xc   = "X"
  show XWc  = "XW"
  show XUc  = "Xu"
  show XUWc = "XuW"
 
  -- Labials
  show Wc   = "W"
  show WYc  = "W'"
  
  -- Glottals
  show Yc   = "'"
  show Hc   = "H"

