import { expectAssignable, expectType } from 'tsd';
import { describe, expect, test } from 'vitest';

import {
  type BeverageV1Config,
  beverageV1ConfigSchema,
  type exampleBeverageV1Configs,
} from '../beverageV1Config.js';
import {
  type ALL_HISTORICAL_BeverageV1ConfigTypes,
  ALL_HISTORICAL_exampleBeverageV1Configs,
} from '../HISTORICAL_BEVERAGE_V1_TYPES.js';

/*
 * Ensure all historical typings are still valid matches for the current typing.
 */
expectType<BeverageV1Config>(null as unknown as ALL_HISTORICAL_BeverageV1ConfigTypes[number]);

/*
 * Ensure all historical typings are still valid matches for current reference values.
 */
expectType<(typeof exampleBeverageV1Configs)[number]>(
  null as unknown as ALL_HISTORICAL_BeverageV1ConfigTypes[number],
);

/*
 * Ensure the current typing still satisfies all historical typings.
 */
expectAssignable<ALL_HISTORICAL_BeverageV1ConfigTypes[number]>(null as unknown as BeverageV1Config);

/*
 * Ensure the current type still matches all historical reference values.
 */
expectType<(typeof ALL_HISTORICAL_exampleBeverageV1Configs)[number]>(
  null as unknown as BeverageV1Config,
);

describe('BeverageV1 Fetch-Params', () => {
  test.each(
    ALL_HISTORICAL_exampleBeverageV1Configs,
  )('Historical values all pass current schema (index %#)', (exampleConfig) => {
    const result = beverageV1ConfigSchema.safeParse(exampleConfig);
    expect(result.error).toBeFalsy();
  });
});
