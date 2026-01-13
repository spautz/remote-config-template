import type { BeverageV1Config, BeverageV1FetchParams } from '@spautz/myconfig-contracts';

async function getBackupConfigFromValuesPackage(
  _fetchParams: BeverageV1FetchParams,
): Promise<BeverageV1Config> {
  const module = await import('@spautz/myconfig-values/configs/v1/beverages.json', {
    with: { type: 'json' },
  });

  // @TODO: Validate against beverageV1ConfigSchema, with some further fallback

  return module.default as BeverageV1Config;
}

export { getBackupConfigFromValuesPackage };
