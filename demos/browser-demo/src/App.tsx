import {
  type BeverageV1Payload,
  initializeBeverageCache,
  internal_getV1BeverageCacheEntry,
  internal_getV1BeverageCacheStateContainer,
  internal_setV1BeveragePayload,
} from '@spautz/myconfig-sdk';
import { ALL_CONFIG_FILE_PATHS } from '@spautz/myconfig-values';
import SEED_VALUE from '@spautz/myconfig-values/configs/v1/beverages.json' with { type: 'json' };
import { useState } from 'react';
import type { JSX } from 'react/jsx-runtime';

function App(): JSX.Element {
  initializeBeverageCache('https://localhost:3000/');
  const [beverageCacheEntry, setBeverageCacheEntry] = useState(
    internal_getV1BeverageCacheEntry({}),
  );
  const cacheStateContainer = internal_getV1BeverageCacheStateContainer();

  return (
    <div>
      <select>
        {ALL_CONFIG_FILE_PATHS.map((configFilePath) => (
          <option key={configFilePath}>{configFilePath}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => {
          // @FIXME: Hardcoded 2 === CACHED_PAYLOAD_SOURCE__SEED
          internal_setV1BeveragePayload({}, SEED_VALUE as BeverageV1Payload, 2);
        }}
      >
        Load Seed Value
      </button>
      <button
        type="button"
        onClick={() => {
          setBeverageCacheEntry(internal_getV1BeverageCacheEntry({}));
        }}
      >
        Reload from config cache
      </button>
      <ul>
        <li>
          cacheStateContainer: <pre>{JSON.stringify(cacheStateContainer, null, 2)}</pre>
        </li>
        <li>
          beverageCacheEntry: <pre>{JSON.stringify(beverageCacheEntry, null, 2)}</pre>
        </li>
      </ul>
    </div>
  );
}

export { App };
