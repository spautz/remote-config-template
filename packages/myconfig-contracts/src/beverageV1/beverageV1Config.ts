import z from 'zod/v4';

import { beverageV1EntryExamples, beverageV1EntrySchema } from './beverageV1NestedValues.js';

/*
 * "Beverages" is just a made-up reference type.
 * https://stevenpautz.com/en/blog/2025/beverages/
 */

/**
 * This tracks the shape of a full beverageV1 config.
 * In a real app you'd probably get this stuff from a backend instead of a json config:
 * this is just an example.
 *
 * Schemas should be non-strict (z.object, not z.strictObject) to accommodate future values.
 */
const beverageV1ConfigSchema = z.object({
  lastUpdatedAt: z.string(),
  beverages: z.array(beverageV1EntrySchema),
});

type BeverageV1Config = z.infer<typeof beverageV1ConfigSchema>;

/**
 * Some examples of full beverageV1 configs, used for testing.
 */
const beverageV1ConfigExamples = [
  {
    lastUpdatedAt: '2026-01-01T00:00:00.000Z',
    beverages: [],
  },
  {
    lastUpdatedAt: '2026-01-02T00:00:00.000Z',
    beverages: [beverageV1EntryExamples[0]],
  },
  {
    lastUpdatedAt: '2026-01-04T00:00:00.000Z',
    beverages: [...beverageV1EntryExamples],
  },
] as const;

export type { BeverageV1Config };
export { beverageV1ConfigSchema, beverageV1ConfigExamples };
