import { passwordRules, userNameRules } from "./validation";

describe("password rules", () => {
  it("should pass when all rules are matched", () => {
    expect(passwordRules.test("ThisPassw0rdIsCorrect")).toBeTruthy();
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

describe("userName rules", () => {
  it("should pass", () => {
    expect(userNameRules.test("johndoe")).toBeTruthy();
    expect(userNameRules.test("johndoe42")).toBeTruthy();
    expect(userNameRules.test("42")).toBeTruthy();
    expect(userNameRules.test("john.doe")).toBeTruthy();
    expect(userNameRules.test("john-doe")).toBeTruthy();
    expect(userNameRules.test("john_doe")).toBeTruthy();
  });
  it("should filter out", () => {
    expect(userNameRules.test("Johndoe")).toBeFalsy();
    expect(userNameRules.test("johnDoe")).toBeFalsy();
    expect(userNameRules.test("john doe")).toBeFalsy();
    expect(userNameRules.test("john/doe")).toBeFalsy();
    expect(userNameRules.test("すず")).toBeFalsy();
    expect(userNameRules.test("j̵̨̨̧͖̠̩̤̗̟̲̯̭̫̰͆͛̏͛͒́̂̔̅͘͘̚̕͝͝ȯ̵̫̭̮̖̀̓̾̉͋͋̌̇͘h̶̡̢̡̜̻̥͙̳͉̰̟̬͚̍̃̽̎͒̋̄̔͋͘͝͝ͅn̷̜̠̰͍̤̰̺̠͌̌̒͑̓̌̂̒͗͒͗̐͝͝͠")).toBeFalsy();
  });
});
