import { AdmissionTypeFormFieldName } from ".";
import { AdmissionTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  admissionType: AdmissionTypeDTO | undefined
) => TFields<AdmissionTypeFormFieldName> = (admissionType) => ({
  code: { type: "text", value: admissionType?.code ?? "" },
  description: { type: "text", value: admissionType?.description ?? "" },
});
