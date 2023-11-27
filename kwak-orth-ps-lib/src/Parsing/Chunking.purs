{-|
Module      : Parsing.Chunking
Description : Functions to chunk strings into smaller strings.
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This module is designed to hopefully fix
-- | issues with overflows on parsing. Instead
-- | of parsing a huge `String` all at once,
-- | this module will break down the string
-- | into smaller units that can be parsed
-- | independently.

module Parsing.Chunking 
  ( ChunkifiedString
  , chunkifyString
  , chunkifyText
  , numChunks
  ) where

import Prelude

-- This length just seems to be a wrapper
-- on JavaScript's length function, which
-- apparently runs in constant time.
import Data.Array as Arr
import Data.Array.NonEmpty (NonEmptyArray, fromArray, toArray)
import Data.Array.NonEmpty as NEA
import Data.Foldable (minimum)
import Data.List (List(..))
import Data.List as L
import Data.Maybe (Maybe(..))
import Data.Either (Either(..))
import Data.String.CodeUnits (length)
import Data.String.CodePoints (CodePoint)
import Data.String.CodePoints as S
import Data.String.Pattern (Pattern(..))

-- | Type synonym for the output of `chunkifyString`.
type ChunkifiedString = Either String (List String)

-- | Number of Chunks in a `ChunkifiedString`.
numChunks :: ChunkifiedString -> Int
numChunks (Left _str) = 1
numChunks (Right lst) = L.length lst

-- | A version of `chunkiftString` specialised to
-- | just use spaces and newlines as the break
-- | characters.
chunkifyText :: Int -> Int -> String -> Either String (List String)
chunkifyText mxSz chkSz str = chunkifyString mxSz chkSz ([S.codePointFromChar '\n', S.codePointFromChar ' ']) str

-- | Split a `String` into a list of `String`s, such
-- | that splits are only made at `CodePoint`s
-- | specified by the user. If the string is below
-- | a certain size, the original string is returned,
-- | otherwise, the `String` is split into a `List` of
-- | chunks of maximum* specified size. 
-- | 
-- | Arguments:
-- |   - `maxSize :: Int` : The maximum size of a `String` that's okay to just return.
-- |   - `chunkSize :: Int` : The maximum* size of each Chunk in the output `List` of `String`s.
-- |   - `charArray :: Array CodePoint` : An `Array` of `CodePoint`s that are safe to break on.
-- |   - `string :: String` : The Input `String` to split into Chunks.
-- |
-- | \* If none of the `CodePoint`s in the `charArray` occur 
-- | within the specified chunk size, the function will just
-- | split on the first instance of a character in the 
-- | `charArray` it can find. 
-- Might want to add a minimum chunk size to prevent the 
-- list from growing out of control. Probably not 
-- necessary, but it might be.
-- chunkifyString :: Int -> Int -> (CodePoint -> Boolean) -> String -> Either String (List String)
chunkifyString :: Int -> Int -> (Array CodePoint) -> String -> Either String (List String)
-- chunkifyString _ _ 
chunkifyString mxSz chkSz chrPrd str
  | (length str <= mxSz) = Left str
  | otherwise = case (fromArray chrPrd) of
    Nothing    -> Left str -- fails silently; maybe do something...
    (Just arr) -> Right $ chunkifyString' chkSz arr str

-- (`splitAt` (n+1)) is used because otherwise,
-- splt.before could be empty, and the next iteration
-- of `chunkifyString'` could find the character it
-- 
chunkifyString' :: Int -> (NonEmptyArray CodePoint) -> String -> List String
chunkifyString' chkSz chrPrd str
  | (length str <= chkSz) = L.singleton str
  | otherwise = case (S.lastIndexOf' (patCodePoint $ NEA.head chrPrd) chkSz str) of
    (Just n) -> let splt = S.splitAt (n+1) str in (Cons splt.before (chunkifyString' chkSz chrPrd splt.after))
    Nothing  -> chunkifyString'' chkSz chrPrd (NEA.tail chrPrd) str

chunkifyString'' :: Int -> (NonEmptyArray CodePoint) -> Array CodePoint -> String -> List String
chunkifyString'' chkSz chrPrd arr' str = case (fromArray arr') of
  Nothing    -> chunkifyStringX chkSz chrPrd str
  (Just arr) -> case (S.lastIndexOf' (patCodePoint $ NEA.head arr) chkSz str) of
    (Just n) -> let splt = S.splitAt (n+1) str in (Cons splt.before (chunkifyString' chkSz chrPrd splt.after))
    Nothing  -> chunkifyString'' chkSz chrPrd (NEA.tail arr) str

chunkifyStringX :: Int -> (NonEmptyArray CodePoint) -> String -> List String
chunkifyStringX chkSz arr str = case (findFirstCP (toArray arr) str) of
  (Just n) -> let splt = S.splitAt (n+1) str in (Cons splt.before (chunkifyString' chkSz arr splt.after))
  Nothing  -> L.singleton str -- giving up at this point; there's no way to split up the string.

patCodePoint :: CodePoint -> Pattern
patCodePoint cod = Pattern (S.singleton cod)

-- Might be a lot slower than the version below
-- if the CodePoint Array is REALLY long, but
-- since this function should rarely fire 
-- (unless your chunk size is way too small),
-- that shouldn't be a problem. This is especially
-- true since having a larger CodePoint array 
-- decreases the chance of reaching this function
-- in the first place.
findFirstCP :: (Array CodePoint) -> String -> Maybe Int
findFirstCP [] _ = Nothing
findFirstCP arr str = minimum idxs
  where idxs = Arr.mapMaybe (\cp -> S.indexOf (patCodePoint cp) str) arr

-- TODO: Make it so it splits on the first instance
-- of any CodePoint in the Array, rather than going
-- through the whole array first.
{-
findFirstCP arr str = case (Arr.uncons arr) of
  Nothing    -> Nothing
  (Just xar) -> case (S.indexOf (patCodePoint xar.head) str) of
    Nothing  -> findFirstCP xar.tail str
    (Just x) -> Just x
-}

-- This version didn't work because you can't pattern
-- match directly on arrays (other than empty arrays).
{- findFirstCP [] _ = Nothing
findFirstCP (Cons cp rst) str = case (S.indexOf (patCodePoint cp) str) of
  Nothing  -> findFirstCP rst str
  (Just x) -> Just x
-}
