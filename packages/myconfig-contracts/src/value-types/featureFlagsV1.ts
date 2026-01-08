import z from 'zod/v4';

/*
 * This is an example of how you might represent feature flags in a simple remote-config setup.
 *
 * Each `FeatureFlags` config (V1) provides a list of flag names, each with a simple booleans.
 * Future schema versions could add other fields, like dates, conditions, or other metadata,
 * but this one is kept simple for example purposes.
 *
 * Snapshots of the original state are archived in `../HISTORICAL_V1_TYPES.ts`
 */

/**
 * Current shape of a FeatureFlags config (version 1).
 * This is non-strict (z.object, not z.strictObject) to accommodate future values,
 * and individual flags are optional because they may be removed in the future.
 */
export const featureFlagValuesV1Schema = z.object({
  schemaVersion: z.literal(1),
  enableBeveragesFeature: z.boolean().optional(),
  enableEasterEggs: z.boolean().optional(),
  enableLegacyStuff: z.boolean().optional(),
});

export type FeatureFlagValuesV1 = z.infer<typeof featureFlagValuesV1Schema>;
