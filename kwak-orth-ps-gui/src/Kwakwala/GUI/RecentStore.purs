{-|
Module      : Kwakwala.GUI.RecentStore
Description : Queue-Like Data Structure for Recent Items
Copyright   : (c) David Wilson, 2023
License     : BSD-3

-}

-- | This module provides a specialised FIFO `Queue` that
-- | is specifically designed for keeping "recent" items
-- | in memory. It's useful when designing a webpage that
-- | produces data that can be "downloaded" by the user,
-- | but you want to prevent the user from creating too
-- | many data files in memory.
-- |
-- | It works by creating a value that has a callback
-- | that is run on the oldest item when a new item
-- | is inserted into an already full Store. When 
-- | using this structure to store user data, this 
-- | callback is usually a function that deallocates
-- | or revokes the asset in question.

module Kwakwala.GUI.RecentStore
  ( RecentStore
  , RecentStoreP
  , RecentStoreM
  , RecentStoreEff
  , newRecentStoreM
  , newRecentStoreMP
  , addElementM
  , clearStoreM
  ) where

import Prelude

-- import Halogen as Hal
-- import Halogen.Subscription as HS

import Data.CatQueue as CQ
import Data.Maybe (Maybe(..))
import Data.Tuple (fst, snd)

import Data.Traversable (traverse_)

import Effect (Effect)

-- | A `RecentStore` is a collection of objects
-- | with a fixed maximum size. This version is
-- | a generic version that should be able to be
-- | used in signatures for general functions.
type RecentStore a = forall r.
    { storeSize :: Int
    , storeMax  :: Int
    , storeData :: CQ.CatQueue a
    | r
    }

-- | A simple version of a `RecentStore` that
-- | doesn't have any other values.
type RecentStoreP a
  = { storeSize :: Int
    , storeMax  :: Int
    , storeData :: CQ.CatQueue a
    }

-- | A version of `RecentStore` that has a 
-- | callback that is called when an element
-- | is removed from the Store. This is useful
-- | when you store references to other objects
-- | rather than the objects themselves. This
-- | version works for any `Monad`.
type RecentStoreM (m :: Type -> Type) a
  = { storeSize :: Int
    , storeMax  :: Int
    , storeData :: CQ.CatQueue a
    , storeCall :: a -> m Unit
    }

-- | A version of `RecentStore` that has a 
-- | callback that is called when an element
-- | is removed from the Store. This is useful
-- | when you store references to other objects
-- | rather than the objects themselves. This
-- | version is specialized to `Effect`.
type RecentStoreEff a
  = RecentStoreM Effect a

-- | This adds a new element to a `RecentStoreM`
-- | and runs the callback on the item that is
-- | to be removed. Note that this DOES NOT modify
-- | the original `RecentStoreM`; you still need
-- | to modify the original store with the output
-- | value of this function. e.g.
-- |
-- | ```purescript
-- | addElem :: forall m a. Monad m => a -> StateT (RecentStore m a) m Unit
-- | addElem str x = do
-- |   rstore <- get
-- |   nstore <- lift $ addElementM x rstore
-- |   put nstore
-- | ```
-- |
addElementM :: forall m a. (Monad m) => a -> RecentStoreM m a -> m (RecentStoreM m a)
addElementM x rs 
  = if (rs.storeSize >= rs.storeMax)
    then case (CQ.unsnoc rs.storeData) of
      -- This case shouldn't occur.
      Nothing -> pure (rs {storeSize = 1, storeData = (CQ.singleton x)})
      (Just tup) -> do
        nq <- pure $ CQ.cons x (snd tup)
        rs.storeCall (fst tup)
        pure $ rs { storeData = nq }
    else let nq = (CQ.cons x rs.storeData) in pure (rs { storeSize = (rs.storeSize + 1), storeData = nq})

-- | Create a new `RecentStore` using a maximum size
-- | and callback, and return it in the same `Monad`
-- | as the callback action.
newRecentStoreM :: forall m a. (Monad m) => Int -> (a -> m Unit) -> m (RecentStoreM m a)
newRecentStoreM mxSz callback 
  | (mxSz <= 2) = pure {storeSize : 0, storeMax : 2,    storeData : CQ.empty, storeCall : callback}
  | otherwise   = pure {storeSize : 0, storeMax : mxSz, storeData : CQ.empty, storeCall : callback}

-- | Create a new `RecentStore` using a maximum size
-- | and callback, but return it as a pure value.
-- | This can be useful when you are using a 
-- | framework (e.g. Halogen) that requires you
-- | to initalise the state with a pure value.
newRecentStoreMP :: forall m a. (Monad m) => Int -> (a -> m Unit) -> (RecentStoreM m a)
newRecentStoreMP mxSz callback 
  | (mxSz <= 2) = {storeSize : 0, storeMax : 2,    storeData : CQ.empty, storeCall : callback}
  | otherwise   = {storeSize : 0, storeMax : mxSz, storeData : CQ.empty, storeCall : callback}

-- | Run the callback on all elemnts of a
-- | `RecentStoreM`, set the size to 0, and
-- | set the data queue to be empty. Again,
-- | like `addElementM`, you still need to
-- | modify the original store.
-- |
-- | ```purescript
-- | emptyStore :: forall m a. Monad m => StateT (RecentStore m a) m Unit
-- | emptyStore str x = do
-- |   rstore <- get
-- |   nstore <- lift $ clearStore rstore
-- |   put nstore
-- | ```
-- |
-- | However, writing the `RecentStoreM`  back
-- | may not be necessary if you're running this 
-- | function as a cleanup action at the end of
-- | e.g. a `Component`'s lifespan.
clearStoreM :: forall m a. (Monad m) => RecentStoreM m a -> m (RecentStoreM m a)
clearStoreM rs = do
  traverse_ (rs.storeCall) rs.storeData
  pure $ rs {storeSize = 0, storeData = CQ.empty}
