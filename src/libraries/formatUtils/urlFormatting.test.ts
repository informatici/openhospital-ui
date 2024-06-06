import { extractUrlAfterAdmin } from "./urlFormatting";

describe("extractUrlAfterAdmin", () => {
  it("should return what's after /admin/", () => {
    expect(extractUrlAfterAdmin("/admin/yaddah")).toEqual("yaddah");
  });
  it("should throw if not starting by /admin/", () => {
    expect(() => extractUrlAfterAdmin("admin/yaddah")).toThrow();
    expect(() => extractUrlAfterAdmin("/adminyaddah")).toThrow();
    expect(() => extractUrlAfterAdmin("anything/admin/yaddah")).toThrow();
    expect(() => extractUrlAfterAdmin("anything else")).toThrow();
  });
});
