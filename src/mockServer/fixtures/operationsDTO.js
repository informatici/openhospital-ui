export const operationsDTO = [
  {
    code: "ABLSG1",
    description: "Ablation",
    major: 1,
    type: {
      code: "SG",
      description: "Surgery",
    },
    lock: 1,
  },
  {
    code: "STRX",
    description: "Stomach X-ray",
    major: 1,
    type: {
      code: "RX",
      description: "Radiology",
    },
    lock: 1,
  },
  {
    code: "LNGRX",
    description: "Lung X-ray",
    major: 0,
    operationType: {
      code: "RX",
      description: "Radiology",
    },
    lock: 1,
  },
  {
    code: "DLSG",
    description: "Delivery Surgery",
    major: 1,
    operationType: {
      code: "MT",
      description: "Maternity",
    },
    lock: 1,
  },
];
