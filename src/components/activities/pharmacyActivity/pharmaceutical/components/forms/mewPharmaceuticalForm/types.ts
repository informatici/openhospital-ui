
import z from "zod";
import { MedicalDTOSchema } from "./consts";

export type TFormValues = z.infer<typeof MedicalDTOSchema>;

export type NewPharmaceuticalProps = {
    onSubmit: (values: TFormValues) => void;
    loading?: boolean;
    initialValues?: TFormValues;
};

