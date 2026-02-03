import { DeliveryTypeFormFieldName } from ".";
import { DeliveryTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  deliveryType: DeliveryTypeDTO | undefined
) => TFields<DeliveryTypeFormFieldName> = (deliveryType) => ({
  code: { type: "text", value: deliveryType?.code ?? "" },
  description: { type: "text", value: deliveryType?.description ?? "" },
});
