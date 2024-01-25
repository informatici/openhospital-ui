import { combineData, sortAndSlice } from "./billsMining";

describe("billsMining", () => {
  describe("combineData", () => {
    it("should correctly combine data", () => {
      const input = { key1: "value1", key2: "value2" };
      const output = combineData(input);

      expect(output).toEqual(input);
    });
  });

  describe("sortAndSlice", () => {
    it("should sort", () => {
      const input = { keyA: 1, keyB: 2, keyC: 3, keyD: 4 };
      const output = sortAndSlice(input);
      expect(output).toEqual({ keyD: 4, keyC: 3, keyB: 2, keyA: 1 });
    });
    it("should sort", () => {
      const input = { keyA: 1, keyB: 1, keyC: 1, keyD: 3 };
      const output = sortAndSlice(input);
      expect(output).toEqual({ keyA: 1, keyB: 1, keyC: 1, keyD: 3 });
    });
    it("should slice", () => {
      const input = Array.from({ length: 99 }, (_v, index) => index).reduce(
        (acc, index) => {
          acc[`key${index}`] = index;
          return acc;
        },
        {} as Record<string, number>
      );
      const output = sortAndSlice(input);
      expect(Object.keys(output).length).toBe(10);
    });
  });
});
