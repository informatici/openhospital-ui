import { WardDTO } from "generated";

export type TWardStockFIlter = {
  ward?: WardDTO;
  type?: "outcoming" | "incoming";
  drugs?: boolean;
};
