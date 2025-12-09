import { MedicalDTO } from "generated";
import { Control, Path } from "react-hook-form";

export type LotFormFieldProps<T extends Record<string, any>> = {
  medical: MedicalDTO;
  control: Control<T>;
  name: Path<T>;
};
