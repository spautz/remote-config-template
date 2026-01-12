import { describe, expect, test } from 'vitest';

import {
  type BeverageV1Config,
  beverageV1ConfigExamples,
  beverageV1ConfigSchema,
} from '../beverageV1Config.js';
import {
  ALL_HISTORICAL__BeverageV1ConfigExamples,
  type ALL_HISTORICAL__BeverageV1ConfigTypes,
} from '../HISTORICAL_BEVERAGE_V1_TYPES.js';
import { expectAssignable } from './testUtils.ts';

// The current examples must match the current typings
expectAssignable<BeverageV1Config>(beverageV1ConfigExamples[0]);
expectAssignable<Array<BeverageV1Config>>(beverageV1ConfigExamples);

// Historical examples must still be valid
expectAssignable<BeverageV1Config>(ALL_HISTORICAL__BeverageV1ConfigExamples[0]);
expectAssignable<Array<BeverageV1Config>>(ALL_HISTORICAL__BeverageV1ConfigExamples);

// The current type must be assignable to all historical types
expectAssignable<ALL_HISTORICAL__BeverageV1ConfigTypes>(null as unknown as BeverageV1Config);

// Current examples must still be valid against old contracts
expectAssignable<ALL_HISTORICAL__BeverageV1ConfigTypes>(beverageV1ConfigExamples[0]);
expectAssignable<ReadonlyArray<ALL_HISTORICAL__BeverageV1ConfigTypes>>(beverageV1ConfigExamples);

// Finally, validate all examples against the schema
describe('BeverageV1 Configs', () => {
  test.each(
    beverageV1ConfigExamples,
  )('Example values all pass current schema (#%#)', (exampleConfigs) => {
    const result = beverageV1ConfigSchema.safeParse(exampleConfigs);
    expect(result.error).toBeFalsy();
  });

  test.each(
    ALL_HISTORICAL__BeverageV1ConfigExamples,
  )('Historical values all pass current schema (%#: $milestoneName)', (exampleConfigs) => {
    const result = beverageV1ConfigSchema.safeParse(exampleConfigs);
    expect(result.error).toBeFalsy();
  });
});
