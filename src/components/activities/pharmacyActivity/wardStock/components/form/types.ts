import { MedicalWardDTO, MovementDTO, MovementWardDTO } from "generated";
import z from "zod";
import { MedicalWardDTOSchema } from "./consts";

export type TFormValues = z.infer<typeof MedicalWardDTOSchema>;

export type PharmaceuticalStockFormProps = {
  onSubmit: (values: MovementWardDTO) => void;
  loading?: boolean;
  pharmaceutical?: MedicalWardDTO;
};
