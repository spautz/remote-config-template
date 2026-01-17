/*
 * This file defines general, abstract utils and for tracking cache state.
 * Each config-specific store should rely on this to set up its own local cache.
 *
 * Terminology:
 *    "config payload": a single json config (i.e., one file), uniquely identified by its URL
 *    "config category": the type (and schema) of a config payload, like "v1Beverage"
 *    "cache state entry": the metadata and internal status of one config payload
 *    "cache state container": the set of cache entries for all available URLs in a given category,
 *      along with metadata for mapping params to config files and cache entries
 *
 * These should generally not be called except through a category-specific store
 * (like v1BeverageCacheState) -- the functions are all prefixed with "internalCacheState_"
 * to discourage casual use.
 */

// Each config payload (identified by its URL) will be in one of these states.
// This represents *presence*: other values below track freshness and updates.
// Ordered from lowest to highest priority:
const CACHED_PAYLOAD_SOURCE__NONE = 0;
/**
 * Supplied by a local copy of the values package. Considered stale.
 * (not yet implemented)
 */
const CACHED_PAYLOAD_SOURCE__BACKUP = 1;
/**
 * Supplied by the host app, but may be overridden. Useful for server cases.
 */
const CACHED_PAYLOAD_SOURCE__SEED = 2;
/**
 * Fetched from a remote source. Generally up-to-date.
 */
const CACHED_PAYLOAD_SOURCE__REMOTE = 3;
/**
 * Specified by the host app, and may not be overridden. Useful for testing.
 */
const CACHED_PAYLOAD_SOURCE__OVERRIDE = 4;

/**
 * We'll use this to pre-initialize arrays for tracking value/status/etc for each source
 */
const numPayloadSources = CACHED_PAYLOAD_SOURCE__OVERRIDE + 1;

type CachedPayloadSource =
  | typeof CACHED_PAYLOAD_SOURCE__NONE
  | typeof CACHED_PAYLOAD_SOURCE__BACKUP
  | typeof CACHED_PAYLOAD_SOURCE__SEED
  | typeof CACHED_PAYLOAD_SOURCE__REMOTE
  | typeof CACHED_PAYLOAD_SOURCE__OVERRIDE;

// These only apply for CACHED_PAYLOAD_SOURCE__REMOTE
const CACHED_PAYLOAD_FRESHNESS__NONE = 0;
const CACHED_PAYLOAD_FRESHNESS__STALE = 1;
const CACHED_PAYLOAD_FRESHNESS__FRESH = 2;

type CachedPayloadFreshness =
  | typeof CACHED_PAYLOAD_FRESHNESS__NONE
  | typeof CACHED_PAYLOAD_FRESHNESS__STALE
  | typeof CACHED_PAYLOAD_FRESHNESS__FRESH;

/**
 * Tracks status and freshness of a single payload, potentially spanning multiple sources
 */
type CacheStateEntry<FetchParamsType, ValueType> = {
  promises: Array<Promise<ValueType> | null>;
  values: Array<ValueType | null>;
  updateTimes: Array<ReturnType<typeof Date.now> | 0>;
  // @TODO: Track errors: result, retryCount, timing
  // @TODO: Events and external observers: subscribe, unsubscribe
  fetchParams: FetchParamsType;
  remoteUrl: URL;
  bestSource: CachedPayloadSource;
};

type FetchParamsToURLConverter<FetchParamsType> = (
  fetchParams: FetchParamsType,
  baseUrl: string | URL,
) => URL;

/**
 * A collection of status & freshness information for all config files.
 */
interface CacheStateContainer<FetchParamsType, ValueType> {
  _state: Record<string, CacheStateEntry<FetchParamsType, ValueType>>;
  debugLabel: string;
  baseUrl: URL | string;
  convertFetchParamsToUrl: FetchParamsToURLConverter<FetchParamsType>;
}

