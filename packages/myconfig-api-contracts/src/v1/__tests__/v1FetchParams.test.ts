import { describe, expect, test } from 'vitest';
import {
  convertV1FetchParamsToConfigFilePath,
  V1_DEFAULT_CONFIG_FILE_PATH,
  type V1FetchParams,
  v1FetchParamsExamples,
  v1FetchParamsSchema,
} from '../v1FetchParams.ts';

// The current examples must match the current typings
v1FetchParamsExamples satisfies ReadonlyArray<V1FetchParams>;

// Finally, validate all examples against the schema
describe('V1 FetchParams', () => {
  test.each(v1FetchParamsExamples)('Examples all pass current schema (#%#)', (example) => {
    const result = v1FetchParamsSchema.safeParse(example);
    expect(result.error).toBeFalsy();
  });

  test('Fetch param conversion defaults to the only config file', () => {
    expect(convertV1FetchParamsToConfigFilePath(undefined)).toBe(V1_DEFAULT_CONFIG_FILE_PATH);
    expect(convertV1FetchParamsToConfigFilePath({})).toBe(V1_DEFAULT_CONFIG_FILE_PATH);
  });

  test('Fetch param conversion rejects invalid values by default', () => {
    expect(() =>
      convertV1FetchParamsToConfigFilePath({ invalid: true } as unknown as V1FetchParams),
    ).toThrow();
  });
});
