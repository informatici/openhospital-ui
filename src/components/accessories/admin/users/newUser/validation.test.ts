import { passwordRules } from "./validation";

describe("password rules", () => {
  it("should pass when all rules are matched", () => {
    expect(passwordRules.test("ThisPassw0rdIsCorrect"));
  });
  it("should be 5 characters long", () => {
    expect(passwordRules.test("aA4")).toBeFalsy();
  });
  it("should contain an uppercase", () => {
    expect(passwordRules.test("thispassw0rdisnotcorrect")).toBeFalsy();
  });
  it("should contain a lowercase", () => {
    expect(passwordRules.test("THISPASSW0RDISNOTCORRECT")).toBeFalsy();
  });
  it("should contain a number", () => {
    expect(passwordRules.test("ThisPasswordIsNotCorrect")).toBeFalsy();
  });
});
