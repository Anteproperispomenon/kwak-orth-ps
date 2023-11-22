module Kwakwala.Types.Tables
 ( letterToVowel
 , letterToCons
 , vowelToLetter
 , consToLetter
 , tryVowelCL
 , tryVowelCC
 , tryConsCL
 , tryConsCC
 ) where

-- import Prelude

import Data.Maybe(Maybe(..))

import Kwakwala.Types
  ( CasedChar(..)
  , CasedLetter(..)
  , KwakConsonant(..)
  , KwakLetter(..)
  , KwakVowel(..)
  )

tryVowelCL :: CasedLetter -> Maybe KwakVowel
tryVowelCL (Maj x) = letterToVowel x
tryVowelCL (Min x) = letterToVowel x

tryVowelCC :: CasedChar -> Maybe KwakVowel
tryVowelCC (Kwak x) = tryVowelCL x
tryVowelCC _ = Nothing

tryConsCL :: CasedLetter -> Maybe KwakConsonant
tryConsCL (Maj x) = letterToCons x
tryConsCL (Min x) = letterToCons x

tryConsCC :: CasedChar -> Maybe KwakConsonant
tryConsCC (Kwak x) = tryConsCL x
tryConsCC _ = Nothing

vowelToLetter :: KwakVowel -> KwakLetter
vowelToLetter x = case x of
   Av  -> A  -- ^ Open Front Unrounded Vowel
   Ev  -> E  -- ^ Close-Mid Front Unrounded Vowel
   Iv  -> I  -- ^ Close Front Unrounded Vowel
   Ov  -> O  -- ^ Close-Mid Back Rounded Vowel
   Uv  -> U  -- ^ Close Back Rounded Vowel
   AUv -> AU -- ^ Mid Central Vowel / Schwa

letterToVowel :: KwakLetter -> Maybe KwakVowel
letterToVowel x = case x of
   A  -> Just Av  -- ^ Open Front Unrounded Vowel
   E  -> Just Ev  -- ^ Close-Mid Front Unrounded Vowel
   I  -> Just Iv  -- ^ Close Front Unrounded Vowel
   O  -> Just Ov  -- ^ Close-Mid Back Rounded Vowel
   U  -> Just Uv  -- ^ Close Back Rounded Vowel
   AU -> Just AUv -- ^ Mid Central Vowel / Schwa
   _ -> Nothing

letterToCons :: KwakLetter -> Maybe KwakConsonant
letterToCons kwk = case kwk of
   M   -> Just Mc  -- Voiced Bilabial Nasal
   MY  -> Just MYc -- Glottalized Voiced Bilabial Nasal
   N   -> Just Nc  -- Voiced Alveolar Nasal
   NY  -> Just NYc -- Glottalized Voiced Alveolar Nasal
              
   -- Simple Plosives
   P   -> Just Pc  -- Voiceless Bilabial Plosive
   T   -> Just Tc  -- Voiceless Alveolar Plosive
   B   -> Just Bc  -- Voiced Bilabial Plosive
   D   -> Just Dc  -- Voiced Alveolar Plosive
   PY  -> Just PYc -- Ejective Bilabial Plosive
   TY  -> Just TYc -- Ejective Alveolar Plosive
              
   -- Affricates
   TS   -> Just TSc  -- Voiceless Alveolar Affricate
   TL   -> Just TLc  -- Voiceless Alveolar Lateral Affricate
   DZ   -> Just DZc  -- Voiced Alveolar Affricate
   DL   -> Just DLc  -- Voiced Alveolar Lateral Affricate
   TSY  -> Just TSYc -- Ejective Alveolar Affricate
   TLY  -> Just TLYc -- Ejective Alveolar Lateral Affricate
              
   -- Voiceless Fricatives
   S   -> Just Sc  -- Voiceless Alveolar (Sibilant) Fricative
   LH  -> Just LHc -- Voiceless Alveolar Lateral Fricative
         
   -- Approximants
   L   -> Just Lc  -- Voiced Alveolar Approximant
   LY  -> Just LYc -- Glottalized Voiced Alveolar Approximant
   J   -> Just Jc  -- Voiced Palatal Approximant
   JY  -> Just JYc -- Glottalized Voiced Palatal Approximant
              
   -- Velar Plosives
   K    -> Just Kc   -- Voiceless (Palatalized) Velar Plosive
   KW   -> Just KWc  -- Voiceless Labialized Velar Plosive
   G    -> Just Gc   -- Voiced (Palatalized) Velar Plosive
   GW   -> Just GWc  -- Voiced Labialized Velar Plosive
   KY   -> Just KYc  -- Ejective (Palatalized) Velar Plosive
   KWY  -> Just KWYc -- Ejective Labialized Velar Plosive
              
   -- Uvular Plosives
   Q    -> Just Qc   -- Voiceless Uvular Plosive
   QW   -> Just QWc  -- Voiveless Labialized Uvular Plosive
   GU   -> Just GUc  -- Voiced Uvular Plosive
   GUW  -> Just GUWc -- Voiced Labialized Uvular Plosive
   QY   -> Just QYc  -- Ejective Uvular Plosive
   QWY  -> Just QWYc -- Ejective Labialized Uvular Plosive
              
   -- Velar/Uvular Fricatives
   X    -> Just Xc   -- Voiceless (Palatalized) Velar Fricative
   XW   -> Just XWc  -- Voiceless Labialized Velar Fricative
   XU   -> Just XUc  -- Voiceless Uvular Fricative
   XUW  -> Just XUWc -- Voiceless Labialized Uvular Fricative
              
   -- Labial Sounds
   W   -> Just Wc -- Voiced Labial-Velar Approximant
   WY  -> Just WYc -- Glottalized Voiced Labial-Velar Approximant
              
   -- Glottal Sounds
   Y  -> Just Yc -- Voiceless Glottal Plosive
   H  -> Just Hc -- Voiceless Glottal Fricative

   _ -> Nothing

