import { hashKey } from '@tanstack/query-core';

/*
 * This file defines general, abstract utils and for tracking cache state.
 * Each config-specific store should rely on this to set up its own local cache.
 */

// Each distinct config (as identified by its fetchParams) will be in one of these states.
// This represents *presence*: other values below track freshness and updates.
const CACHED_VALUE__NONE = 0;
const CACHED_VALUE__IS_BACKUP = 1;
const CACHED_VALUE__IS_REMOTE = 2;

const CACHE_FRESHNESS__NONE = 0;
const CACHE_FRESHNESS__STALE = 1;
const CACHE_FRESHNESS__FRESH = 2;

type CacheValueStatus =
  | typeof CACHED_VALUE__NONE
  | typeof CACHED_VALUE__IS_BACKUP
  | typeof CACHED_VALUE__IS_REMOTE;
type CacheValueFreshness =
  | typeof CACHE_FRESHNESS__NONE
  | typeof CACHE_FRESHNESS__STALE
  | typeof CACHE_FRESHNESS__FRESH;

type CacheState<FetchParamsType, ValueType> = {
  backupPromise: Promise<ValueType> | null;
  remotePromise: Promise<ValueType> | null;
  // @TODO: Track errors: result, retryCount, timing
  fetchParams: FetchParamsType;
  remoteUrl: URL;
} & (
  | {
      valueStatus: typeof CACHED_VALUE__NONE;
      freshnessStatus: typeof CACHE_FRESHNESS__NONE;
      value: null;
      lastUpdatedAt: 0;
    }
  | {
      valueStatus: Omit<CacheValueStatus, typeof CACHED_VALUE__NONE>;
      freshnessStatus: CacheValueFreshness;
      value: ValueType;
      lastUpdatedAt: number;
    }
);

interface CacheStateContainer<FetchParamsType, ValueType> {
  _state: Record<string, CacheState<FetchParamsType, ValueType>>;
  debugLabel: string;
}

const initializeConfigCache = <FetchParamsType, ValueType>(
  debugLabel: string,
): CacheStateContainer<FetchParamsType, ValueType> => {
  return {
    _state: Object.create(null),
    debugLabel,
  };
};

const _getCacheKey = <FetchParamsType, ValueType>(
  _cache: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): string => {
  return hashKey([fetchParams]);
};
const _getCacheStateForKey = <FetchParamsType, ValueType>(
  _cache: CacheStateContainer<FetchParamsType, ValueType>,
  cacheKey: string,
): CacheState<FetchParamsType, ValueType> => {
  if (!_cache._state[cacheKey]) {
    // @TODO: Continue from here
    _cache._state[cacheKey] = null as unknown as CacheState<FetchParamsType, ValueType>;
  }
  return _cache._state[cacheKey];
};

const getCacheEntry = <FetchParamsType, ValueType>(
  _cache: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): CacheState<FetchParamsType, ValueType> => {
  return _getCacheStateForKey(_cache, _getCacheKey(_cache, fetchParams));
};

export type { CacheValueStatus, CacheValueFreshness, CacheState };
export { initializeConfigCache, getCacheEntry };
