import {
  getV1BeverageCacheEntry,
  initializeBeverageCache,
  internal_getV1BeverageCacheStateContainer,
  loadBeverageConfigFromBackup,
} from '@spautz/myconfig-sdk';
import type { JSX } from 'react/jsx-runtime';

function App(): JSX.Element {
  initializeBeverageCache('https://localhost:3000/');
  const beverageCacheEntry = getV1BeverageCacheEntry();
  const cacheStateContainer = internal_getV1BeverageCacheStateContainer();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          loadBeverageConfigFromBackup();
        }}
      >
        Load Beverage Config from Backup
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
