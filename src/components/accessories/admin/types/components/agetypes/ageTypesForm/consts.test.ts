import { AgeTypeDTO } from "generated";
import { validateRange } from "./consts";

const validRange: AgeTypeDTO[] = [
  { from: 0, to: 0, description: "Lorem ipsum" },
  { from: 1, to: 4, description: "Lorem ipsum" },
  { from: 5, to: 10, description: "Lorem ipsum" },
];

const overlapRange: AgeTypeDTO[] = [
  { from: 0, to: 0, description: "Lorem ipsum" },
  { from: 1, to: 5, description: "Lorem ipsum" },
  { from: 5, to: 10, description: "Lorem ipsum" },
];

const notProperlyDefinedRange: AgeTypeDTO[] = [
  { from: 0, to: 0, description: "Lorem ipsum" },
  { from: 1, to: 5, description: "Lorem ipsum" },
  { from: 6, to: 0, description: "Lorem ipsum" },
];

describe("Age types range validation", () => {
  it("should return empty errors list when empty range", () => {
    expect(validateRange([], null).length).toEqual(0);
  });
  it("should return empty errors list when valid range", () => {
    expect(validateRange(validRange, null).length).toEqual(0);
  });
  it("should have overlap error in list when overlapped range", () => {
    expect(validateRange(overlapRange, null).length).toEqual(1);
    expect(validateRange(overlapRange, null)[0]).toEqual(
      "ageTypes.somerangesareoverlapped"
    );
  });
  it("should have not defined error in list when not properly defined range", () => {
    expect(validateRange(notProperlyDefinedRange, null).length).toEqual(1);
    expect(validateRange(notProperlyDefinedRange, null)[0]).toEqual(
      "ageTypes.somerangesarenotdefined"
    );
  });
});
