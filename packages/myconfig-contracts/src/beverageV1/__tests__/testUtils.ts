import { expectAssignable as tsdExpectAssignable } from 'tsd';

type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : Readonly<T>;

/**
 * A helper to allow `as const` example values to be checked against type contracts.
 * (TSD's doesn't like readonly-ness)
 */
const expectAssignable: <T>(expression: DeepReadonly<T>) => void = tsdExpectAssignable;

export { expectAssignable };
