/*
 * Each top-level version records (1) which files must actually exist, and (2) any parameters
 * used to fetch files through the SDK's API.
 */

/*
 * Entry-types track the individual values that will be found within the config files.
 */
export * from './entry-types/featureFlagsV1.ts';
export * from './v1.ts';
