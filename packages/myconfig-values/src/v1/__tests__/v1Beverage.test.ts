import { beverageV1ConfigSchema } from '@spautz/myconfig-contracts';
import { describe, expect, test } from 'vitest';

import { CONFIG_FILES } from '../v1Beverage.js';

describe('Current v1Beverage config', () => {
  // A hardcoded filename isn't a great practice, but it's useful here
  test('still provides the expected filename', () => {
    expect(CONFIG_FILES['beverages.json']).toBeTruthy();
  });

  test.each(Object.keys(CONFIG_FILES))('%s has a valid schema', async (filename) => {
    const configValue = await CONFIG_FILES[filename as keyof typeof CONFIG_FILES];

    const result = beverageV1ConfigSchema.safeParse(configValue);
    expect(result.error).toBeFalsy();
  });
});
