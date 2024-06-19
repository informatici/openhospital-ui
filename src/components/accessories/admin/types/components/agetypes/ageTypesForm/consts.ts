import { AgeTypeFormFieldName } from ".";
import { AgeTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  ageType: AgeTypeDTO | undefined
) => TFields<AgeTypeFormFieldName> = (ageType) => ({
  code: { type: "text", value: ageType?.code ?? "" },
  description: { type: "text", value: ageType?.description ?? "" },
});
