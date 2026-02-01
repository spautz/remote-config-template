/*
 * This file is the point where "V1 beverages" become just "beverages".
 * The outside consumer doesn't know or care whether we're using V1 or something else:
 * from here on the exposed typings are what matters.
 *
 * We only support Beverages V1 right now, so no need to do anything special when initializing or interacting
 * with it. If we were to add a Beverages V2, we could split/combine versions for both of them here.
 */

import type { V1Beverage_Payload, V1FetchParams } from '@spautz/myconfig-api-contracts/v1';
import {
  internal_addGlobalV1BeverageChangeListener,
  internal_addV1BeverageChangeListener,
  internal_getV1BeverageCacheStateContainer,
  internal_getV1BeveragePayload,
  internal_initializeV1BeverageCache,
  internal_removeGlobalV1BeverageChangeListener,
  internal_removeV1BeverageChangeListener,
} from './caches/v1BeverageCacheState.ts';

import { internalCacheState_fetchRemotePayload } from './fetch/fetchRemotePayload.ts';

type InitializationParams = {
  baseUrl: string | URL;
};

type InitializationAndFetchParams = InitializationParams & V1FetchParams;

const initializeBeverageCache = ({ baseUrl }: InitializationParams): void => {
  internal_initializeV1BeverageCache(baseUrl);
};

const fetchBeverage = ({ baseUrl: _baseUrl, ...fetchParams }: InitializationAndFetchParams) => {
  return internalCacheState_fetchRemotePayload(
    internal_getV1BeverageCacheStateContainer(),
    fetchParams as V1FetchParams,
  );
};

// @TODO:
// internal_getV1BeverageCacheEntry,
// internal_setV1BeveragePayload,

export type { V1FetchParams as BeverageFetchParams, V1Beverage_Payload as BeveragePayload };
export type { InitializationAndFetchParams, InitializationParams };
export {
  internal_addGlobalV1BeverageChangeListener as addGlobalBeverageChangeListener,
  internal_addV1BeverageChangeListener as addBeverageChangeListener,
  internal_getV1BeveragePayload as getCurrentBeveragePayload,
  internal_removeGlobalV1BeverageChangeListener as removeGlobalBeverageChangeListener,
  internal_removeV1BeverageChangeListener as removeBeverageChangeListener,
  fetchBeverage,
  initializeBeverageCache,
};
