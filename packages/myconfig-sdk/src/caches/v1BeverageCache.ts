import type { BeverageV1Config, BeverageV1FetchParams } from '@spautz/myconfig-contracts';

import { type CacheState, getCacheEntry, initializeConfigCache } from './cacheState.ts';

const _cache = initializeConfigCache<BeverageV1FetchParams, BeverageV1Config>('v1Beverage');

const getV1BeverageCacheEntry = (
  fetchParams: BeverageV1FetchParams,
): CacheState<BeverageV1FetchParams, BeverageV1Config> => getCacheEntry(_cache, fetchParams);

export { getV1BeverageCacheEntry };
