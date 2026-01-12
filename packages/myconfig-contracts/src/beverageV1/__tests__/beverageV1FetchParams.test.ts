import { expectAssignable, expectType } from 'tsd';
import { describe, expect, test } from 'vitest';

import {
  type BeverageV1FetchParams,
  beverageV1FetchParamsSchema,
  type exampleBeverageV1FetchParams,
} from '../beverageV1FetchParams.ts';
import {
  type ALL_HISTORICAL_BeverageV1FetchParams,
  ALL_HISTORICAL_exampleBeverageV1FetchParams,
} from '../HISTORICAL_BEVERAGE_V1_TYPES.ts';

/*
 * Ensure all historical typings are still valid matches for the current typing.
 */
expectType<BeverageV1FetchParams>(null as unknown as ALL_HISTORICAL_BeverageV1FetchParams[number]);

/*
 * Ensure all historical typings are still valid matches for current reference values.
 */
expectType<(typeof exampleBeverageV1FetchParams)[number]>(
  null as unknown as ALL_HISTORICAL_BeverageV1FetchParams[number],
);

/*
 * Ensure the current typing still satisfies all historical typings.
 */
expectAssignable<ALL_HISTORICAL_BeverageV1FetchParams[number]>(
  null as unknown as BeverageV1FetchParams,
);

/*
 * Ensure the current type still matches all historical reference values.
 */
expectType<(typeof ALL_HISTORICAL_exampleBeverageV1FetchParams)[number]>(
  null as unknown as BeverageV1FetchParams,
);

describe('BeverageV1 Fetch-Params', () => {
  test.each(
    ALL_HISTORICAL_exampleBeverageV1FetchParams,
  )('Historical values all pass current schema (index %#)', (exampleFetchParams) => {
    const result = beverageV1FetchParamsSchema.safeParse(exampleFetchParams);
    expect(result.error).toBeFalsy();
  });
});
