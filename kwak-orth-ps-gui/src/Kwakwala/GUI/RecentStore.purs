module Kwakwala.GUI.RecentStore
  ( RecentStore
  , RecentStoreP
  , RecentStoreM
  , RecentStoreEff
  , addElementM
  , newRecentStoreM
  , newRecentStoreMP
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

newRecentStoreM :: forall m a. (Monad m) => Int -> (a -> m Unit) -> m (RecentStoreM m a)
newRecentStoreM mxSz callback 
  | (mxSz <= 2) = pure {storeSize : 0, storeMax : 2,    storeData : CQ.empty, storeCall : callback}
  | otherwise   = pure {storeSize : 0, storeMax : mxSz, storeData : CQ.empty, storeCall : callback}

newRecentStoreMP :: forall m a. (Monad m) => Int -> (a -> m Unit) -> (RecentStoreM m a)
newRecentStoreMP mxSz callback 
  | (mxSz <= 2) = {storeSize : 0, storeMax : 2,    storeData : CQ.empty, storeCall : callback}
  | otherwise   = {storeSize : 0, storeMax : mxSz, storeData : CQ.empty, storeCall : callback}

clearStoreM :: forall m a. (Monad m) => RecentStoreM m a -> m (RecentStoreM m a)
clearStoreM rs = do
  traverse_ (rs.storeCall) rs.storeData
  pure $ rs {storeSize = 0, storeData = CQ.empty}
