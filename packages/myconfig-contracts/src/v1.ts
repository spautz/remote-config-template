import z from 'zod/v4';

import { featureFlagsV1Schema } from './entry-types/featureFlagsV1.ts';

/*
 * Feature Flags
 * A single feature-flag file is expected, with a static name.
 */

/**
 * IMPORTANT: You should only ADD to this list, never remove.
 * This typing is used to ensure that the config is generating all expected files.
 */
export const myconfigV1_AllFilesSchema = z.object({
  'feature-flags.json': featureFlagsV1Schema,
});

export type MyConfigV1_AllFiles = z.infer<typeof myconfigV1_AllFilesSchema>;
