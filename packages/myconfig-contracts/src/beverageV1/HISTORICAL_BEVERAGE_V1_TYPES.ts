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
type ALL_HISTORICAL_BeverageV1FetchParamTypes = [HISTORICAL_BeverageV1FetchParams__ORIGINAL];

const ALL_HISTORICAL_exampleBeverageV1FetchParams = [
  HISTORICAL_exampleBeverageV1FetchParams__NONE,
  HISTORICAL_exampleBeverageV1FetchParams__EMPTY,
];

///////////////////////////////////////////////////////////////////////////////////////////////////
// Nested Values
//
// Do not use Zod or any other external tools here: you must manually copy over the typings when they change.
// (This is intentionally painful: you should generally never need to change things once set up.)

/**
 * 2026.01: Initial fields.
 */
type HISTORICAL_BeverageRecord__ORIGINAL = {
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

const HISTORICAL_exampleBeverageRecord__ORIGINAL1 = {
  schemaVersion: 1,
  translations: {
    'en-US': {
      label: 'Black Tea',
      description: 'A hearty cup of English tea.',
    },
  },
  isAlcoholic: false,
  isAvailable: false,
};
const HISTORICAL_exampleBeverageRecord__ORIGINAL2 = {
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
};
const HISTORICAL_exampleBeverageRecord__ORIGINAL3 = {
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
};

/**
 * A list of all historical milestones for nested beverage data (types & values)
 */
type ALL_HISTORICAL_BeverageRecordTypes = [HISTORICAL_BeverageRecord__ORIGINAL];

const ALL_HISTORICAL_exampleBeverageRecords = [
  HISTORICAL_exampleBeverageRecord__ORIGINAL1,
  HISTORICAL_exampleBeverageRecord__ORIGINAL2,
  HISTORICAL_exampleBeverageRecord__ORIGINAL3,
];

///////////////////////////////////////////////////////////////////////////////////////////////////
// Full BeverageV1 Configs
//
// Do not use Zod or any other external tools here: you must manually copy over the typings when they change.
// (This is intentionally painful: you should generally never need to change things once set up.)

/**
 * 2026.01: Initial fields.
 */
type HISTORICAL_BeverageV1Config__ORIGINAL = {
  lastUpdatedAt: string;
  beverages: Array<ALL_HISTORICAL_BeverageRecordTypes[number]>;
};

const HISTORICAL_exampleBeverageV1Config__ORIGINAL1 = {
  lastUpdatedAt: '2026-01-01T00:00:00.000Z',
  beverages: [],
};
const HISTORICAL_exampleBeverageV1Config__ORIGINAL2 = {
  lastUpdatedAt: '2026-01-02T00:00:00.000Z',
  beverages: [HISTORICAL_exampleBeverageRecord__ORIGINAL1],
};
const HISTORICAL_exampleBeverageV1Config__ORIGINAL3 = {
  lastUpdatedAt: '2026-01-02T00:00:00.000Z',
  beverages: [
    HISTORICAL_exampleBeverageRecord__ORIGINAL1,
    HISTORICAL_exampleBeverageRecord__ORIGINAL2,
    HISTORICAL_exampleBeverageRecord__ORIGINAL3,
  ],
};

/**
 * A list of all historical milestones for full BeverageV1 configs (types & values)
 */
type ALL_HISTORICAL_BeverageV1ConfigTypes = [HISTORICAL_BeverageV1Config__ORIGINAL];

const ALL_HISTORICAL_exampleBeverageV1Configs = [
  HISTORICAL_exampleBeverageV1Config__ORIGINAL1,
  HISTORICAL_exampleBeverageV1Config__ORIGINAL2,
  HISTORICAL_exampleBeverageV1Config__ORIGINAL3,
];

///////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * NEVER MODIFY OR REMOVE THESE EXPORTS!
 * DO NOT IMPORT THESE EXCEPT FOR TESTING!
 * See the note at the top of this file for more.
 */
export type {
  ALL_HISTORICAL_BeverageV1FetchParamTypes,
  ALL_HISTORICAL_BeverageRecordTypes,
  ALL_HISTORICAL_BeverageV1ConfigTypes,
};
export {
  ALL_HISTORICAL_exampleBeverageV1FetchParams,
  ALL_HISTORICAL_exampleBeverageRecords,
  ALL_HISTORICAL_exampleBeverageV1Configs,
};
