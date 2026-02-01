import { describe, expect, test } from 'vitest';
import {
  type ALL_HISTORICAL__V1BeverageEntryTypes,
  type ALL_HISTORICAL__V1BeveragePayloadTypes,
  ALL_HISTORICAL__v1BeverageEntryExamples,
  ALL_HISTORICAL__v1BeverageEntryMilestones,
  ALL_HISTORICAL__v1BeveragePayloadExamples,
  ALL_HISTORICAL__v1BeveragePayloadMilestones,
} from '../HISTORICAL_V1_BEVERAGE_CONTRACTS.ts';
import {
  type V1Beverage_Entry,
  type V1Beverage_Payload,
  v1Beverage_entryExamples,
  v1Beverage_entrySchema,
  v1Beverage_payloadExamples,
  v1Beverage_payloadSchema,
} from '../v1BeverageContracts.ts';

// Validate all historical examples against the historical typings.
// In general the examples should be `as const satisfies ...`, which would make these checks
// redundant. They're repeated here as an extra safety net.
ALL_HISTORICAL__v1BeverageEntryExamples satisfies Readonly<
  Array<ALL_HISTORICAL__V1BeverageEntryTypes>
>;
ALL_HISTORICAL__v1BeveragePayloadExamples satisfies Readonly<
  Array<ALL_HISTORICAL__V1BeveragePayloadTypes>
>;

// Historical examples must still be valid for the current types,
ALL_HISTORICAL__v1BeverageEntryExamples satisfies Readonly<Array<V1Beverage_Entry>>;
ALL_HISTORICAL__v1BeveragePayloadExamples satisfies Readonly<Array<V1Beverage_Payload>>;

// The current types and the current examples must satisfy the historical contracts
null as unknown as V1Beverage_Entry satisfies ALL_HISTORICAL__V1BeverageEntryTypes;
null as unknown as V1Beverage_Payload satisfies ALL_HISTORICAL__V1BeveragePayloadTypes;

v1Beverage_entryExamples satisfies Readonly<Array<ALL_HISTORICAL__V1BeverageEntryTypes>>;
v1Beverage_payloadExamples satisfies Readonly<Array<ALL_HISTORICAL__V1BeveragePayloadTypes>>;

describe('HISTORICAL_V1_BEVERAGE_CONTRACTS', () => {
  // Ensure that the historical examples include all milestones
  // (If you missed one, it needs to be added to the bottom of `HISTORICAL_V1_BEVERAGE_CONTRACTS.ts`)
  test('ALL_HISTORICAL__v1BeverageEntryExamples includes all milestones', () => {
    const allExamplesFromAllMilestones = ALL_HISTORICAL__v1BeverageEntryMilestones.flatMap(
      (milestone) => milestone.examples,
    );
    expect(allExamplesFromAllMilestones.length).toEqual(
      ALL_HISTORICAL__v1BeverageEntryExamples.length,
    );
  });
  test('ALL_HISTORICAL__v1BeveragePayloadExamples includes all milestones', () => {
    const allExamplesFromAllMilestones = ALL_HISTORICAL__v1BeveragePayloadMilestones.flatMap(
      (milestone) => milestone.examples,
    );
    expect(allExamplesFromAllMilestones.length).toEqual(
      ALL_HISTORICAL__v1BeveragePayloadExamples.length,
    );
  });

  test.each(
    ALL_HISTORICAL__v1BeverageEntryExamples,
  )('Historical entry examples all pass current schema (#%#)', (exampleEntry) => {
    const result = v1Beverage_entrySchema.safeParse(exampleEntry);
    expect(result.error).toBeFalsy();
  });

  test.each(
    ALL_HISTORICAL__v1BeveragePayloadExamples,
  )('Historical payload examples all pass current schema (#%#)', (examplePayload) => {
    const result = v1Beverage_payloadSchema.safeParse(examplePayload);
    expect(result.error).toBeFalsy();
  });
});
