import { MedicalDTO } from "generated";

export const MEDICALS: MedicalDTO[] = [
  {
    code: 1,
    prodCode: "PARA500",
    description: "Paracetamol 500mg tablets",
    type: { code: "DRUG", description: "Pharmaceutical" },
    initialqty: 2000,
    pcsperpck: 10,
    inqty: 500,
    outqty: 100,
    minqty: 100,
    lots: [
        {
            "code": "L2025-10",
            "preparationDate": "2025-09-01",
            "dueDate": "2027-09-01",
            "cost": 0.1,
        }
    ],
  },
  {
    code: 2,
    prodCode: "AMOX250",
    description: "Amoxicillin 250mg capsules",
    type: { code: "DRUG", description: "Pharmaceutical" },
    initialqty: 1500,
    pcsperpck: 10,
    inqty: 300,
    outqty: 80,
    minqty: 80,
    lots: [
        {
            "code": "L2025-10",
            "preparationDate": "2025-09-01",
            "dueDate": "2027-09-01",
            "cost": 0.1,
        }
    ],
  },
  {
    code: 3,
    prodCode: "COTTON01",
    description: "Sterile cotton rolls",
    type: { code: "EQUIP", description: "Medical Equipment" },
    initialqty: 800,
    pcsperpck: 20,
    inqty: 200,
    outqty: 50,
    minqty: 40,
    lots: [
        {
            "code": "L2025-10",
            "preparationDate": "2025-09-01",
            "dueDate": "2027-09-01",
            "cost": 0.1,
        }
    ],
  },
  {
    code: 4,
    prodCode: "VACC001",
    description: "Polio vaccines (10-dose vials)",
    type: { code: "DRUG", description: "Pharmaceutical" },
    initialqty: 500,
    pcsperpck: 10,
    inqty: 100,
    outqty: 20,
    minqty: 10,
    lots: [
        {
            "code": "L2025-10",
            "preparationDate": "2025-09-01",
            "dueDate": "2027-09-01",
            "cost": 0.1,
        }
    ],
  },
  {
    code: 5,
    prodCode: "KITMAT01",
    description: "Maternity delivery kits",
    type: { code: "EQUIP", description: "Medical Supply" },
    initialqty: 300,
    pcsperpck: 1,
    inqty: 60,
    outqty: 15,
    minqty: 10,
    lots: [
        {
            "code": "L2025-10",
            "preparationDate": "2025-09-01",
            "dueDate": "2027-09-01",
            "cost": 0.1,
        }
    ],
  },
];
