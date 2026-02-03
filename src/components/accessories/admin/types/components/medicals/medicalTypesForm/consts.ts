import { MedicalTypeFormFieldName } from ".";
import { MedicalTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  medicalType: MedicalTypeDTO | undefined
) => TFields<MedicalTypeFormFieldName> = (medicalType) => ({
  code: { type: "text", value: medicalType?.code ?? "" },
  description: { type: "text", value: medicalType?.description ?? "" },
});
