import { describe, expect, it } from 'vitest';

import { getCacheEntry, initializeCacheStateContainer } from '../cacheState.ts';

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

  describe('getCacheEntry', () => {
    it('should return a blank cache entry on first call', () => {
      const alwaysReturnExampleUrl = () => new URL('https://example.com/unit-test-example.json');
      const cacheStateContainer = initializeCacheStateContainer('unit tests', {
        baseUrl: 'https://example.com',
        convertFetchParamsToUrl: alwaysReturnExampleUrl,
      });
      const cacheEntry = getCacheEntry(cacheStateContainer, 'example param');

      expect(cacheEntry).toMatchObject({
        backupPromise: null,
        fetchParams: 'example param',
        lastUpdatedAt: 0,
        remotePromise: null,
        remoteUrl: new URL('https://example.com/unit-test-example.json'),
        value: null,
        valueFreshness: 0,
        valueSource: 0,
      });
    });
  });
});
