import {
  type BeverageV1Config,
  type BeverageV1FetchParams,
  convertFetchParamsToURLPath,
} from '@spautz/myconfig-contracts';
import { loadV1BeverageBackupConfig } from '../fetch/loadBackupConfig.ts';
import {
  CACHE_FRESHNESS__STALE,
  CACHED_VALUE__IS_BACKUP,
  type CacheEntry,
  type CacheStateContainer,
  getCacheEntry,
  initializeCacheStateContainer,
} from './cacheState.ts';

// @TODO: Store baseUrl within the cacheStateContainer; support multiple containers for tests
let baseUrl: string | URL;
let cacheStateContainer: CacheStateContainer<BeverageV1FetchParams, BeverageV1Config>;

/**
 * Converts fetchParams into a URL path where the Beverage config is located.
 */
const getRemoteUrlForBeverageConfig = (fetchParams: BeverageV1FetchParams): URL => {
  if (!baseUrl) {
    throw new Error(
      'The Beverage cache must be initialized, and a baseUrl set, before it can be used.',
    );
  }
  return new URL(convertFetchParamsToURLPath(fetchParams), baseUrl);
};

/**
 * Initializes the Beverage cache with a base URL. This is required before you do anything else.
 */
const initializeBeverageCache = (newBaseUrl: string | URL): void => {
  baseUrl = newBaseUrl;
  cacheStateContainer = initializeCacheStateContainer<BeverageV1FetchParams, BeverageV1Config>(
    // @TODO: Full options object, store baseUrl here
    'v1Beverage',
    getRemoteUrlForBeverageConfig,
  );
};

/**
 * Returns the internal cache entry for a given Beverage config.
 */
const getV1BeverageCacheEntry = (
  fetchParams?: BeverageV1FetchParams,
): CacheEntry<BeverageV1FetchParams, BeverageV1Config> =>
  getCacheEntry(cacheStateContainer, fetchParams);

/**
 * Returns the full internal cache state container. Do not use unless you know what you're doing.
 * This has an extra-long name to scare people away.
 */
const internal_getV1BeverageCacheStateContainer = (): CacheStateContainer<
  BeverageV1FetchParams,
  BeverageV1Config
> => cacheStateContainer;

/**
 * Populates a config file using the local backup (and updates its cache entry)
 * @TODO: Lift this up so that we aren't importing across sections
 */
const loadBeverageConfigFromBackup = async (
  fetchParams?: BeverageV1FetchParams,
): Promise<BeverageV1Config> => {
  const cacheEntry = getCacheEntry(cacheStateContainer, fetchParams);
  if (!cacheEntry.backupPromise) {
    cacheEntry.backupPromise = loadV1BeverageBackupConfig(fetchParams).then((backupValue) => {
      Object.assign(cacheEntry, {
        valueStatus: CACHED_VALUE__IS_BACKUP,
        freshnessStatus: CACHE_FRESHNESS__STALE,
        value: backupValue,
        lastUpdatedAt: Date.now(),
      });
      return backupValue;
    });
    // Non-chained to make the types happy
    cacheEntry.backupPromise.catch((error) => {
      console.error('Error loading Beverage config from backup: ', error);
    });
  }
  return cacheEntry.backupPromise;
};

export {
  initializeBeverageCache,
  getV1BeverageCacheEntry,
  internal_getV1BeverageCacheStateContainer,
  loadBeverageConfigFromBackup,
};
