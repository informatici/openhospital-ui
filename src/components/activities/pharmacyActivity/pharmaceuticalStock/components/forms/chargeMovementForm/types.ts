import { MedicalDTO, MovementDTO } from "generated";
import { Control } from "react-hook-form";
import z from "zod";
import { MovementDTOSchema } from "./consts";

export type TFormValues = z.infer<typeof MovementDTOSchema>;

export type ChargeMovementProps = {
  loading?: boolean;
  movement?: MovementDTO;
  onSubmit: (values: MovementDTO) => void;
};

export type LotFormFieldProps = {
  medical: MedicalDTO;
  control: Control<TFormValues>;
};
