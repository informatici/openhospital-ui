import { TFilterField } from "components/accessories/table/filter/types";
import { filterData } from "./filterUtils";

const people = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    sex: "M",
    age: 29,
    email: "john.doe@example.com",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    sex: "F",
    age: 34,
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    sex: "M",
    age: 40,
    email: "michael.johnson@example.com",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    sex: "F",
    age: 27,
    email: "emily.davis@example.com",
  },
  {
    id: 5,
    firstName: "Robert",
    lastName: "Brown",
    sex: "M",
    age: 22,
    email: "robert.brown@example.com",
  },
  {
    id: 6,
    firstName: "Linda",
    lastName: "Williams",
    sex: "F",
    age: 48,
    email: "linda.williams@example.com",
  },
  {
    id: 7,
    firstName: "James",
    lastName: "Jones",
    sex: "M",
    age: 36,
    email: "james.jones@example.com",
  },
  {
    id: 8,
    firstName: "Patricia",
    lastName: "Garcia",
    sex: "F",
    age: 30,
    email: "patricia.garcia@example.com",
  },
  {
    id: 9,
    firstName: "David",
    lastName: "Martinez",
    sex: "M",
    age: 31,
    email: "david.martinez@example.com",
  },
  {
    id: 10,
    firstName: "Mary",
    lastName: "Rodriguez",
    sex: "F",
    age: 26,
    email: "mary.rodriguez@example.com",
  },
  {
    id: 11,
    firstName: "Christopher",
    lastName: "Miller",
    sex: "M",
    age: 50,
    email: "christopher.miller@example.com",
  },
  {
    id: 12,
    firstName: "Barbara",
    lastName: "Wilson",
    sex: "F",
    age: 38,
    email: "barbara.wilson@example.com",
  },
  {
    id: 13,
    firstName: "Daniel",
    lastName: "Anderson",
    sex: "M",
    age: 24,
    email: "daniel.anderson@example.com",
  },
  {
    id: 14,
    firstName: "Jennifer",
    lastName: "Taylor",
    sex: "F",
    age: 45,
    email: "jennifer.taylor@example.com",
  },
  {
    id: 15,
    firstName: "Matthew",
    lastName: "Thomas",
    sex: "M",
    age: 32,
    email: "matthew.thomas@example.com",
  },
  {
    id: 16,
    firstName: "Susan",
    lastName: "Moore",
    sex: "F",
    age: 37,
    email: "susan.moore@example.com",
  },
  {
    id: 17,
    firstName: "Joseph",
    lastName: "Jackson",
    sex: "M",
    age: 43,
    email: "joseph.jackson@example.com",
  },
  {
    id: 18,
    firstName: "Karen",
    lastName: "White",
    sex: "F",
    age: 28,
    email: "karen.white@example.com",
  },
  {
    id: 19,
    firstName: "Mark",
    lastName: "Harris",
    sex: "M",
    age: 52,
    email: "mark.harris@example.com",
  },
  {
    id: 20,
    firstName: "Nancy",
    lastName: "Martin",
    sex: "F",
    age: 33,
    email: "nancy.martin@example.com",
  },
];

const filterColumns: TFilterField[] = [
  { key: "firstName", label: "Firstname", type: "text" },
  { key: "age", label: "Age", type: "number" },
  {
    key: "sex",
    label: "Sex",
    type: "select",
    options: [
      { label: "Male", value: "M" },
      { label: "Female", value: "F" },
    ],
  },
];

describe("Filter people", () => {
  it("Should ignore internal filter when manual filter enabled", () => {
    const data = filterData(
      people,
      people,
      "id",
      filterColumns,
      {
        age: { value: 33 },
      },
      true
    );

    expect(data.length).toBe(people.length);
  });
  it("Should filter people with age equal to 33", () => {
    const data = filterData(
      people,
      people,
      "id",
      filterColumns,
      {
        age: { value: 33 },
      },
      false
    );

    expect(data.length).toBe(
      people.filter((person) => person.age === 33).length
    );
  });
  it("Should filter people with age less or equal to 30", () => {
    const data = filterData(
      people,
      people,
      "id",
      filterColumns,
      {
        age: { max: 30 },
      },
      false
    );

    expect(data.length).toBe(
      people.filter((person) => person.age <= 30).length
    );
  });

  it("Should filter people with age greater or equal to 30", () => {
    const data = filterData(
      people,
      people,
      "id",
      filterColumns,
      {
        age: { min: 30 },
      },
      false
    );

    expect(data.length).toBe(
      people.filter((person) => person.age >= 30).length
    );
  });

  it("Should filter people with age greater or equal to 30 and firstname include 'a' ignoring case", () => {
    const data = filterData(
      people,
      people,
      "id",
      filterColumns,
      {
        age: { min: 30 },
        firstName: { value: "a" },
      },
      false
    );

    expect(data.length).toBe(
      people.filter(
        (person) =>
          person.age >= 30 && person.firstName.toLowerCase().includes("a")
      ).length
    );
  });

  it("Should filter people where firstname is 'Nancy' ignoring case", () => {
    const data = filterData(
      people,
      people,
      "id",
      filterColumns,
      {
        firstName: { value: "Nancy" },
      },
      false
    );

    expect(data.length).toBe(
      people.filter((person) =>
        person.firstName.toLowerCase().includes("nancy")
      ).length
    );
  });
  it("Should filter people where firstname contanins 'm' ignoring case", () => {
    const data = filterData(
      people,
      people,
      "id",
      filterColumns,
      {
        firstName: { value: "m" },
      },
      false
    );

    expect(data.length).toBe(
      people.filter((person) => person.firstName.toLowerCase().includes("m"))
        .length
    );
  });

  it("Should filter female people", () => {
    const data = filterData(
      people,
      people,
      "id",
      filterColumns,
      {
        sex: { value: "F" },
      },
      false
    );

    expect(data.length).toBe(
      people.filter((person) => person.sex === "F").length
    );
  });
  it("Should not found any person", () => {
    const data = filterData(
      people,
      people,
      "id",
      filterColumns,
      {
        sex: { value: "D" },
      },
      false
    );

    expect(data.length).toBe(0);
  });
});
