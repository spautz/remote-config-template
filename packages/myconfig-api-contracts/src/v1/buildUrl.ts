const buildUrl = (path: string, baseUrl: string | URL): URL => new URL(path, baseUrl);

const buildUrlString = (path: string, baseUrl: string | URL): string =>
  buildUrl(path, baseUrl).toString();

export { buildUrl, buildUrlString };
