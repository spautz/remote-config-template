import z from 'zod/v4';
import type { CONFIG_FILES_FOR_V1_SDK } from './v1ConfigFileNames.ts';

/*
 * "Beverages" is just a made-up reference type.
 * https://stevenpautz.com/en/blog/2025/beverages/
 */

/**
 * Fetch-params track the arguments that a consumer must pass when loading a v1 beverage payload.
 * In this project, there's just one file , so we don't require any fetch params.
 */
type V1FetchParams = Record<never, never>;

const V1_DEFAULT_CONFIG_FILE_PATH: (typeof CONFIG_FILES_FOR_V1_SDK)[number] = 'v1/beverages.json';

const v1FetchParamsSchema = z.strictObject({});

/**
 * A list of current fetch param examples, used for testing.
 */
const v1FetchParamsExamples = [{}] as const satisfies ReadonlyArray<V1FetchParams>;

/**
 * Canonical way to build the path to a particular config file.
 *
 * This SHOULD be used by the SDK to generate the full URL when fetching.
 * This MAY be used by the Values package to generate the CONFIG_FILE keys for filenames.
 */
const convertV1FetchParamsToConfigFilePath = (
  fetchParams?: V1FetchParams,
  skipValidation?: boolean,
): (typeof CONFIG_FILES_FOR_V1_SDK)[number] => {
  if (!skipValidation) {
    const validation = v1FetchParamsSchema.safeParse(fetchParams);
    if (validation.error) {
      throw new Error(`Invalid fetchParams for Beverage config: ${validation.error}`);
    }
  }

  return V1_DEFAULT_CONFIG_FILE_PATH;
};

export type { V1FetchParams };
export {
  V1_DEFAULT_CONFIG_FILE_PATH,
  v1FetchParamsSchema,
  v1FetchParamsExamples,
  convertV1FetchParamsToConfigFilePath,
};
