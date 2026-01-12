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
 *    we'd rather have things break here if there is an accidental change.
 *    Similarly, avoid assigning explicit types here (except for `as const` on values).
 *
 * The type and variable names here are _intentionally weird_ (especially in casing),
 * to discourage their use outside of this file.
 */

///////////////////////////////////////////////////////////////////////////////////////////////////
// Fetch params
//
// Hardcode **values and types** from the original version of the contract,
// and any significant milestones or good tests cases.
//
// Naming convention: `HISTORICAL_{NameOfTypeOrValue}__{Description}`

/**
 * 2026.01: No parameters are needed when loading beverage info.
 */
type HISTORICAL_BeverageV1FetchParams__ORIGINAL = undefined | Record<never, never>;

const HISTORICAL_exampleBeverageV1FetchParams__NONE = undefined;
const HISTORICAL_exampleBeverageV1FetchParams__EMPTY = {};

/**
 * A list of all historical milestones for BeverageV1 fetch params (types & values)
 */
type ALL_HISTORICAL_BeverageV1FetchParams = [HISTORICAL_BeverageV1FetchParams__ORIGINAL];

const ALL_HISTORICAL_exampleBeverageV1FetchParams = [
  HISTORICAL_exampleBeverageV1FetchParams__NONE,
  HISTORICAL_exampleBeverageV1FetchParams__EMPTY,
];

///////////////////////////////////////////////////////////////////////////////////////////////////
// Values
//
// Do not use Zod or any other external tools here: you must manually copy over the typings when they change.
// (This is intentionally painful: you should generally never need to change things once set up.)

/**
 * 2026.01: Initial fields.
 */
type HISTORICAL_BeverageV1Info__ORIGINAL = {
  schemaVersion: 1;
  translations: {
    'en-US': {
      label: string;
      description: string;
    };
    'es-ES'?: {
      label: string;
      description: string;
    };
    'fr-FR'?: {
      label: string;
      description: string;
    };
    'de-DE'?: {
      label: string;
      description: string;
    };
  };
  isAlcoholic: boolean;
  isAvailable: boolean;
};

const HISTORICAL_exampleBeverageV1Info__ORIGINAL1 = {
  schemaVersion: 1,
  translations: {
    'en-US': {
      label: 'Black Tea',
      description: 'A hearty cup of English tea.',
    },
  },
  isAlcoholic: false,
  isAvailable: false,
} as const;
const HISTORICAL_exampleBeverageV1Info__ORIGINAL2 = {
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
} as const;
const HISTORICAL_exampleBeverageV1Info__ORIGINAL3 = {
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
} as const;

/**
 * A list of all historical milestones for BeverageV1 fetch params (types & values)
 */
type ALL_HISTORICAL_BeverageV1Info = [HISTORICAL_BeverageV1Info__ORIGINAL];

const ALL_HISTORICAL_exampleBeverageV1Info = [
  HISTORICAL_exampleBeverageV1Info__ORIGINAL1,
  HISTORICAL_exampleBeverageV1Info__ORIGINAL2,
  HISTORICAL_exampleBeverageV1Info__ORIGINAL3,
];

///////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * NEVER MODIFY OR REMOVE THESE EXPORTS!
 * DO NOT IMPORT THESE EXCEPT FOR TESTING!
 * See the note at the top of this file for more.
 */
export type { ALL_HISTORICAL_BeverageV1FetchParams, ALL_HISTORICAL_BeverageV1Info };
export { ALL_HISTORICAL_exampleBeverageV1FetchParams, ALL_HISTORICAL_exampleBeverageV1Info };
