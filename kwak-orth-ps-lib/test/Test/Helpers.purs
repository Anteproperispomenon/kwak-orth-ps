module Test.Helpers
  ( diffString
  , diffString'
  , diffStringDisp
  , shortenToAround
  , replicateChar
  , replicateCodeUnit
  , replicateCodePoint
  , takeLast
  ) where

import Prelude
import Data.String (uncons, null)
import Data.String as String
import Data.String.CodeUnits as CU
import Data.Unfoldable (replicate)
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))

diffString :: Int -> String -> String -> String
diffString idx str1 str2
  | null str1 && null str2 = "Both Strings end at index " <> show idx
  | null str1 = "String 1 ends before String 2 at index " <> show idx
  | null str2 = "String 2 ends before String 1 at index " <> show idx
  | otherwise = case (uncons str1) of
    Nothing -> "Weird error."
    (Just str1uc) -> case (uncons str2) of
      Nothing -> "Weird error."
      (Just str2uc) -> if (str1uc.head == str2uc.head)
        then diffString (idx+1) str1uc.tail str2uc.tail
        else "The two strings differ at index " <> show idx

diffString' :: Int -> String -> String -> Maybe Int
diffString' idx str1 str2
  | null str1 && null str2 = Nothing
  | null str1 = (Just (-1))
  | null str2 = (Just (-2))
  | otherwise = case (uncons str1) of
    Nothing -> (Just (-1))
    (Just str1uc) -> case (uncons str2) of
      Nothing -> (Just (-2))
      (Just str2uc) -> if (str1uc.head == str2uc.head)
        then diffString' (idx+1) str1uc.tail str2uc.tail
        else (Just idx)

diffStringDisp :: Int -> String -> String -> String
diffStringDisp maxSz str1 str2 = case (diffString' 0 str1 str2) of
  Nothing     -> "The two strings match."
  (Just (-1)) -> "The first string is shorter than the second string."
  (Just (-2)) -> "The second string is shorter than the first string."
  (Just pos)  -> case (Tuple (shortenToAround maxSz pos str1) (shortenToAround maxSz pos str2)) of
    (Tuple (Tuple strX posX) (Tuple strY posY)) ->
      "The two strings differ at index " <> (show pos) <> "\n"
        <> replicateChar posX ' ' <> "v\n"
        <> strX <> "\n"
        <> strY <> "\n"
        <> replicateChar posY ' ' <> "^"

shortenToAround :: Int -> Int -> String -> (Tuple String Int)
shortenToAround maxSz pos str
  | maxSz < 21 = shortenToAround'    21 pos (String.length str) 7 str
  | otherwise  = shortenToAround' maxSz pos (String.length str) ((maxSz - 7) / 2) str

shortenToAround' :: Int -> Int -> Int -> Int -> String -> (Tuple String Int)
shortenToAround' maxSz pos len radius str
  | len <= maxSz = (Tuple str pos)
  -- Point is near the end
  | (pos + radius) >= (len - 3) 
  = (Tuple ("..." <> (String.drop (len + 3 - maxSz) str)) (pos-len+maxSz))
  -- Point is near the start
  | (pos - radius) <= 3
  = Tuple ((String.take (maxSz - 3) str) <> "...") pos
  -- Point is far from the ends.
  | otherwise
  = Tuple ("..." <> (String.take (2*radius + 1) (String.drop (pos-radius) str)) <> "...") (3+radius)

-- | Take the last n characters from a string.
-- | If you already have the length calculated,
-- | just use `drop (len - n) str`.
takeLast :: Int -> String -> String
takeLast n str = String.drop (String.length str - n) str

-- The character at `pos` in the original string is
-- now at (pos-(len-drp)) in (takeLast drp str),
-- where len == length str.

-- takeLast (maxSz - 3) == drop (len - (maxSz - 3)) == drop (len + 3 - maxSz)
-- so (pos-(len-(maxSz - 3)))
-- == (pos-(len-maxSz + 3))
-- == (pos-len+maxSz-3)
-- ... but then need to add 3 to account for the ellpisis.
-- == pos-len+maxSz

--         <-radius-> <-radius->
-- xxxxxxxxooooooooooAooooooooooxxxxxxxxxxxxxxxxxxxxxxx
-- drop (pos - radius)
-- pos    == 18
-- radius == 10
-- drop ()
-- ooooooooooAooooooooooxxxxxxxxxxxxxxxxxxxxxxx
-- take (radius*2 + 1 (...))
-- ooooooooooAoooooooooo

replicateChar :: Int -> Char -> String
replicateChar num c = String.fromCodePointArray $ replicate num (String.codePointFromChar c)

replicateCodeUnit :: Int -> Char -> String
replicateCodeUnit num c = CU.fromCharArray $ replicate num c

replicateCodePoint :: Int -> String.CodePoint -> String
replicateCodePoint num cp = String.fromCodePointArray $ replicate num cp

