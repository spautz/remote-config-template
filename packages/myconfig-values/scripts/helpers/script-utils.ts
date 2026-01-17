/* biome-ignore-all lint/suspicious/noConsole: This is for shell scripts */
/* eslint-ignore no-console */
/* oxlint-disable no-console */

/**
 * This doesn't do anything of value yet: just a thin wrapper around console.log
 */
function consoleLog(...args: Array<unknown>): void {
  console.log(...args);
}

/**
 * This doesn't do anything of value yet: just a thin wrapper around console.error
 */
function consoleError(...args: Array<unknown>): void {
  console.error('ERROR: ', ...args);
}

export { consoleLog, consoleError };
