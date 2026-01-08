import { expectAssignable, expectType } from 'tsd';
import { describe, test } from 'vitest';

import type { HISTORICAL_FEATURE_FLAG_V1_VALUES } from '../../HISTORICAL_V1_TYPES.ts';
import type { FeatureFlagValuesV1 } from '../featureFlagsV1.js';

type HistoricalFeatureFlagValuesV1 = (typeof HISTORICAL_FEATURE_FLAG_V1_VALUES)[number];

/*
 * Ensure the original typing is still a valid match for the current typing.
 */
expectType<FeatureFlagValuesV1>(null as unknown as HistoricalFeatureFlagValuesV1);

/*
 * Ensure the current type still satisfies the original one.
 */
expectAssignable<HistoricalFeatureFlagValuesV1>(null as unknown as FeatureFlagValuesV1);

describe('@TODO', () => {
  test('@TODO', () => {
    // @TODO: Test featureFlagValuesV1Schema and all HISTORICAL_FEATURE_FLAG_V1_VALUES
  });
});
