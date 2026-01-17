import {
  type BeverageV1FetchParams,
  type BeverageV1Payload,
  convertBeverageV1FetchParamsToURLPath,
} from '@spautz/myconfig-contracts';

/**
 * Supplies a config file from the Values package under node_modules.
 * This should always succeed in Node environments, and it can work as a fallback if an up-to-date
 * copy of the config file cannot be fetched from the remote source.
 */
const internal_loadBackupConfigFromValuesPackage = async (
  filePath: string,
): Promise<BeverageV1Payload> => {
  // @TODO: Handle import errors

  const module = await import(`@spautz/myconfig-values/configs/${filePath}`, {
    with: { type: 'json' },
  });

  // @TODO: Validate against beverageV1PayloadSchema, with some further fallback

  return module.default as BeverageV1Payload;
};

/**
 * Supplies a `v1Beverage` config file from the Values package under node_modules.
 * This should always succeed in Node environments, and it can work as a fallback if an up-to-date
 * copy of the config file cannot be fetched from the remote source.
 */
const loadV1BeverageBackupConfig = async (
  fetchParams: BeverageV1FetchParams,
): Promise<BeverageV1Payload> => {
  const filePath = convertBeverageV1FetchParamsToURLPath(fetchParams);
  return internal_loadBackupConfigFromValuesPackage(filePath);
};

export { internal_loadBackupConfigFromValuesPackage, loadV1BeverageBackupConfig };
