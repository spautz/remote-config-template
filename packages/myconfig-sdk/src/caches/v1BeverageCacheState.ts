import {
  type BeverageV1FetchParams,
  type BeverageV1Payload,
  beverageV1FetchParamSchema,
  beverageV1PayloadSchema,
  convertBeverageV1FetchParamsToURLPath,
} from '@spautz/myconfig-contracts';

import {
  type CachedPayloadSource,
  type CacheStateContainer,
  type CacheStateEntry,
  initializeCacheStateContainer,
  internalCacheState_getCacheEntry,
  internalCacheState_setPayloadValue,
} from './cacheState.ts';

let cacheStateContainer: CacheStateContainer<BeverageV1FetchParams, BeverageV1Payload>;

/**
 * Converts fetchParams into a URL path where the Beverage config is located.
 */
const getRemoteUrlForBeverageConfig = (
  fetchParams: BeverageV1FetchParams,
  baseUrl: string | URL,
): URL => {
  if (!cacheStateContainer || !baseUrl) {
    throw new Error(
      'The Beverage cache must be initialized, and a baseUrl set, before it can be used.',
    );
  }
  return new URL(convertBeverageV1FetchParamsToURLPath(fetchParams), baseUrl);
};

/**
 * Initializes the Beverage cache with a base URL. This is required before you do anything else.
 */
const internal_initializeV1BeverageCache = (baseUrl: string | URL): void => {
  cacheStateContainer = initializeCacheStateContainer<BeverageV1FetchParams, BeverageV1Payload>(
    'v1Beverage',
    {
      baseUrl,
      convertFetchParamsToUrl: getRemoteUrlForBeverageConfig,
    },
  );
};

/**
 * Returns the internal cache entry for a given Beverage config.
 */
const internal_getV1BeverageCacheEntry = (
  fetchParams: BeverageV1FetchParams,
): CacheStateEntry<BeverageV1FetchParams, BeverageV1Payload> => {
  const validation = beverageV1FetchParamSchema.safeParse(fetchParams);
  if (validation.error) {
    console.error('Invalid fetchParams for Beverage config: ', validation, fetchParams);
    throw new Error(`Invalid fetchParams for Beverage config: ${validation.error}`);
  }

  return internalCacheState_getCacheEntry(cacheStateContainer, fetchParams);
};

/**
 * Populates the cache with the value provided, if it's valid.
 */
const internal_setV1BeveragePayload = (
  fetchParams: BeverageV1FetchParams,
  newValue: BeverageV1Payload,
  source: CachedPayloadSource,
): CacheStateEntry<BeverageV1FetchParams, BeverageV1Payload> => {
  // Validate against the schema, but pass through the original value in case there's anything special about it
  // @TODO: Manual promise support, put validation into stateContainer config
  const validation = beverageV1PayloadSchema.safeParse(newValue);
  if (validation.error) {
    console.error('Invalid value for Beverage config: ', validation, newValue);
    throw new Error(`Invalid value for Beverage config: ${validation.error}`);
  }

  return internalCacheState_setPayloadValue(cacheStateContainer, fetchParams, newValue, source);
};

/**
 * Returns the full internal cache state container. Do not use unless you know what you're doing.
 * This has an extra-long name to scare people away.
 */
const internal_getV1BeverageCacheStateContainer = (): CacheStateContainer<
  BeverageV1FetchParams,
  BeverageV1Payload
> => cacheStateContainer;

export {
  internal_initializeV1BeverageCache,
  internal_getV1BeverageCacheEntry,
  internal_setV1BeveragePayload,
  internal_getV1BeverageCacheStateContainer,
};
