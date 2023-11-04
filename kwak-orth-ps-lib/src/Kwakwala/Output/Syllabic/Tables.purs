{-|
Module      : Kwakwala.Output.Syllabic.Tables
Description : Functions for combining phonemes into syllables
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This module is for converting phonemes
-- | into syllables. The structure of a syllable
-- | in this writing system is
-- |
-- | ```
-- | Onset + Coda
-- | ```
-- |
-- | Where the onset is (usually)
-- | a single character representing
-- | a consonant followed by a vowel
-- | (or sometimes just a vowel), and
-- | the coda is zero or more consonants
-- | before the next syllable.

module Kwakwala.Output.Syllabic.Tables
  ( makeVowel
  , mergeLetters
  , letterCoda
  )
  where

-- import Prelude

import Kwakwala.Types (KwakConsonant(..), KwakVowel(..))

-- | Convert a single vowel into
-- | a syllable that starts without
-- | consonant.
makeVowel :: KwakVowel -> String
makeVowel Av  = "ᐊ"
makeVowel Ev  = "ᐈ"
makeVowel Iv  = "ᐉ"
makeVowel Ov  = "ᐃ"
makeVowel Uv  = "ᐁ"
makeVowel AUv = "ᐅ"

-- | Combine a consonant and a vowel
-- | together into a single syllable
-- | (not including the syllable coda).
mergeLetters :: KwakConsonant -> KwakVowel -> String
mergeLetters cns vwl = case cns of
   -- Nasal Sounds
   Mc  -> case vwl of  -- ^ Voiced Bilabial Nasal
     Av  -> "ᘍ"
     Ev  -> "ᘋ"
     Iv  -> "ᘌ"
     Ov  -> "ᘉ"
     Uv  -> "ᘈ"
     AUv -> "ᘊ"
   MYc -> case vwl of  -- ^ Glottalized Voiced Bilabial Nasal
     Av  -> "ᐧᘍ"
     Ev  -> "ᐧᘋ"
     Iv  -> "ᐧᘌ"
     Ov  -> "ᐧᘉ"
     Uv  -> "ᐧᘈ"
     AUv -> "ᐧᘊ"
   Nc  -> case vwl of  -- ^ Voiced Alveolar Nasal
     Av  -> "ᘇ"
     Ev  -> "ᘅ"
     Iv  -> "ᘆ"
     Ov  -> "ᘃ"
     Uv  -> "ᘂ"
     AUv -> "ᘄ"
   NYc -> case vwl of  -- ^ Glottalized Voiced Alveolar Nasal
     Av  -> "ᐧᘇ"
     Ev  -> "ᐧᘅ"
     Iv  -> "ᐧᘆ"
     Ov  -> "ᐧᘃ"
     Uv  -> "ᐧᘂ"
     AUv -> "ᐧᘄ"
              
   -- Simple Plosives
   Pc  -> case vwl of  -- ^ Voiceless Bilabial Plosive
     Av  -> "ᙅ" -- "ᙙ" -- "ᙅ"
     Ev  -> "ᙃ" -- "ᙗ" -- "ᙃ"
     Iv  -> "ᙄ" -- "ᙘ" -- "ᙄ"
     Ov  -> "ᙁ" -- "ᙕ" -- "ᙁ"
     Uv  -> "ᙀ" -- "ᙔ" -- "ᙀ"
     AUv -> "ᙂ" -- "ᙖ" -- "ᙂ"
   Tc  -> case vwl of  -- ^ Voiceless Alveolar Plosive
     Av  -> "ᗡ"
     Ev  -> "ᗟ"
     Iv  -> "ᗠ"
     Ov  -> "ᗝ"
     Uv  -> "ᗜ"
     AUv -> "ᗞ"
   Bc  -> case vwl of  -- ^ Voiced Bilabial Plosive
     Av  -> "ᗭ"
     Ev  -> "ᗫ"
     Iv  -> "ᗬ"
     Ov  -> "ᗩ"
     Uv  -> "ᗨ"
     AUv -> "ᗪ"
   Dc  -> case vwl of  -- ^ Voiced Alveolar Plosive
     Av  -> "ᑕ"
     Ev  -> "ᑓ"
     Iv  -> "ᑔ"
     Ov  -> "ᑎ"
     Uv  -> "ᑌ"
     AUv -> "ᑐ"
   PYc -> case vwl of  -- ^ Ejective Bilabial Plosive
     Av  -> "ᙍ" -- "ᙠ"
     Ev  -> "ᙋ" -- "ᙞ"
     Iv  -> "ᙌ" -- "ᙟ"
     Ov  -> "ᙉ" -- "ᙜ"
     Uv  -> "ᙈ" -- "ᙛ"
     AUv -> "ᙊ" -- "ᙝ"
   TYc -> case vwl of  -- ^ Ejective Alveolar Plosive
     Av  -> "ᗧ"
     Ev  -> "ᗥ"
     Iv  -> "ᗦ"
     Ov  -> "ᗣ"
     Uv  -> "ᗢ"
     AUv -> "ᗤ"
              
   -- Affricates
   TSc  -> case vwl of -- ^ Voiceless Alveolar Affricate
     Av  -> "ᙦ"
     Ev  -> "ᙤ"
     Iv  -> "ᙥ"
     Ov  -> "ᙢ"
     Uv  -> "ᙡ"
     AUv -> "ᙣ"
   TLc  -> case vwl of -- ^ Voiceless Alveolar Lateral Affricate
     Av  -> "ᘹ"
     Ev  -> "ᘷ"
     Iv  -> "ᘸ"
     Ov  -> "ᘵ"
     Uv  -> "ᘴ"
     AUv -> "ᘶ"
   DZc  -> case vwl of -- ^ Voiced Alveolar Affricate
     Av  -> "ᙙ" -- "ᙍ"
     Ev  -> "ᙗ" -- "ᙋ"
     Iv  -> "ᙘ" -- "ᙌ"
     Ov  -> "ᙕ" -- "ᙉ"
     Uv  -> "ᙔ" -- "ᙈ"
     AUv -> "ᙖ" -- "ᙊ"
   DLc  -> case vwl of -- ^ Voiced Alveolar Lateral Affricate
     Av  -> "ᘭ"
     Ev  -> "ᘫ"
     Iv  -> "ᘬ"
     Ov  -> "ᘩ"
     Uv  -> "ᘨ"
     AUv -> "ᘪ"
   TSYc -> case vwl of -- ^ Ejective Alveolar Affricate
     Av  -> "ᙬ"
     Ev  -> "ᙪ"
     Iv  -> "ᙫ"
     Ov  -> "ᙨ"
     Uv  -> "ᙧ"
     AUv -> "ᙩ"
   TLYc -> case vwl of -- ^ Ejective Alveolar Lateral Affricate
     Av  -> "ᘿ"
     Ev  -> "ᘽ"
     Iv  -> "ᘾ"
     Ov  -> "ᘻ"
     Uv  -> "ᘺ"
     AUv -> "ᘼ"
              
   -- Voiceless Fricatives
   Sc  -> case vwl of -- ^ Voiceless Alveolar (Sibilant) Fricative
     Av  -> "ᙓ"
     Ev  -> "ᙑ"
     Iv  -> "ᙒ"
     Ov  -> "ᙏ"
     Uv  -> "ᙎ"
     AUv -> "ᙐ"
   LHc -> case vwl of -- ^ Voiceless Alveolar Lateral Fricative
     Av  -> "ᘳ"
     Ev  -> "ᘱ"
     Iv  -> "ᘲ"
     Ov  -> "ᘯ"
     Uv  -> "ᘮ"
     AUv -> "ᘰ"
              
   -- Approximants
   Lc  -> case vwl of -- ^ Voiced Alveolar Approximant
     Av  -> "ᘧ"
     Ev  -> "ᘥ"
     Iv  -> "ᘦ"
     Ov  -> "ᘣ"
     Uv  -> "ᘢ"
     AUv -> "ᘤ"
   LYc -> case vwl of -- ^ Glottalized Voiced Alveolar Approximant
     Av  -> "ᐧᘧ"
     Ev  -> "ᐧᘥ"
     Iv  -> "ᐧᘦ"
     Ov  -> "ᐧᘣ"
     Uv  -> "ᐧᘢ"
     AUv -> "ᐧᘤ"
   Jc  -> case vwl of -- ^ Voiced Palatal Approximant
     Av  -> "ᘓ"
     Ev  -> "ᘑ"
     Iv  -> "ᘒ"
     Ov  -> "ᘏ"
     Uv  -> "ᘎ"
     AUv -> "ᘐ"
   JYc -> case vwl of -- ^ Glottalized Voiced Palatal Approximant
     Av  -> "ᐧᘓ"
     Ev  -> "ᐧᘑ"
     Iv  -> "ᐧᘒ"
     Ov  -> "ᐧᘏ"
     Uv  -> "ᐧᘎ"
     AUv -> "ᐧᘐ"
              
   -- Velar Plosives
   Kc   -> case vwl of -- ^ Voiceless (Palatalized) Velar Plosive
     Av  -> "ᗺ"
     Ev  -> "ᗸ"
     Iv  -> "ᗹ"
     Ov  -> "ᗶ"
     Uv  -> "ᗵ"
     AUv -> "ᗷ"
   KWc  -> case vwl of -- ^ Voiceless Labialized Velar Plosive
     Av  -> "ᗺᐤ"
     Ev  -> "ᗸᐤ"
     Iv  -> "ᗹᐤ"
     Ov  -> "ᗶᐤ"
     Uv  -> "ᗵᐤ"
     AUv -> "ᗷᐤ"
   Gc   -> case vwl of -- ^ Voiced (Palatalized) Velar Plosive
     Av  -> "ᗴ"
     Ev  -> "ᗲ"
     Iv  -> "ᗳ"
     Ov  -> "ᗰ"
     Uv  -> "ᗯ"
     AUv -> "ᗱ"
   GWc  -> case vwl of -- ^ Voiced Labialized Velar Plosive
     Av  -> "ᗴᐤ" -- "ᐟᗕ"
     Ev  -> "ᗲᐤ" -- "ᐟᗓ"
     Iv  -> "ᗳᐤ" -- "ᐟᗔ"
     Ov  -> "ᗰᐤ" -- "ᐟᗑ"
     Uv  -> "ᗯᐤ" -- "ᐟᗐ"
     AUv -> "ᗱᐤ" -- "ᐟᗒ"
   KYc  -> case vwl of -- ^ Ejective (Palatalized) Velar Plosive
     Av  -> "ᘀ"
     Ev  -> "ᗾ"
     Iv  -> "ᗿ"
     Ov  -> "ᗼ"
     Uv  -> "ᗻ"
     AUv -> "ᗽ"
   KWYc -> case vwl of -- ^ Ejective Labialized Velar Plosive
     Av  -> "ᘀᐤ" -- "ᘁᗕ"
     Ev  -> "ᗾᐤ" -- "ᘁᗓ"
     Iv  -> "ᗿᐤ" -- "ᘁᗔ"
     Ov  -> "ᗼᐤ" -- "ᘁᗑ"
     Uv  -> "ᗻᐤ" -- "ᘁᗐ"
     AUv -> "ᗽᐤ" -- "ᘁᗒ"
              
   -- Uvular Plosives
   -- Note: Substituting J for Q
   Qc   -> case vwl of -- ^ Voiceless Uvular Plosive
     Av  -> "ᘛ"
     Ev  -> "ᘘ"
     Iv  -> "ᘙ"
     Ov  -> "ᘖ"
     Uv  -> "ᘔ"
     AUv -> "ᘗ"
   QWc  -> case vwl of -- ^ Voiveless Labialized Uvular Plosive
     Av  -> "ᘛᐤ" -- "ᒽᗕ"
     Ev  -> "ᘘᐤ" -- "ᒽᗓ"
     Iv  -> "ᘙᐤ" -- "ᒽᗔ"
     Ov  -> "ᘖᐤ" -- "ᒽᗑ"
     Uv  -> "ᘔᐤ" -- "ᒽᗐ"
     AUv -> "ᘗᐤ" -- "ᒽᗒ"
   GUc  -> case vwl of -- ^ Voiced Uvular Plosive
     Av  -> "ᗏ"
     Ev  -> "ᗍ"
     Iv  -> "ᗎ"
     Ov  -> "ᗋ"
     Uv  -> "ᗊ"
     AUv -> "ᗌ"
   GUWc -> case vwl of -- ^ Voiced Labialized Uvular Plosive
     Av  -> "ᗏᐤ"
     Ev  -> "ᗍᐤ"
     Iv  -> "ᗎᐤ"
     Ov  -> "ᗋᐤ"
     Uv  -> "ᗊᐤ"
     AUv -> "ᗌᐤ"
   QYc  -> case vwl of -- ^ Ejective Uvular Plosive
     Av  -> "ᘡ"
     Ev  -> "ᘟ"
     Iv  -> "ᘠ"
     Ov  -> "ᘝ"
     Uv  -> "ᘜ"
     AUv -> "ᘞ"
   QWYc -> case vwl of -- ^ Ejective Labialized Uvular Plosive
     Av  -> "ᘡᐤ"
     Ev  -> "ᘟᐤ"
     Iv  -> "ᘠᐤ"
     Ov  -> "ᘝᐤ"
     Uv  -> "ᘜᐤ"
     AUv -> "ᘞᐤ"
              
   -- Velar/Uvular Fricatives
   -- ᗄ ᗅ ᗆ ᗇ ᗈ ᗉ
   Xc   -> case vwl of -- ^ Voiceless (Palatalized) Velar Fricative
     Av  -> "ᗉ"
     Ev  -> "ᗇ"
     Iv  -> "ᗈ"
     Ov  -> "ᗅ"
     Uv  -> "ᗄ"
     AUv -> "ᗆ"
   XWc  -> case vwl of -- ^ Voiceless Labialized Velar Fricative
     Av  -> "ᗉᐤ"
     Ev  -> "ᗇᐤ"
     Iv  -> "ᗈᐤ"
     Ov  -> "ᗅᐤ"
     Uv  -> "ᗄᐤ"
     AUv -> "ᗆᐤ"
   XUc  -> case vwl of -- ^ Voiceless Uvular Fricative
     Av  -> "ᗛ"
     Ev  -> "ᗙ"
     Iv  -> "ᗚ"
     Ov  -> "ᗗ"
     Uv  -> "ᗖ"
     AUv -> "ᗘ"
   XUWc -> case vwl of -- ^ Voiceless Labialized Uvular Fricative
     Av  -> "ᗛᐤ"
     Ev  -> "ᗙᐤ"
     Iv  -> "ᗚᐤ"
     Ov  -> "ᗗᐤ"
     Uv  -> "ᗖᐤ"
     AUv -> "ᗘᐤ"
              
   -- Labial Sounds
   Wc  -> case vwl of -- ^ Voiced Labial-Velar Approximant
     Av  -> "ᗕ"
     Ev  -> "ᗓ"
     Iv  -> "ᗔ"
     Ov  -> "ᗑ"
     Uv  -> "ᗐ"
     AUv -> "ᗒ"
   WYc -> case vwl of -- ^ Glottalized Voiced Labial-Velar Approximant
     Av  -> "ᐧᗕ"
     Ev  -> "ᐧᗓ"
     Iv  -> "ᐧᗔ"
     Ov  -> "ᐧᗑ"
     Uv  -> "ᐧᗐ"
     AUv -> "ᐧᗒ"
              
   -- Glottal Sounds
   Yc -> case vwl of -- ^ Voiceless Glottal Plosive
     Av  -> "ᐧᐊ"
     Ev  -> "ᐧᐈ"
     Iv  -> "ᐧᐉ"
     Ov  -> "ᐧᐃ"
     Uv  -> "ᐧᐁ"
     AUv -> "ᐧᐅ"
   Hc -> case vwl of -- ^ Voiceless Glottal Fricative
     Av  -> "ᐸ"
     Ev  -> "ᐶ"
     Iv  -> "ᐷ"
     Ov  -> "ᐱ"
     Uv  -> "ᐯ"
     AUv -> "ᐳ"

-- | Get the version of a consonant
-- | used at the end of a syllable
-- | or word.
letterCoda :: KwakConsonant -> String
letterCoda kwc = case kwc of
   Mc   -> "ᑦ"  -- Voiced Bilabial Nasal
   MYc  -> "ᐧᑦ" -- Glottalized Voiced Bilabial Nasal
   Nc   -> "ᐣ"  -- Voiced Alveolar Nasal
   NYc  -> "ᐧᐣ" -- Glottalized Voiced Alveolar Nasal
              
   -- Simple Plosives
   Pc   -> "ᗮᗮ"  -- Voiceless Bilabial Plosive
   Tc   -> "ᐪᐪ"  -- Voiceless Alveolar Plosive
   Bc   -> "ᗮ"  -- Voiced Bilabial Plosive
   Dc   -> "ᐪ"  -- Voiced Alveolar Plosive
   PYc  -> "ᐩ" -- Ejective Bilabial Plosive
   TYc  -> "ᙾ" -- Ejective Alveolar Plosive
              
   -- Affricates
   TSc   -> "ᙆᙆ"  -- Voiceless Alveolar Affricate
   TLc   -> "ᔾ"  -- Voiceless Alveolar Lateral Affricate
   DZc   -> "ᙆ"  -- Voiced Alveolar Affricate
   DLc   -> "ᕐ"  -- Voiced Alveolar Lateral Affricate
   TSYc  -> "ᙇ" -- Ejective Alveolar Affricate
   TLYc  -> "ᓫ" -- Ejective Alveolar Lateral Affricate
              
   -- Voiceless Fricatives
   Sc   -> "ᔆ"  -- Voiceless Alveolar (Sibilant) Fricative
   LHc  -> "ᒡ"  -- Voiceless Alveolar Lateral Fricative
         
   -- Approximants
   Lc   -> "ᑊ"  -- Voiced Alveolar Approximant
   LYc  -> "ᐧᑊ" -- Glottalized Voiced Alveolar Approximant
   Jc   -> "ᕪ"  -- Voiced Palatal Approximant
   JYc  -> "ᐧᕪ" -- Glottalized Voiced Palatal Approximant
              
   -- Velar Plosives
   Kc    -> "ᐠ"   -- Voiceless (Palatalized) Velar Plosive
   KWc   -> "ᐠᐤ"  -- Voiceless Labialized Velar Plosive
   Gc    -> "ᐜ"  -- Voiced (Palatalized) Velar Plosive
   GWc   -> "ᐜᐤ" -- Voiced Labialized Velar Plosive
   KYc   -> "ᘁ"  -- Ejective (Palatalized) Velar Plosive
   KWYc  -> "ᘁᐤ" -- Ejective Labialized Velar Plosive
              
   -- Uvular Plosives
   Qc    -> "ᒽ"   -- Voiceless Uvular Plosive
   QWc   -> "ᒽᐤ"  -- Voiveless Labialized Uvular Plosive
   GUc   -> "ᐟ"  -- Voiced Uvular Plosive
   GUWc  -> "ᐟᐤ" -- Voiced Labialized Uvular Plosive
   QYc   -> "ᒾ"  -- Ejective Uvular Plosive
   QWYc  -> "ᒾᐤ" -- Ejective Labialized Uvular Plosive
              
   -- Velar/Uvular Fricatives
   Xc    -> "ᐥ"   -- Voiceless (Palatalized) Velar Fricative
   XWc   -> "ᐥ"  -- Voiceless Labialized Velar Fricative
   XUc   -> "ᐦ"  -- Voiceless Uvular Fricative
   XUWc  -> "ᐦ" -- Voiceless Labialized Uvular Fricative
              
   -- Labial Sounds
   Wc    -> "ᐞ" -- Voiced Labial-Velar Approximant
   WYc   -> "ᐧᐞ" -- Glottalized Voiced Labial-Velar Approximant
              
   -- Glottal Sounds
   Yc    -> "ᐧ" -- Voiceless Glottal Plosive
   Hc    -> "ᑋ" -- Voiceless Glottal Fricative


{-

Vowel Conversion
A  -> A
E  -> E
I  -> I
O  -> O
OO -> U
U  -> AU (Schwa)

Consonant Conversion

Glottal Stop -> Glottal Stop
H -> H

J   (tʃ)  -> Q
CH' (tʃʼ) -> Q'

-}

