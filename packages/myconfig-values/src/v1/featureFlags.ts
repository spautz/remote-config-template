import { featureFlagsV1Schema } from '@spautz/myconfig-contracts';

const featureFlagsConfig = featureFlagsV1Schema.parse({
  schemaVersion: 1,
  enableBeveragesFeature: true,
  enableEasterEggs: true,
  enableLegacyStuff: false,
});

/**
 * The build step will generate these files relative to `v1/`, each holding the values provided
 */
export const CONFIG_FILES = {
  'feature-flags.json': featureFlagsConfig,
};
