import { hashKey } from '@tanstack/query-core';

/*
 * This file defines general, abstract utils and for tracking cache state.
 * Each config-specific store should rely on this to set up its own local cache.
 *
 * Terminology:
 *    "config file": a single json config, uniquely identified by its fetchParams
 *    "config category": the type (and schema) of a config file, like "v1Beverage"
 *    "cache entry": the metadata and internal status of one config file
 *    "cache state container": the set of cache entries and config file values for all available json configs
 *      in a given category, along with metadata for mapping params to config files and cache entries
 */

// Each distinct config (as identified by its fetchParams) will be in one of these states.
// This represents *presence*: other values below track freshness and updates.
const CACHED_VALUE__NONE = 0;
/**
 * Supplied by the host app, but may be overridden. Useful for server cases.
 */
const CACHED_VALUE__IS_SEED = 1;
/**
 * Supplied by a local copy of the values package. Considered stale.
 */
const CACHED_VALUE__IS_BACKUP = 2;
/**
 * Fetched from a remote source. Generally up-to-date.
 */
const CACHED_VALUE__IS_REMOTE = 3;
/**
 * Specified by the host app, and may not be overridden. Useful for testing.
 */
const CACHED_VALUE__IS_OVERRIDE = 4;

type CacheValueStatus =
  | typeof CACHED_VALUE__NONE
  | typeof CACHED_VALUE__IS_SEED
  | typeof CACHED_VALUE__IS_BACKUP
  | typeof CACHED_VALUE__IS_REMOTE
  | typeof CACHED_VALUE__IS_OVERRIDE;

const CACHE_FRESHNESS__NONE = 0;
const CACHE_FRESHNESS__STALE = 1;
const CACHE_FRESHNESS__FRESH = 2;

type CacheValueFreshness =
  | typeof CACHE_FRESHNESS__NONE
  | typeof CACHE_FRESHNESS__STALE
  | typeof CACHE_FRESHNESS__FRESH;

/**
 * Tracks status and freshness of a single config file.
 */
type CacheEntry<FetchParamsType, ValueType> = {
  backupPromise: Promise<ValueType> | null;
  remotePromise: Promise<ValueType> | null;
  // @TODO: Track errors: result, retryCount, timing
  // @TODO: Events and external observers: subscribe, unsubscribe
  fetchParams: FetchParamsType;
  remoteUrl: URL;
} & (
  | {
      valueStatus: typeof CACHED_VALUE__NONE;
      valueFreshness: typeof CACHE_FRESHNESS__NONE;
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

/**
 * A collection of status & freshness information for all config files.
 */
interface CacheStateContainer<FetchParamsType, ValueType> {
  _state: Record<string, CacheEntry<FetchParamsType, ValueType>>;
  debugLabel: string;
  fetchParamsToURLFn: (fetchParams: FetchParamsType) => URL;
}

const initializeCacheStateContainer = <FetchParamsType, ValueType>(
  debugLabel: string,
  fetchParamsToURLFn: (fetchParams: FetchParamsType) => URL,
): CacheStateContainer<FetchParamsType, ValueType> => {
  return {
    _state: Object.create(null),
    debugLabel,
    fetchParamsToURLFn,
  };
};

const _getCacheKeyForParams = <FetchParamsType, ValueType>(
  _cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): string => {
  return hashKey([fetchParams]);
};

const _initializeCacheStateForParams = <FetchParamsType, ValueType>(
  cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): CacheEntry<FetchParamsType, ValueType> => ({
  backupPromise: null,
  remotePromise: null,
  // @TODO: Track errors: result, retryCount, timing
  fetchParams,
  remoteUrl: cacheStateContainer.fetchParamsToURLFn(fetchParams),
  valueStatus: CACHED_VALUE__NONE,
  valueFreshness: CACHE_FRESHNESS__NONE,
  value: null,
  lastUpdatedAt: 0,
});

const getCacheEntry = <FetchParamsType, ValueType>(
  cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): CacheEntry<FetchParamsType, ValueType> => {
  const cacheKey = _getCacheKeyForParams(cacheStateContainer, fetchParams);
  if (!cacheStateContainer._state[cacheKey]) {
    cacheStateContainer._state[cacheKey] = _initializeCacheStateForParams(
      cacheStateContainer,
      fetchParams,
    );
  }
  return cacheStateContainer._state[cacheKey];
};

export type { CacheValueStatus, CacheValueFreshness, CacheEntry, CacheStateContainer };
export {
  CACHED_VALUE__NONE,
  CACHED_VALUE__IS_SEED,
  CACHED_VALUE__IS_BACKUP,
  CACHED_VALUE__IS_REMOTE,
  CACHED_VALUE__IS_OVERRIDE,
  CACHE_FRESHNESS__NONE,
  CACHE_FRESHNESS__STALE,
  CACHE_FRESHNESS__FRESH,
  initializeCacheStateContainer,
  getCacheEntry,
};
