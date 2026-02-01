import z from 'zod/v4';

/*
 * "Beverages" is just a made-up reference type.
 * https://stevenpautz.com/en/blog/2025/beverages/
 *
 * In this file, a "Beverage Entry" is a single record.
 */

const translationSchema = z.looseObject({
  label: z.string(),
  description: z.string(),
});

/**
 * This tracks the shape of an individual beverage within the v1 payload.
 * In a real app you'd probably get this stuff from a real backend instead of a json config:
 * this is just an example.
 *
 * Schemas should usually be non-strict (z.looseObject(), not z.strictObject()) to accommodate future values.
 */
const v1Beverage_entrySchema = z.looseObject({
  schemaVersion: z.literal(1),
  translations: z.looseObject({
    'en-US': translationSchema,
    'es-ES': translationSchema.optional(),
    'fr-FR': translationSchema.optional(),
    'de-DE': translationSchema.optional(),
  }),
  isAlcoholic: z.boolean(),
  isAvailable: z.boolean(),
});

type V1Beverage_Entry = z.infer<typeof v1Beverage_entrySchema>;

/**
 * Some examples of individual beverages within the v1 payload.
 * We'll run some extra tests for these, to ensure any internal schemaVersion changes are covered.
 */
const v1Beverage_entryExamples = [
  {
    schemaVersion: 1,
    translations: {
      'en-US': {
        label: 'Black Tea',
        description: 'A hearty cup of English tea.',
      },
    },
    isAlcoholic: false,
    isAvailable: false,
  },
  {
    schemaVersion: 1,
    translations: {
      'en-US': {
        label: 'Green Tea',
        description: 'A light cup of tea.',
      },
      'es-ES': {
        label: 'TÃ© verde',
        description: 'Una taza de tÃ© ligero.',
      },
    },
    isAlcoholic: false,
    isAvailable: true,
  },
  {
    schemaVersion: 1,
    translations: {
      'en-US': {
        label: 'Beer',
        description: 'A standard beer.',
      },
      'es-ES': {
        label: 'Cerveza',
        description: 'Una cerveza normal.',
      },
      'fr-FR': {
        label: 'BiÃ¨re',
        description: 'Une biÃ¨re ordinaire.',
      },
      'de-DE': {
        label: 'Bier',
        description: 'Ein Standardbier.',
      },
    },
    isAlcoholic: true,
    isAvailable: true,
  },
] as const satisfies ReadonlyArray<V1Beverage_Entry>;

/**
 * This tracks the shape of a full v1 payload.
 * In a real app you'd probably get this stuff from a backend instead of a json config:
 * this is just an example.
 *
 * Schemas should be non-strict (z.looseObject(), not z.strictObject()) to accommodate future values.
 */
const v1Beverage_payloadSchema = z.looseObject({
  lastUpdatedAt: z.string(),
  beverages: z.array(v1Beverage_entrySchema),
});

type V1Beverage_Payload = z.infer<typeof v1Beverage_payloadSchema>;

/**
 * Some examples of full v1 payloads, used for testing.
 */
const v1Beverage_payloadExamples = [
  {
    lastUpdatedAt: '2026-01-01T00:00:00.000Z',
    beverages: [],
  },
  {
    lastUpdatedAt: '2026-01-02T00:00:00.000Z',
    beverages: [v1Beverage_entryExamples[0]],
  },
  {
    lastUpdatedAt: '2026-01-04T00:00:00.000Z',
    beverages: [...v1Beverage_entryExamples],
  },
] as const satisfies ReadonlyArray<V1Beverage_Payload>;

const isValidV1BeveragePayload = (rawData: unknown): rawData is V1Beverage_Payload => {
  const validation = v1Beverage_payloadSchema.safeParse(rawData);
  return validation.success;
};

const parseV1BeveragePayload = (rawData: unknown): V1Beverage_Payload => {
  return v1Beverage_payloadSchema.parse(rawData);
};

export type { V1Beverage_Entry, V1Beverage_Payload };
export {
  v1Beverage_entrySchema,
  v1Beverage_entryExamples,
  v1Beverage_payloadSchema,
  v1Beverage_payloadExamples,
  isValidV1BeveragePayload,
  parseV1BeveragePayload,
};
