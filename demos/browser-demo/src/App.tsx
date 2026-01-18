import { type BeverageV1Payload, internal_setV1BeveragePayload } from '@spautz/myconfig-sdk';
import SEED_VALUE from '@spautz/myconfig-values/configs/v1/beverages.json' with { type: 'json' };
import type { JSX } from 'react/jsx-runtime';
import { useBeverageConfig } from './future-react-utils/useBeverageConfig.ts';

function App(): JSX.Element {
  const [beverageConfigState, beverageConfigPayload] = useBeverageConfig('https://localhost:3000/');

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          // @FIXME: Hardcoded 2 === CACHED_PAYLOAD_SOURCE__SEED
          internal_setV1BeveragePayload({}, SEED_VALUE as BeverageV1Payload, 2);
        }}
      >
        Load Seed Value
      </button>
      <ul>
        <li>
          beverageConfigState: <pre>{JSON.stringify(beverageConfigState, null, 2)}</pre>
        </li>
        <li>
          beverageConfigPayload: <pre>{JSON.stringify(beverageConfigPayload, null, 2)}</pre>
        </li>
      </ul>
    </div>
  );
}

export { App };
