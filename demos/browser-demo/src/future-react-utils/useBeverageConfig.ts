import {
  type BeveragePayload,
  type InternalCacheState_CacheStateContainer,
  initializeBeverageCache,
  internal_getV1BeverageCacheStateContainer,
  internalCacheState_addChangeListener,
  internalCacheState_getCurrentPayload,
} from '@spautz/myconfig-sdk';
import { useEffect, useState } from 'react';

// @TODO: Move this into the SDK
type PayloadState = {
  // Presence
  hasPayload: boolean;
  hasError: boolean;
  isLoading: boolean;
  // Freshness & related status
  isBackupValue: boolean;
  isSeedValue: boolean;
  isRemoteValue: boolean;
  isOverrideValue: boolean;
};

const internal_useRemoteConfig = <FetchParamsType, PayloadType>(
  internalCacheStateContainer: InternalCacheState_CacheStateContainer<FetchParamsType, PayloadType>,
  fetchParams: FetchParamsType,
): [PayloadState, PayloadType | undefined] => {
  const [payload, setPayload] = useState(
    internalCacheState_getCurrentPayload(internalCacheStateContainer, fetchParams),
  );

  useEffect(() => {
    const unsubscribe = internalCacheState_addChangeListener(
      internalCacheStateContainer,
      fetchParams,
      () => {
        setPayload(internalCacheState_getCurrentPayload(internalCacheStateContainer, fetchParams));
      },
    );
    return unsubscribe;
  }, [internalCacheStateContainer, fetchParams]);

  return [
    {
      // @TODO: Implement this properly -- just dummy data for now
      hasPayload: !!payload,
      hasError: false,
      isLoading: false,
      isBackupValue: false,
      isSeedValue: true,
      isRemoteValue: false,
      isOverrideValue: false,
    },
    payload,
  ];
};

const isInitialized = false;

const useBeverageConfig = (baseUrl: string | URL): [PayloadState, BeveragePayload | undefined] => {
  if (!isInitialized) {
    // @TODO: Properly respond to baseUrl changes
    initializeBeverageCache(baseUrl);
  }
  return internal_useRemoteConfig(internal_getV1BeverageCacheStateContainer(), undefined);
};

export { internal_useRemoteConfig, useBeverageConfig };
