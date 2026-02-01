/*
 * This file has two strict rules:
 *
 *  1) ONLY ADD, NEVER MODIFY
 *    This file stores the past history of beverage typings for the config.
 *    It's used to ensure that future updates do not break existing consumers.
 *    (If you truly need a breaking change, you should make a new top-level version: V1 -> V2)
 *
 *  2) NO IMPORTS
 *    This file should *duplicate* everything locally: do not import or single-source types
 *    from elsewhere. If those types change in the future, we want these to *not* be in-sync,
 *    so that tests fail if the change isn't backwards-compatible.
 *
 * The type and variable names here are intentionally weird, so that they'll stand out in a PR
 * if somebody changes or references them.
 * Naming convention: `HISTORICAL__{NameOfTypeOrValue}__{MILESTONE_NAME}`
 */

///////////////////////////////////////////////////////////////////////////////////////////////////
// V1 Beverage Entry
//
// Do not use Zod or other libraries: you must manually copy over the typings when they change.
// (This is intentionally painful: you should generally never need to change things once set up.)

/*
 * "ORIGINAL" milestone
 * 2026.01: Initial fields.
 */
type HISTORICAL__V1BeverageEntryType__ORIGINAL = {
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

// This structure tracks types + examples as a single unit, to make bulk tests easier.
const HISTORICAL__v1BeverageEntry__ORIGINAL = {
  milestoneName: 'ORIGINAL',
  type: null as unknown as HISTORICAL__V1BeverageEntryType__ORIGINAL,
  examples: [
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
  ] as const satisfies ReadonlyArray<HISTORICAL__V1BeverageEntryType__ORIGINAL>,
} as const;

/**
 * A list of all historical milestones for v1 beverage entries.
 * Usually there'll only be one, which we never need to change.
 */
const ALL_HISTORICAL__v1BeverageEntryMilestones = [HISTORICAL__v1BeverageEntry__ORIGINAL] as const;

///////////////////////////////////////////////////////////////////////////////////////////////////
// V1 Beverage Payload
//
// Do not use Zod or other libraries: you must manually copy over the typings when they change.
// (This is intentionally painful: you should generally never need to change things once set up.)

/*
 * "ORIGINAL" milestone
 * 2026.01: Initial fields.
 */
type HISTORICAL__V1BeveragePayloadType__ORIGINAL = {
  lastUpdatedAt: string;
  beverages: Array<HISTORICAL__V1BeverageEntryType__ORIGINAL>;
};

// This structure tracks types + examples as a single unit, to make bulk tests easier.
const HISTORICAL__v1BeveragePayload__ORIGINAL = {
  milestoneName: 'ORIGINAL',
  type: null as unknown as HISTORICAL__V1BeveragePayloadType__ORIGINAL,
  examples: [
    {
      lastUpdatedAt: '2026-01-01T00:00:00.000Z',
      beverages: [],
    },
    {
      lastUpdatedAt: '2026-01-02T00:00:00.000Z',
      beverages: [HISTORICAL__v1BeverageEntry__ORIGINAL.examples[0]],
    },
    {
      lastUpdatedAt: '2026-01-02T00:00:00.000Z',
      beverages: [...HISTORICAL__v1BeverageEntry__ORIGINAL.examples],
    },
  ] as const satisfies ReadonlyArray<HISTORICAL__V1BeveragePayloadType__ORIGINAL>,
} as const;

/**
 * A list of all historical milestones for v1 beverage payloads.
 * Usually there'll only be one, which we never need to change.
 */
const ALL_HISTORICAL__v1BeveragePayloadMilestones = [
  HISTORICAL__v1BeveragePayload__ORIGINAL,
] as const;

///////////////////////////////////////////////////////////////////////////////////////////////////
// Rearrange for export
// The "ALL_HISTORICAL__" structures above work better for recording milestones, but for
// reading/processing/testing it's easier when types and examples are separated.

type ALL_HISTORICAL__V1BeverageEntryTypes =
  (typeof ALL_HISTORICAL__v1BeverageEntryMilestones)[number]['type'];
type ALL_HISTORICAL__V1BeveragePayloadTypes =
  (typeof ALL_HISTORICAL__v1BeveragePayloadMilestones)[number]['type'];

// We use a spread to preserve the "as const" types from the examples.
// When adding a new milestone above, you MUST add the new index here.
// (The unit tests double-check that nothing was omitted)
const ALL_HISTORICAL__v1BeverageEntryExamples = [
  ...ALL_HISTORICAL__v1BeverageEntryMilestones[0].examples,
] as const;
const ALL_HISTORICAL__v1BeveragePayloadExamples = [
  ...ALL_HISTORICAL__v1BeveragePayloadMilestones[0].examples,
] as const;

/*
 * DO NOT IMPORT THESE EXCEPT FOR TESTING!
 * See the note at the top of this file for more.
 */
export {
  type ALL_HISTORICAL__V1BeverageEntryTypes,
  type ALL_HISTORICAL__V1BeveragePayloadTypes,
  ALL_HISTORICAL__v1BeverageEntryMilestones,
  ALL_HISTORICAL__v1BeverageEntryExamples,
  ALL_HISTORICAL__v1BeveragePayloadMilestones,
  ALL_HISTORICAL__v1BeveragePayloadExamples,
};
