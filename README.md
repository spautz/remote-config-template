# Remote Config Template

Template for a shared, type-safe json config for web apps.

## [@spautz/myconfig-sdk](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-sdk/README.md)

[![npm version](https://img.shields.io/npm/v/@spautz/myconfig-sdk.svg)](https://www.npmjs.com/package/@spautz/myconfig-sdk)
[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-sdk/README.md)
[![build status](https://github.com/spautz/remote-config-template/workflows/CI/badge.svg)](https://github.com/spautz/remote-config-template/actions)
[![test coverage](https://img.shields.io/coveralls/github/spautz/remote-config-template/main.svg)](https://coveralls.io/github/spautz/remote-config-template?branch=main)
[![repo vulnerabilities](https://snyk.io/test/github/spautz/remote-config-template/badge.svg)](https://snyk.io/test/github/spautz/remote-config-template)
[![gzip size](https://img.shields.io/bundlephobia/minzip/@spautz/myconfig-sdk.svg)](https://bundlephobia.com/package/@spautz/myconfig-sdk@latest)

SDK used to access the config.

The `myconfig-sdk` provides utilities to fetch, validate, cache, monitor, and backfill config values, in various environments.

## Also in this repo

#### [Config Values](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-values/README.md)

[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-values/README.md)
[![test coverage](https://coveralls.io/repos/github/spautz/remote-config-template/badge.svg?branch=x-cov-myconfig-values)](https://coveralls.io/github/spautz/remote-config-template?branch=x-cov-myconfig-values)

The json values which the config-client accesses.

#### [@spautz/myconfig-contracts](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-contracts/README.md)

[![npm version](https://img.shields.io/npm/v/@spautz/myconfig-contracts.svg)](https://www.npmjs.com/package/@spautz/myconfig-contracts)
[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/packages/myconfig-contracts/README.md)
[![test coverage](https://coveralls.io/repos/github/spautz/remote-config-template/badge.svg?branch=x-cov-myconfig-contracts)](https://coveralls.io/github/spautz/remote-config-template?branch=x-cov-myconfig-contracts)

Internal package that provides common typings for the config values and the client package -- both current and legacy, to ensure backwards compatibility.



#### [Server demo](https://github.com/spautz/remote-config-template/blob/main/demos/server-demo/README.md)

[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/demos/server-demo/README.md)

Simple demo app using the myconfig-SDK to fetch and access values server-side.

#### [Browser demo](https://github.com/spautz/remote-config-template/blob/main/demos/browser-demo/README.md)

[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/demos/browser-demo/README.md)

Simple demo app using the myconfig-SDK to fetch and access values browser-side.

#### [Fullstack demo](https://github.com/spautz/remote-config-template/blob/main/demos/fullstack-demo/README.md)

[![readme](https://img.shields.io/badge/-readme-informational)](https://github.com/spautz/remote-config-template/blob/main/demos/fullstack-demo/README.md)

Full demo app using the myconfig-SDK to fetch and access values in SSR and static prerenders.