const initializeCacheStateContainer = <FetchParamsType, ValueType>(
  debugLabel: string,
  {
    baseUrl,
    convertFetchParamsToUrl,
  }: {
    baseUrl: URL | string;
    convertFetchParamsToUrl: FetchParamsToURLConverter<FetchParamsType>;
  },
): CacheStateContainer<FetchParamsType, ValueType> => {
  return {
    _state: Object.create(null),
    debugLabel,
    baseUrl,
    convertFetchParamsToUrl,
  };
};

const internalCacheState_getURLForParams = <FetchParamsType, ValueType>(
  cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): URL => {
  return cacheStateContainer.convertFetchParamsToUrl(fetchParams, cacheStateContainer.baseUrl);
};

const internalCacheState_initializeCacheEntryForParams = <FetchParamsType, ValueType>(
  _cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
  remoteUrl: URL,
): CacheStateEntry<FetchParamsType, ValueType> => ({
  promises: Array(numPayloadSources).fill(null),
  values: Array(numPayloadSources).fill(null),
  updateTimes: Array(numPayloadSources).fill(0),
  // @TODO: Track errors: result, retryCount, timing
  fetchParams,
  remoteUrl,
  bestSource: CACHED_PAYLOAD_SOURCE__NONE,
});

const internalCacheState_getCacheEntry = <FetchParamsType, ValueType>(
  cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
): CacheStateEntry<FetchParamsType, ValueType> => {
  const remoteUrl = internalCacheState_getURLForParams(cacheStateContainer, fetchParams);
  const cacheKey = remoteUrl.toString();

  if (!cacheStateContainer._state[cacheKey]) {
    cacheStateContainer._state[cacheKey] = internalCacheState_initializeCacheEntryForParams(
      cacheStateContainer,
      fetchParams,
      remoteUrl,
    );
  }
  return cacheStateContainer._state[cacheKey];
};

const internalCacheState_setPayloadValue = <FetchParamsType, ValueType>(
  cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
  newValue: ValueType,
  source: CachedPayloadSource,
): CacheStateEntry<FetchParamsType, ValueType> => {
  const cacheEntry = internalCacheState_getCacheEntry(cacheStateContainer, fetchParams);
  const { promises, values, updateTimes, bestSource } = cacheEntry;

  // Clear promises, set value
  promises[source] = null;
  values[source] = newValue;
  updateTimes[source] = Date.now();

  if (source > bestSource) {
    cacheEntry.bestSource = source;
  }

  return cacheEntry;
};

const internalCacheState_setPayloadPromise = <FetchParamsType, ValueType>(
  cacheStateContainer: CacheStateContainer<FetchParamsType, ValueType>,
  fetchParams: FetchParamsType,
  newPromise: Promise<ValueType>,
  source: CachedPayloadSource,
): CacheStateEntry<FetchParamsType, ValueType> => {
  const cacheEntry = internalCacheState_getCacheEntry(cacheStateContainer, fetchParams);
  const { promises } = cacheEntry;

  // Track promise and queue up a value-assignment once it finishes
  promises[source] = newPromise;

  newPromise.then((newValue) => {
    if (newPromise === promises[source]) {
      internalCacheState_setPayloadValue(cacheStateContainer, fetchParams, newValue, source);
    }
    // Else: this promise was replaced while we were waiting, so don't do anything
  });

  return cacheEntry;
};

export type { CachedPayloadSource, CachedPayloadFreshness, CacheStateEntry, CacheStateContainer };
export {
  CACHED_PAYLOAD_SOURCE__NONE,
  CACHED_PAYLOAD_SOURCE__BACKUP,
  CACHED_PAYLOAD_SOURCE__SEED,
  CACHED_PAYLOAD_SOURCE__REMOTE,
  CACHED_PAYLOAD_SOURCE__OVERRIDE,
  CACHED_PAYLOAD_FRESHNESS__NONE,
  CACHED_PAYLOAD_FRESHNESS__STALE,
  CACHED_PAYLOAD_FRESHNESS__FRESH,
  initializeCacheStateContainer,
  internalCacheState_getCacheEntry,
  internalCacheState_setPayloadValue,
  internalCacheState_setPayloadPromise,
};
