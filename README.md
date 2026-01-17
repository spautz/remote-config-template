# Package-Wrapped Remote Config Template

Shared, type-safe <span style="font-variant:small-caps;">json</span> configs, with a SDK package.

_This is under active development, last updated January 2026. Docs to come._

## [SDK Package: @spautz/myconfig-sdk](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-sdk/README.md)

[![npm version](https://img.shields.io/npm/v/@spautz/myconfig-sdk.svg)](https://www.npmjs.com/package/@spautz/myconfig-sdk)
[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-sdk/README.md)
[![build status](https://github.com/spautz/remote-config-template/workflows/CI/badge.svg)](https://github.com/spautz/remote-config-template/actions)
[![test coverage](https://coveralls.io/repos/github/spautz/remote-config-template/badge.svg?branch=x-cov-myconfig-sdk)](https://coveralls.io/github/spautz/remote-config-template?branch=x-cov-myconfig-sdk)
[![vulnerabilities](https://snyk.io/test/npm/@spautz/myconfig-sdk/badge.svg)](https://snyk.io/test/npm/@spautz/myconfig-sdk)
[![gzip size](https://img.shields.io/bundlephobia/minzip/@spautz/myconfig-sdk.svg)](https://bundlephobia.com/package/@spautz/myconfig-sdk@latest)

SDK used to access the config.

The `myconfig-sdk` provides utilities to fetch, validate, cache, monitor, and backfill config values, in various environments.

## [Config Values: @spautz/myconfig-values](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-values/README.md)

[![npm version](https://img.shields.io/npm/v/@spautz/myconfig-values.svg)](https://www.npmjs.com/package/@spautz/myconfig-values)
[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/package-template/blob/main/packages/myconfig-values/README.md)
[![build status](https://github.com/spautz/remote-config-template/workflows/CI/badge.svg)](https://github.com/spautz/remote-config-template/actions)
[![test coverage](https://coveralls.io/repos/github/spautz/remote-config-template/badge.svg?branch=x-cov-myconfig-values)](https://coveralls.io/github/spautz/remote-config-template?branch=x-cov-myconfig-values)
[![vulnerabilities](https://snyk.io/test/npm/@spautz/myconfig-values/badge.svg)](https://snyk.io/test/npm/@spautz/myconfig-values)

The <span style="font-variant:small-caps;">json</span> values which the config-client accesses.

These files would typically be deployed to a static host, like S3.


## [Contracts Package: @spautz/myconfig-contracts](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-contracts/README.md)

[![npm version](https://img.shields.io/npm/v/@spautz/myconfig-contracts.svg)](https://www.npmjs.com/package/@spautz/myconfig-contracts)
[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-contracts/README.md)
[![build status](https://github.com/spautz/remote-config-template/workflows/CI/badge.svg)](https://github.com/spautz/remote-config-template/actions)
[![test coverage](https://coveralls.io/repos/github/spautz/remote-config-template/badge.svg?branch=x-cov-myconfig-contracts)](https://coveralls.io/github/spautz/remote-config-template?branch=x-cov-myconfig-contracts)
[![vulnerabilities](https://snyk.io/test/npm/@spautz/myconfig-contracts/badge.svg)](https://snyk.io/test/npm/@spautz/myconfig-contracts)
[![gzip size](https://img.shields.io/bundlephobia/minzip/@spautz/myconfig-contracts.svg)](https://bundlephobia.com/package/@spautz/myconfig-contracts@latest)

Internal package that provides common typings for the config values and the client package -- both current and legacy, to ensure backwards compatibility.

## Demos

### [Browser demo](https://github.com/spautz/remote-config-template/blob/main/demos/browser-demo/README.md)

[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/demos/browser-demo/README.md)

Minimal demo app using the SDK to fetch and access values browser-side.

### Server demo

_(Not yet implemented)_

### Full demo

_(Not yet implemented)_

<!--

### [Server demo](https://github.com/spautz/remote-config-template/blob/main/demos/server-demo/README.md)

[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/demos/server-demo/README.md)

Minimal demo app using the SDK to fetch and access values server-side.

### [Fullstack demo](https://github.com/spautz/remote-config-template/blob/main/demos/fullstack-demo/README.md)

[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/demos/fullstack-demo/README.md)

Full demo app using the SDK to fetch and access values in SSR and static prerenders.

-->
