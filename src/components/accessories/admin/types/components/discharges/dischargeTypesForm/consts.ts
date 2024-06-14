import { DischargeTypeFormFieldName } from ".";
import { DischargeTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  dischargeType: DischargeTypeDTO | undefined
) => TFields<DischargeTypeFormFieldName> = (dischargeType) => ({
  code: { type: "text", value: dischargeType?.code ?? "" },
  description: { type: "text", value: dischargeType?.description ?? "" },
});
