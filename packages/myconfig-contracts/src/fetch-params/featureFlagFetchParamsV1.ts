/**
 * Feature flags are stored in a single file: no params are required to load them
 */
type FeatureFlagFetchParamsV1 = undefined | Record<never, never>;

const exampleFeatureFlagFetchParamsV1: Array<FeatureFlagFetchParamsV1> = [undefined, {}];

export type { FeatureFlagFetchParamsV1 };
export { exampleFeatureFlagFetchParamsV1 };
