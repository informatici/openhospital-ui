import { AgeTypeFormFieldName } from ".";
import { AgeTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  ageType: AgeTypeDTO[]
) => TFields<AgeTypeFormFieldName>[] = (ageTypes) =>
  ageTypes.map((ageType) => ({
    code: { type: "text", value: ageType?.code ?? "" },
    description: { type: "text", value: ageType?.description ?? "" },
    from: { type: "number", value: ageType?.from ? `${ageType?.from}` : "0" },
    to: { type: "number", value: ageType?.to ? `${ageType?.to}` : "0" },
  }));
