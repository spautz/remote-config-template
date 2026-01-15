import { CONFIG_FILES as v1BeverageFiles } from './v1/v1Beverage.ts';

/**
 * The package's only export: the specific list of files available. These may be directly imported
 * from the package, but in most cases you probably want to use the SDK package instead.
 *
 * If you do want to manually pluck a specific file, `convertFetchParamsToURLPath` offers a better
 * dev experience than reading this directly.
 */
export const ALL_CONFIG_FILE_PATHS = Object.keys(v1BeverageFiles);
