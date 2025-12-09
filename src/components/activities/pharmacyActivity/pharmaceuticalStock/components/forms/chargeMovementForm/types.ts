import { MovementDTO } from "generated";
import z from "zod";
import { MovementDTOSchema } from "./consts";

export type TFormValues = z.infer<typeof MovementDTOSchema>;

export type ChargeMovementProps = {
  loading?: boolean;
  movement?: MovementDTO;
  onSubmit: (values: MovementDTO) => void;
};
