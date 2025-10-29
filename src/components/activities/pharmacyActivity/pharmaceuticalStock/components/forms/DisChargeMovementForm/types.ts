import { MedicalDTO, MovementDTO, WardDTO } from "generated";
import { Control } from "react-hook-form";
import z from "zod";
import { MovementDTOSchema } from "./consts";

// ✅ TFormValues contient maintenant un tableau de lots
export type TFormValues = z.infer<typeof MovementDTOSchema>;

export type DisChargeMovementProps = {
  loading?: boolean;
  movement?: MovementDTO;
  onSubmit: (values: MovementDTO[]) => void;
  onCancel: () => void;
};

export type LotFormFieldProps = {
  medical: MedicalDTO;
  wards?: WardDTO[];
  control: Control<TFormValues>;
  medicalChange: boolean;
};
