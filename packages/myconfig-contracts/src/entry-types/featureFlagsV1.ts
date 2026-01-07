import z from 'zod/v4';

/*
 * This is an example of how you might represent feature flags in a simple remote-config setup.
 *
 * Each `FeatureFlags` config provides a list of flag names, each with a simple booleans.
 * Future schema versions could add other fields, like dates, conditions, or other metadata,
 * but this one is kept simple for example purposes.
 */

/**
 * Current shape of a FeatureFlags config (version 1).
 * This is non-strict (z.object, not z.strictObject) to accommodate future values,
 * and individual flags are option because they may be removed in the future.
 */
export const featureFlagsV1Schema = z.object({
  schemaVersion: z.literal(1),
  enableBeveragesFeature: z.boolean().optional(),
  enableEasterEggs: z.boolean().optional(),
  enableLegacyStuff: z.boolean().optional(),
});

export type FeatureFlagsV1 = z.infer<typeof featureFlagsV1Schema>;

/**
 NEVER CHANGE THIS!
 * This records the original shape for a ServiceSettings config (version 1).
 * It's used to ensure future adjustments are backwards-compatible.
 * It MUST never extend be modified, extend another type, nor extended by another type.
 */
export type ORIGINAL_FEATURE_FLAGS_V1 = Readonly<{
  schemaVersion: 1;
  enableBeveragesFeature?: boolean;
  enableEasterEggs?: boolean;
}>;
