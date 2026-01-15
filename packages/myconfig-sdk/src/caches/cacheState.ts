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
const CACHE_VALUE_SOURCE__NONE = 0;
/**
 * Supplied by a local copy of the values package. Considered stale.
 * (not yet implemented)
 */
const CACHE_VALUE_SOURCE__BACKUP = 1;
/**
 * Supplied by the host app, but may be overridden. Useful for server cases.
 */
const CACHE_VALUE_SOURCE__SEED = 2;
/**
 * Fetched from a remote source. Generally up-to-date.
 */
const CACHE_VALUE_SOURCE__REMOTE = 3;
/**
 * Specified by the host app, and may not be overridden. Useful for testing.
 */
const CACHE_VALUE_SOURCE__OVERRIDE = 4;

type CacheValueSource =
  | typeof CACHE_VALUE_SOURCE__NONE
  | typeof CACHE_VALUE_SOURCE__BACKUP
  | typeof CACHE_VALUE_SOURCE__SEED
  | typeof CACHE_VALUE_SOURCE__REMOTE
  | typeof CACHE_VALUE_SOURCE__OVERRIDE;

// These only apply for CACHE_VALUE_SOURCE__REMOTE
const CACHE_VALUE_FRESHNESS__NONE = 0;
const CACHE_VALUE_FRESHNESS__STALE = 1;
const CACHE_VALUE_FRESHNESS__FRESH = 2;

type CacheValueFreshness =
  | typeof CACHE_VALUE_FRESHNESS__NONE
  | typeof CACHE_VALUE_FRESHNESS__STALE
  | typeof CACHE_VALUE_FRESHNESS__FRESH;

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
      valueSource: typeof CACHE_VALUE_SOURCE__NONE;
      valueFreshness: typeof CACHE_VALUE_FRESHNESS__NONE;
      value: null;
      lastUpdatedAt: 0;
    }
  | {
      valueSource: Exclude<CacheValueSource, typeof CACHE_VALUE_SOURCE__NONE>;
      freshnessStatus: CacheValueFreshness;
      value: ValueType;
      lastUpdatedAt: number;
    }
);

type FetchParamsToURLConverter<FetchParamsType> = (
  fetchParams: FetchParamsType,
  baseUrl: string | URL,
) => URL;

/**
 * A collection of status & freshness information for all config files.
 */
interface CacheStateContainer<FetchParamsType, ValueType> {
  _state: Record<string, CacheEntry<FetchParamsType, ValueType>>;
  debugLabel: string;
  baseUrl: URL | string;
  convertFetchParamsToUrl: FetchParamsToURLConverter<FetchParamsType>;
}

const initializeCacheStateContainer = <FetchParamsType, ValueType>(
  debugLabel: string,
  {
    baseUrl,
    convertFetchParamsToUrl,
  }: { baseUrl: URL | string; convertFetchParamsToUrl: FetchParamsToURLConverter<FetchParamsType> },
): CacheStateContainer<FetchParamsType, ValueType> => {
  return {
    _state: Object.create(null),
    debugLabel,
    baseUrl,
    convertFetchParamsToUrl,
  };
};

const _getCacheKeyForParams = <FetchParamsType, ValueType>(
  _cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): string => {
  return hashKey([fetchParams]);
};

const _initializeCacheEntryForParams = <FetchParamsType, ValueType>(
  cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): CacheEntry<FetchParamsType, ValueType> => ({
  backupPromise: null,
  remotePromise: null,
  // @TODO: Track errors: result, retryCount, timing
  fetchParams,
  remoteUrl: cacheStateContainer.convertFetchParamsToUrl(fetchParams, cacheStateContainer.baseUrl),
  valueSource: CACHE_VALUE_SOURCE__NONE,
  valueFreshness: CACHE_VALUE_FRESHNESS__NONE,
  value: null,
  lastUpdatedAt: 0,
});

const getCacheEntry = <FetchParamsType, ValueType>(
  cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): CacheEntry<FetchParamsType, ValueType> => {
  const cacheKey = _getCacheKeyForParams(cacheStateContainer, fetchParams);
  if (!cacheStateContainer._state[cacheKey]) {
    cacheStateContainer._state[cacheKey] = _initializeCacheEntryForParams(
      cacheStateContainer,
      fetchParams,
    );
  }
  return cacheStateContainer._state[cacheKey];
};

const setCacheValue = <FetchParamsType, ValueType>(
  cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
  newValue: ValueType,
  source: CacheValueSource,
): CacheEntry<FetchParamsType, ValueType> => {
  const cacheEntry = getCacheEntry(cacheStateContainer, fetchParams);

  // Only set a new value if it's a higher-or-equal priority source than we already have
  if (source >= cacheEntry.valueSource) {
    // MUTATION
    Object.assign(cacheEntry, {
      valueSource: source,
      freshnessStatus:
        source === CACHE_VALUE_SOURCE__REMOTE
          ? CACHE_VALUE_FRESHNESS__FRESH
          : CACHE_VALUE_FRESHNESS__STALE,
      value: newValue,
      lastUpdatedAt: Date.now(),
    });
  } else if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Ignoring new Beverage config value because we already have a higher-priority source: ',
      newValue,
      cacheEntry,
    );
  }

  return cacheEntry;
};

export type { CacheValueSource, CacheValueFreshness, CacheEntry, CacheStateContainer };
export {
  CACHE_VALUE_SOURCE__NONE,
  CACHE_VALUE_SOURCE__BACKUP,
  CACHE_VALUE_SOURCE__SEED,
  CACHE_VALUE_SOURCE__REMOTE,
  CACHE_VALUE_SOURCE__OVERRIDE,
  CACHE_VALUE_FRESHNESS__NONE,
  CACHE_VALUE_FRESHNESS__STALE,
  CACHE_VALUE_FRESHNESS__FRESH,
  initializeCacheStateContainer,
  getCacheEntry,
  setCacheValue,
};
