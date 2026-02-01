/*
 * "Config files" are the actual remote .json files that the config package provides.
 * Each file contains a payload that follows a specific contract.
 *
 * In general, separate json files are only needed if you need to split the config or expose
 * subsets of the data. If you're just adding new data fields, update the contracts instead.
 *
 * A config file path must NEVER be removed once it's been published, except in a new major version.
 */

/**
 * A config file that's being added but isn't yet revealed through the SDK.
 * These can be accessed in local dev only.
 */
const STATUS_IN_DEVELOPMENT = 1;
/**
 * A config file that's been published to consumers, in both the values package and the SDK.
 */
const STATUS_PUBLISHED = 2;
/**
 * A previously-published config file that we'd like to get rid of -- except you must NEVER remove
 * files. So this just flags them for removal in v2.
 */
const STATUS_REMOVE_IN_NEXT_MAJOR_VERSION = 3;

type ConfigFileStatus =
  | typeof STATUS_IN_DEVELOPMENT
  | typeof STATUS_PUBLISHED
  | typeof STATUS_REMOVE_IN_NEXT_MAJOR_VERSION;

/**
 * The config file paths exposed by the values package.
 *
 * When adding an item here, also add it to HISTORICAL_V1_FETCH_PARAMS.
 *
 * NEVER REMOVE AN ITEM FROM THIS LIST ONCE IT'S BEEN PUBLISHED! It's okay to stop accessing
 * a no-longer-needed file, but it must remain because old SDK versions may ask for it.
 */
const ALL_POTENTIAL_V1_CONFIG_FILE_PATHS = {
  'v1/beverages.json': STATUS_PUBLISHED,
} as const satisfies Record<string, ConfigFileStatus>;

type V1ConfigFilePath = keyof typeof ALL_POTENTIAL_V1_CONFIG_FILE_PATHS;

const CONFIG_FILES_FOR_V1_VALUES = Object.keys(
  ALL_POTENTIAL_V1_CONFIG_FILE_PATHS,
) as V1ConfigFilePath[];

const CONFIG_FILES_FOR_V1_SDK = CONFIG_FILES_FOR_V1_VALUES.filter(
  (configFileName): configFileName is V1ConfigFilePath => {
    // This split avoids making Typescript unhappy when all files have a status other than
    // STATUS_IN_DEVELOPMENT
    const status = ALL_POTENTIAL_V1_CONFIG_FILE_PATHS[configFileName] as ConfigFileStatus;
    return status !== STATUS_IN_DEVELOPMENT;
  },
);

export { CONFIG_FILES_FOR_V1_VALUES, CONFIG_FILES_FOR_V1_SDK };
