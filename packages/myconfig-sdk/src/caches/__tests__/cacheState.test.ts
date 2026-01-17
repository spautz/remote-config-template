import { describe, expect, it } from 'vitest';

import { initializeCacheStateContainer, internalCacheState_getCacheEntry } from '../cacheState.ts';

describe('Cache State Container', () => {
  describe('initializeCacheStateContainer', () => {
    it('should initialize a blank state container', () => {
      const alwaysReturnExampleUrl = () => new URL('https://example.com/unit-test-example.json');
      const cacheStateContainer = initializeCacheStateContainer('unit tests', {
        baseUrl: 'https://example.com',
        convertFetchParamsToUrl: alwaysReturnExampleUrl,
      });

      expect(cacheStateContainer).toEqual({
        _state: {},
        debugLabel: 'unit tests',
        baseUrl: 'https://example.com',
        convertFetchParamsToUrl: alwaysReturnExampleUrl,
      });
    });
  });

  describe('internalCacheState_getCacheEntry', () => {
    it('should return a blank cache entry on first call', () => {
      const alwaysReturnExampleUrl = () => new URL('https://example.com/unit-test-example.json');
      const cacheStateContainer = initializeCacheStateContainer('unit tests', {
        baseUrl: 'https://example.com',
        convertFetchParamsToUrl: alwaysReturnExampleUrl,
      });
      const cacheEntry = internalCacheState_getCacheEntry(cacheStateContainer, 'example param');

      expect(cacheEntry).toMatchObject({
        promises: Array(5).fill(null),
        values: Array(5).fill(null),
        updateTimes: Array(5).fill(0),
        fetchParams: 'example param',
        remoteUrl: new URL('https://example.com/unit-test-example.json'),
        bestSource: 0,
      });
    });
  });
});
