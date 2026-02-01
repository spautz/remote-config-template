import type { V1Beverage_Payload } from '@spautz/myconfig-api-contracts/v1';

/**
 * Mock config. We use a promise to simulate any remote work that might be needed.
 */
const allBeverages: Promise<V1Beverage_Payload> = Promise.resolve({
  lastUpdatedAt: new Date().toISOString(),
  beverages: [
    {
      schemaVersion: 1,
      translations: {
        'en-US': {
          label: 'Oolong Tea',
          description: 'A smooth cup of tea.',
        },
        'es-ES': {
          label: 'té oolong',
          description: 'Una taza de té suave.',
        },
      },
      isAlcoholic: false,
      isAvailable: false,
    },
  ],
});

/**
 * The build step will generate these files relative to `v1/`, each holding the values provided
 */
export const CONFIG_FILES = {
  'v1/beverages.json': allBeverages,
};
