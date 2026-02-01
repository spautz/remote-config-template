import { describe, expect, test } from 'vitest';
import {
  type V1Beverage_Entry,
  type V1Beverage_Payload,
  v1Beverage_entryExamples,
  v1Beverage_entrySchema,
  v1Beverage_payloadExamples,
  v1Beverage_payloadSchema,
} from '../v1BeverageContracts.ts';

// Validate all examples against their typings.
// In general the examples should be `as const satisfies ...`, which would make these checks
// redundant. They're repeated here as an extra safety net.
v1Beverage_entryExamples satisfies ReadonlyArray<V1Beverage_Entry>;
v1Beverage_payloadExamples satisfies ReadonlyArray<V1Beverage_Payload>;

// Validate all examples against their schemas
describe('V1 Beverage Contracts', () => {
  test.each(
    v1Beverage_entryExamples,
  )('Entry examples all pass current schema (#%#)', (exampleEntry) => {
    const result = v1Beverage_entrySchema.safeParse(exampleEntry);
    expect(result.error).toBeFalsy();
  });

  test.each(
    v1Beverage_payloadExamples,
  )('Payload examples all pass current schema (#%#)', (examplePayload) => {
    const result = v1Beverage_payloadSchema.safeParse(examplePayload);
    expect(result.error).toBeFalsy();
  });
});
