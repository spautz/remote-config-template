/*
 * This file has two strict rules:
 *
 *  1) ONLY ADD, NEVER MODIFY
 *    This file stores the past history of API contracts and example values.
 *    It's used to ensure that newer versions of the configs do not break existing consumers.
 *    (If there is truly a breaking change, you should make a new top-level version: V1 -> V2)
 *
 *  2) NO SHARED TYPINGS
 *    This file should *duplicate* everything locally: do not import or single-source types
 *    from elsewhere. We don't want these types to change out from under us:
 *    we'd rather have things break here if there is an issue or accidental change.
 *
 * The type and variable names here are _intentionally weird_ (especially in casing),
 * to discourage their use outside of this file.
 */

///////////////////////////////////////////////////////////////////////////////////////////////////
// Fetch params
//
// Hardcode **values and types** from original versions of the contract, to ensure that new versions
// are backwards-compatible.

/**
 * 2026.01: No parameters are needed when loading feature flags.
 */
type FEATURE_FLAG_FETCH_PARAMS_V1__Original_Type = undefined | Record<never, never>;

const FEATURE_FLAG_FETCH_PARAMS_V1__Original_Examples: Array<FEATURE_FLAG_FETCH_PARAMS_V1__Original_Type> =
  [{}, undefined];

/**
 * You can add additional milestones to test, in addition to "Original" above.
 * Ideally this shouldn't be necessary in most cases (everything should be fully backwards-compatible
 * both to and from "Original"), but it can be useful if a past release wasn't fully backwards-compatible.
 */
const HISTORICAL_FEATURE_FLAG_V1_FETCH_PARAMS = [
  ...FEATURE_FLAG_FETCH_PARAMS_V1__Original_Examples,
];

///////////////////////////////////////////////////////////////////////////////////////////////////
// Values

type FEATURE_FLAG_VALUE_V1__Original_Type = {
  schemaVersion: 1;
  enableBeveragesFeature?: boolean;
  enableEasterEggs?: boolean;
};

const FEATURE_FLAG_VALUE_V1__Original_Examples: Array<FEATURE_FLAG_VALUE_V1__Original_Type> = [
  {
    schemaVersion: 1,
  },
  {
    schemaVersion: 1,
    enableBeveragesFeature: true,
    enableEasterEggs: true,
  },
];

/**
 You can add additional milestones to test, in addition to "Original" above.
 Ideally this shouldn't be necessary in most cases (everything should be fully backwards-compatible
 both to and from "Original"), but it can be useful if a past release wasn't fully backwards-compatible.
 */
const HISTORICAL_FEATURE_FLAG_V1_VALUES = [...FEATURE_FLAG_VALUE_V1__Original_Examples];

///////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * NEVER MODIFY OR REMOVE THESE EXPORTS!
 * DO NOT IMPORT THESE EXCEPT FOR TESTING!
 * See the note at the top of this file for more.
 */
export { HISTORICAL_FEATURE_FLAG_V1_FETCH_PARAMS, HISTORICAL_FEATURE_FLAG_V1_VALUES };
