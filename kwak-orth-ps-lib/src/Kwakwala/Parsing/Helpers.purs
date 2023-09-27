{-|
Module      : Kwakwala.Parsing.Helpers
Description : Various helper functions for PureScript parsing
Copyright   : (c) David Wilson, 2023
License     : BSD-3

Some helper functions for Parsing in PureScript.
-}

module Kwakwala.Parsing.Helpers
  ( codePoint
  , codePoint'
  , codePointC
  , eqCP
  , isUpperC
  , liftP
  , parsePipe
  , peek
  , peekChar
  , peekCode
  , satisfyC
  , satisfyMaybe
  )
  where

import Control.Apply (lift2)
import Control.Monad.Rec.Class
import Data.Maybe
import Parsing.Combinators
import Prelude

import Control.Alt (alt, (<|>))
import Data.CodePoint.Unicode as Uni
import Data.String.CodePoints (codePointFromChar, CodePoint, singleton)
import Parsing (Parser, ParserT, runParser, fail)
import Parsing.String (char, string, anyChar, satisfy, eof, satisfyCodePoint, anyCodePoint)
import Parsing.String.Basic as Basic

import Kwakwala.Types


peek :: forall m. MonadRec m => ParserT String m (Maybe Char)
peek = (Just <$> lookAhead anyChar) <|> (eof $> Nothing)

peekChar :: forall m. MonadRec m => ParserT String m (Maybe Char)
peekChar = peek

peekCode :: forall m. MonadRec m => ParserT String m (Maybe CodePoint)
peekCode = (Just <$> lookAhead anyCodePoint) <|> (eof $> Nothing)

isUpperC :: Char -> Boolean
isUpperC c = Uni.isUpper (codePointFromChar c)

-- takeWhile1 :: forall m. (Char -> Boolean) -> ParserT String m String
-- takeWhile1 p = Basic.takeWhile1 (p <<< codePointFromChar)

-- | For Parsing 'Escaped' Text
parsePipe :: Parser String CasedChar
parsePipe = Punct <$> ((codePointC '|') `comb1` (Basic.takeWhile1 (\x -> notEq x pip)) `comb2` (codePointC '|'))
    where comb1 = lift2 (consC)
          comb2 = lift2 (snocC)
          pip = codePointFromChar '|'

-- | Consume a character if the next character
-- satisfies a predicate.
satisfyMaybe :: (Char -> Boolean) -> Parser String (Maybe Char)
satisfyMaybe p = (fx <$> peekChar) >>= (maybe (pure Nothing) (\x -> anyChar $> Just x))
    where fx Nothing  = Nothing
          fx (Just x) = if (p x) then (Just x) else Nothing


-- | Lift a predicate over a maybe.
liftP :: forall a. (a -> Boolean) -> (Maybe a) -> Boolean
liftP _ Nothing  = false
liftP p (Just x) = p x

-- | Like `char`, but for `CodePoint`s.
codePoint :: forall m. CodePoint -> ParserT String m CodePoint
codePoint cp = satisfyCodePoint (eq cp)

-- | Like `codePoint`, but uses a `Char` as input,
-- | which is much easier when using literals.
codePoint' :: forall m. Char -> ParserT String m CodePoint
codePoint' c = satisfyCodePoint (\x -> eq (codePointFromChar c) x)

-- | Like `codePoint`, but uses a `Char` as input,
-- | which is much easier when using literals.
-- | This is the same as `codePoint'`, but won't
-- | cause parse errors.
codePointC :: forall m. Char -> ParserT String m CodePoint
codePointC c = satisfyCodePoint (\x -> eq (codePointFromChar c) x)

satisfyC :: forall m. (Char -> Boolean) -> ParserT String m CodePoint
satisfyC p = codePointFromChar <$> satisfy p

consC :: CodePoint -> String -> String
consC c str = (singleton c) <> str

snocC :: String -> CodePoint -> String
snocC str c = str <> (singleton c)

eqCP :: Char -> CodePoint -> Boolean
eqCP chr cp = (codePointFromChar chr) == cp
