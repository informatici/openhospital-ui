export const diseasesDTO = [
  {
    code: 88,
    description: "Abortions",
    diseaseType: {
      code: "MP",
      description: "3.MATERNAL AND PERINATAL DISEASES",
    },
    opdInclude: true,
    ipdInInclude: true,
    ipdOutInclude: true,
  },
  {
    code: 22,
    description: "Fake disease",
    diseaseType: {
      code: "FK",
      description: "4.FAKE DISEASES",
    },
    opdInclude: false,
    ipdInInclude: true,
    ipdOutInclude: false,
  },
  {
    code: 23,
    description: "Something Else",
    diseaseType: {
      code: "FK",
      description: "4.FAKE DISEASES",
    },
    opdInclude: true,
    ipdInInclude: true,
    ipdOutInclude: false,
  },
];
