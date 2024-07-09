import { ExamDTO } from "../../generated";

export const examsDTO: ExamDTO[] = [
  {
    code: "01.01",
    description: "1.1 HB",
    procedure: 2,
    defaultResult: "POSTIVE",
    examtype: {
      code: "HB",
      description: "1.Haematology",
    },
    lock: 1,
  },
  {
    code: "01.02",
    description: "1.2 WBC Count",
    procedure: 1,
    defaultResult: "POSTIVE",
    examtype: {
      code: "HB",
      description: "1.Haematology",
    },
    lock: 1,
  },
  {
    code: "01.03",
    description: "1.3 Differential",
    procedure: 1,
    defaultResult: "",
    examtype: {
      code: "HB",
      description: "1.Haematology",
    },
    lock: 0,
  },
  {
    code: "01.04",
    description: "1.4 Error if trying to delete",
    procedure: 1,
    defaultResult: "",
    examtype: {
      code: "HB",
      description: "1.Haematology",
    },
    lock: 0,
  },
  {
    code: "02.01",
    description: "2.1 Some other Exam",
    procedure: 1,
    defaultResult: "",
    examtype: {
      code: "OT",
      description: "2.Some other exam type",
    },
    lock: 0,
  },
];
