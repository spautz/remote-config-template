import type { JSX } from 'react/jsx-runtime';
import {
  getV1BeverageCacheEntry,
  initializeBeverageCache,
  internal_getV1BeverageCacheStateContainer,
} from '@spautz/myconfig-sdk';
import { ALL_CONFIG_FILE_PATHS } from '@spautz/myconfig-values';
import VALUES from '@spautz/myconfig-values/configs/v1/beverages.json' with { type: 'json' };

function App(): JSX.Element {
  initializeBeverageCache('https://localhost:3000/');
  const beverageCacheEntry = getV1BeverageCacheEntry();
  const cacheStateContainer = internal_getV1BeverageCacheStateContainer();

  return (
    <div>
      <select>
        {ALL_CONFIG_FILE_PATHS.map((configFilePath) => (
          <option key={configFilePath}>{configFilePath}</option>
        ))}
      </select>
      {/*<button*/}
      {/*  type="button"*/}
      {/*  onClick={() => {*/}
      {/*    loadBeverageConfigFromBackup();*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Load Beverage Config from Backup*/}
      {/*</button>*/}
      <ul>
        <li>
          cacheStateContainer: <pre>{JSON.stringify(cacheStateContainer, null, 2)}</pre>
        </li>
        <li>
          beverageCacheEntry: <pre>{JSON.stringify(beverageCacheEntry, null, 2)}</pre>
        </li>
        <li>
          Default/fallback: <pre>{JSON.stringify(VALUES, null, 2)}</pre>
        </li>
      </ul>
    </div>
  );
}

export { App };
