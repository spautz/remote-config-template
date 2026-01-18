import { beverageV1PayloadSchema } from '@spautz/myconfig-contracts';
import { describe, expect, test } from 'vitest';

import { CONFIG_FILES } from '../v1Beverage.js';

describe('Current v1Beverage payload', () => {
  // A hardcoded filename isn't a great practice, but it's useful here
  test('still provides the expected filename', () => {
    expect(CONFIG_FILES['v1/beverages.json']).toBeTruthy();
  });

  test.each(Object.keys(CONFIG_FILES))('%s has a valid schema', async (filename) => {
    const payload = await CONFIG_FILES[filename as keyof typeof CONFIG_FILES];

    const result = beverageV1PayloadSchema.safeParse(payload);
    expect(result.error).toBeFalsy();
  });
});
