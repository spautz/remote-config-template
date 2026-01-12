import z from 'zod/v4';

/*
 * "Beverages" is just a made-up reference type.
 * https://stevenpautz.com/en/blog/2025/beverages/
 */

const schemaForEachTranslation = z.object({
  label: z.string(),
  description: z.string(),
});

/**
 * This tracks the shape of some data within the beverageV1 config.
 * In a real app you'd probably get this stuff from a backend instead of a json config:
 * this is just an example.
 *
 * The schema must be non-strict (z.object, not z.strictObject) to accommodate future values.
 */
const beverageV1InfoSchema = z.object({
  schemaVersion: z.literal(1),
  translations: z.object({
    'en-US': schemaForEachTranslation,
    'es-ES': schemaForEachTranslation.optional(),
    'fr-FR': schemaForEachTranslation.optional(),
    'de-DE': schemaForEachTranslation.optional(),
  }),
  isAlcoholic: z.boolean(),
  isAvailable: z.boolean(),
});

type BeverageV1Info = z.infer<typeof beverageV1InfoSchema>;

/**
 * Some valid examples of data within the beverageV1 config.
 */
const exampleBeverageV1Values: Array<BeverageV1Info> = [
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

export type { BeverageV1Info };
export { beverageV1InfoSchema, exampleBeverageV1Values };
