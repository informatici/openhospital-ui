import { MovementDTO, WardDTO } from "generated";
import { Control } from "react-hook-form";
import z from "zod";
import { MovementDTOSchema } from "./consts";

export type TFormValues = z.infer<typeof MovementDTOSchema>;

export type DisChargeMovementProps = {
  loading?: boolean;
  movement?: MovementDTO;
  onSubmit: (values: MovementDTO[]) => void;
  onCancel: () => void;
};

export type DischargeLotFormFieldProps = {
  wards: WardDTO[];
  control: Control<TFormValues>;
};
