import { PatientDTO } from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientExtraDataFormFieldName } from "./types";

export const initialFields = (
  patient: PatientDTO | undefined
): TFields<TPatientExtraDataFormFieldName> => {
  return {
    allergies: { value: patient?.allergies ?? "", type: "text" },
    anamnesis: { value: patient?.anamnesis ?? "", type: "text" },
  };
};
