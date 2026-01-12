import { featureFlagValuesV1Schema } from '@spautz/myconfig-contracts';
import { describe, expect, test } from 'vitest';

import { CONFIG_FILES as FEATURE_FLAG_CONFIG_FILES } from '../v1Beverage.ts';

describe('Current featureFlagConfig values', () => {
  test('still provides the expected filename', () => {
    expect(FEATURE_FLAG_CONFIG_FILES['feature-flags.json']).toBeTruthy();
  });
  test('passes the contract schema', () => {
    const featureFlagsConfig = featureFlagValuesV1Schema.parse(
      FEATURE_FLAG_CONFIG_FILES['feature-flags.json'],
    );
    expect(featureFlagsConfig).toBeTruthy();
  });
});
