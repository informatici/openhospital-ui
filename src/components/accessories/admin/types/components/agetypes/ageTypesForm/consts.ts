import { TFunction } from "i18next";
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

export const validateRange = (
  ranges: AgeTypeDTO[],
  t: TFunction | null
): string[] => {
  const validationErrors: string[] = [];

  ranges.forEach((ageType, index) => {
    if (index > 0) {
      const prev = ranges.at(index - 1);
      if (ageType.from <= prev!.to) {
        validationErrors.push(
          t
            ? t("ageTypes.somerangesareoverlapped")
            : "ageTypes.somerangesareoverlapped"
        );
      }

      if (ageType.to < ageType.from) {
        validationErrors.push(
          t
            ? t("ageTypes.somerangesarenotdefined")
            : "ageTypes.somerangesarenotdefined"
        );
      }
    }
  });

  return validationErrors;
};
