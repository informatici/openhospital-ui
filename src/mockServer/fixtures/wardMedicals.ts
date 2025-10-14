import { MedicalWardDTO, WardDTO } from "generated";
import { LOTS } from "./lots";
import { MEDICALS } from "./medicals";
import { wards as WARDS } from "./wardDTO";
const wards = WARDS as WardDTO[];

export const WARD_MEDICALS: MedicalWardDTO[] = [
  {
    id: {
      ward: wards.find((w) => w.code === "C")!,
      medical: MEDICALS[0],
      lot: LOTS[0],
    },
    in_quantity: 500,
    out_quantity: 120,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "C")!,
      medical: MEDICALS[1],
      lot: LOTS[1],
    },
    in_quantity: 300,
    out_quantity: 80,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "C")!,
      medical: MEDICALS[3],
      lot: LOTS[3],
    },
    in_quantity: 150,
    out_quantity: 50,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "F")!,
      medical: MEDICALS[1],
      lot: LOTS[5],
    },
    in_quantity: 400,
    out_quantity: 100,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "F")!,
      medical: MEDICALS[2],
      lot: LOTS[2],
    },
    in_quantity: 250,
    out_quantity: 60,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "F")!,
      medical: MEDICALS[4],
      lot: LOTS[4],
    },
    in_quantity: 120,
    out_quantity: 40,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "I")!,
      medical: MEDICALS[0],
      lot: LOTS[5],
    },
    in_quantity: 600,
    out_quantity: 150,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "I")!,
      medical: MEDICALS[2],
      lot: LOTS[3],
    },
    in_quantity: 200,
    out_quantity: 70,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "I")!,
      medical: MEDICALS[4],
      lot: LOTS[5],
    },
    in_quantity: 100,
    out_quantity: 20,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "M")!,
      medical: MEDICALS[4],
      lot: LOTS[3],
    },
    in_quantity: 300,
    out_quantity: 90,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "M")!,
      medical: MEDICALS[3],
      lot: LOTS[4],
    },
    in_quantity: 200,
    out_quantity: 50,
    lock: 1,
  },
  {
    id: {
      ward: wards.find((w) => w.code === "M")!,
      medical: MEDICALS[1],
      lot: LOTS[4],
    },
    in_quantity: 350,
    out_quantity: 75,
    lock: 1,
  },
];
