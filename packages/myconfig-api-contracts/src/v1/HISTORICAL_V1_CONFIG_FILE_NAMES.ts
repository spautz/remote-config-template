/*
 * This file has two strict rules:
 *
 *  1) ONLY ADD, NEVER MODIFY
 *    This file stores the past history of JSON files that were ever generated for the config.
 *    It's used to ensure that future updates do not break existing consumers.
 *    (If there is truly a breaking change, you should make a new top-level version: V1 -> V2)
 *
 *  2) NO IMPORTS
 *    This file should *duplicate* everything locally: do not import or single-source types
 *    from elsewhere. If those types change in the future, we want these to *not* be in-sync,
 *    so that tests fail if the change isn't backwards-compatible.
 *
 * The type and variable names here are _intentionally weird_ (especially in casing),
 * so that they'll stand out in a PR if somebody changes or references them.
 * Naming convention: `HISTORICAL__{NameOfTypeOrValue}__{MilestoneName}`
 */

const ALL_HISTORICAL_V1_CONFIG_FILE_PATHS = ['v1/beverages.json'];

/*
 * DO NOT IMPORT THESE EXCEPT FOR TESTING!
 * See the note at the top of this file for more.
 */
export { ALL_HISTORICAL_V1_CONFIG_FILE_PATHS };