consToLetter :: KwakConsonant -> KwakLetter
consToLetter kwk = case kwk of
   Mc   -> M  -- Voiced Bilabial Nasal
   MYc  -> MY -- Glottalized Voiced Bilabial Nasal
   Nc   -> N  -- Voiced Alveolar Nasal
   NYc  -> NY -- Glottalized Voiced Alveolar Nasal
              
   -- Simple Plosives
   Pc   -> P  -- Voiceless Bilabial Plosive
   Tc   -> T  -- Voiceless Alveolar Plosive
   Bc   -> B  -- Voiced Bilabial Plosive
   Dc   -> D  -- Voiced Alveolar Plosive
   PYc  -> PY -- Ejective Bilabial Plosive
   TYc  -> TY -- Ejective Alveolar Plosive
              
   -- Affricates
   TSc   -> TS  -- Voiceless Alveolar Affricate
   TLc   -> TL  -- Voiceless Alveolar Lateral Affricate
   DZc   -> DZ  -- Voiced Alveolar Affricate
   DLc   -> DL  -- Voiced Alveolar Lateral Affricate
   TSYc  -> TSY -- Ejective Alveolar Affricate
   TLYc  -> TLY -- Ejective Alveolar Lateral Affricate
              
   -- Voiceless Fricatives
   Sc   -> S  -- Voiceless Alveolar (Sibilant) Fricative
   LHc  -> LH -- Voiceless Alveolar Lateral Fricative
         
   -- Approximants
   Lc   -> L  -- Voiced Alveolar Approximant
   LYc  -> LY -- Glottalized Voiced Alveolar Approximant
   Jc   -> J  -- Voiced Palatal Approximant
   JYc  -> JY -- Glottalized Voiced Palatal Approximant
              
   -- Velar Plosives
   Kc    -> K   -- Voiceless (Palatalized) Velar Plosive
   KWc   -> KW  -- Voiceless Labialized Velar Plosive
   Gc    -> G   -- Voiced (Palatalized) Velar Plosive
   GWc   -> GW  -- Voiced Labialized Velar Plosive
   KYc   -> KY  -- Ejective (Palatalized) Velar Plosive
   KWYc  -> KWY -- Ejective Labialized Velar Plosive
              
   -- Uvular Plosives
   Qc    -> Q   -- Voiceless Uvular Plosive
   QWc   -> QW  -- Voiveless Labialized Uvular Plosive
   GUc   -> GU  -- Voiced Uvular Plosive
   GUWc  -> GUW -- Voiced Labialized Uvular Plosive
   QYc   -> QY  -- Ejective Uvular Plosive
   QWYc  -> QWY -- Ejective Labialized Uvular Plosive
              
   -- Velar/Uvular Fricatives
   Xc    -> X   -- Voiceless (Palatalized) Velar Fricative
   XWc   -> XW  -- Voiceless Labialized Velar Fricative
   XUc   -> XU  -- Voiceless Uvular Fricative
   XUWc  -> XUW -- Voiceless Labialized Uvular Fricative
              
   -- Labial Sounds
   Wc   -> W -- Voiced Labial-Velar Approximant
   WYc  -> WY -- Glottalized Voiced Labial-Velar Approximant
              
   -- Glottal Sounds
   Yc  -> Y -- Voiceless Glottal Plosive
   Hc  -> H -- Voiceless Glottal Fricative


