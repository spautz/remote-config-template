import z from 'zod/v4';

/*
 * "Beverages" is just a made-up reference type.
 * https://stevenpautz.com/en/blog/2025/beverages/
 */

/**
 * Fetch-params track the arguments that a consumer must pass when loading a beverageV1 config file.
 * In this case, there's just one file with beverage info: no params required.
 */
const beverageV1FetchParamsSchema = z.union([z.literal(undefined), z.strictObject({})]);

type BeverageV1FetchParams = undefined | Record<never, never>;

/**
 * A list of current fetch param examples, used for testing.
 */

const exampleBeverageV1FetchParams: Array<BeverageV1FetchParams> = [undefined, {}];

export type { BeverageV1FetchParams };
export { beverageV1FetchParamsSchema, exampleBeverageV1FetchParams };
