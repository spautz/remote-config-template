import { describe, expect, test } from 'vitest';

import { ALL_HISTORICAL_V1_CONFIG_FILE_PATHS } from '../HISTORICAL_V1_CONFIG_FILE_NAMES.ts';
import { CONFIG_FILES_FOR_V1_SDK } from '../v1ConfigFileNames.ts';

describe('v1ConfigFileNames', () => {
  test('SDK config files are recorded in historical paths', () => {
    for (const configFilePath of CONFIG_FILES_FOR_V1_SDK) {
      expect(ALL_HISTORICAL_V1_CONFIG_FILE_PATHS).toContain(configFilePath);
    }
  });
});
