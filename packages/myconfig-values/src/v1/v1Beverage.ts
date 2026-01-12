import type { BeverageV1Info } from '@spautz/myconfig-contracts';

type FullV1BeverageConfig = {
  lastUpdatedAt: string;
  beverages: Array<BeverageV1Info>;
};

const featureFlagsConfig: Record<BeverageV1Info> = beverageV1InfoSchema.parse({
  schemaVersion: 1,
  translations: {
    'en-US': {
      label: 'Black Tea',
      description: 'A hearty cup of English tea.',
    },
  },
  isAlcoholic: false,
  isAvailable: false,
});

/**
 * The build step will generate these files relative to `v1/`, each holding the values provided
 */
export const CONFIG_FILES = {
  'feature-flags.json': featureFlagsConfig,
};
