import { formatAllFieldValues, getFromFields } from "./functions";
import { TFields } from "./types";

const fields: TFields = {
  name: {
    value: "Antonio",
    type: "text",
  },
  birthday: {
    value: "683510400000",
    type: "date",
  },
  weight: {
    value: "85",
    type: "number",
  },
};

describe("getFromFields", () => {
  it("should return all fields' addressed content", () => {
    const values = getFromFields(fields, "value");
    const types = getFromFields(fields, "type");

    expect(Object.keys(values).length).toEqual(Object.keys(fields).length);
    expect(Object.keys(types).length).toEqual(Object.keys(fields).length);

    expect(values.name).toEqual("Antonio");
    expect(values.birthday).toEqual("683510400000");
    expect(values.weight).toEqual("85");

    expect(types.name).toEqual("text");
    expect(types.birthday).toEqual("date");
    expect(types.weight).toEqual("number");
  });
});

describe("formatAllFieldValues", () => {
  it("should return all values formatted", () => {
    const values = getFromFields(fields, "value");
    const formattedValues = formatAllFieldValues(fields, values);

    expect(formattedValues.name).toEqual("Antonio");
    expect(formattedValues.birthday).toEqual("683510400000");
    expect(formattedValues.weight).toEqual(85);
  });
});
