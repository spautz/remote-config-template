import { expectAssignable, expectType } from 'tsd';
import { describe, test } from 'vitest';

import type { FeatureFlagsV1, ORIGINAL_FEATURE_FLAGS_V1 } from '../featureFlagsV1.js';

/*
 * Ensure the original typing is still a valid match for the current type.
 */
expectType<FeatureFlagsV1>(null as unknown as ORIGINAL_FEATURE_FLAGS_V1);

/*
 * Ensure the current type still satisfies the original one.
 */
expectAssignable<ORIGINAL_FEATURE_FLAGS_V1>(null as unknown as FeatureFlagsV1);

describe('@TODO', () => {
  test('@TODO', () => {});
});
