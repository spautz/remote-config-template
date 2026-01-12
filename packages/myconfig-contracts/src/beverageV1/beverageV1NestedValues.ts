import z from 'zod/v4';

/*
 * "Beverages" is just a made-up reference type.
 * https://stevenpautz.com/en/blog/2025/beverages/
 */

const schemaForOneTranslation = z.object({
  label: z.string(),
  description: z.string(),
});

/**
 * This tracks the shape of an individual beverage within the beverageV1 config.
 * In a real app you'd probably get this stuff from a real backend instead of a json config:
 * this is just an example.
 *
 * Schemas should usually be non-strict (z.object, not z.strictObject) to accommodate future values.
 */
const schemaForOneBeverage = z.object({
  schemaVersion: z.literal(1),
  translations: z.object({
    'en-US': schemaForOneTranslation,
    'es-ES': schemaForOneTranslation.optional(),
    'fr-FR': schemaForOneTranslation.optional(),
    'de-DE': schemaForOneTranslation.optional(),
  }),
  isAlcoholic: z.boolean(),
  isAvailable: z.boolean(),
});

/**
 * Some examples of individual beverages within the beverageV1 config.
 * We'll run some extra tests for these, to ensure any internal schemaVersion changes are covered.
 */
const exampleBeverageValues: Array<z.infer<typeof schemaForOneBeverage>> = [
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
        label: 'Té verde',
        description: 'Una taza de té ligero.',
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
        label: 'Bière',
        description: 'Une bière ordinaire.',
      },
      'de-DE': {
        label: 'Bier',
        description: 'Ein Standardbier.',
      },
    },
    isAlcoholic: true,
    isAvailable: true,
  },
];

export { schemaForOneBeverage, exampleBeverageValues };
