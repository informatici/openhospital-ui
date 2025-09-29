import { parseDateTime } from "libraries/formDataHandling/functions";
import { MedicalHistoryDTO } from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
import { initialFields } from "./consts";
import { MedicalHistoryFormFieldName } from "./medicalHistoryForm/types";

export const useFields = (medicalhistory?: MedicalHistoryDTO) => {
  const fields: TFields<MedicalHistoryFormFieldName> = {
    ...initialFields,
    lastTransfusionDate: {
      value: parseDateTime(
        medicalhistory?.lastTransfusionDate?.toString()!,
        false
      ),
      type: "date",
    },
    siblingRank: {
      value: medicalhistory?.siblingRank?.toString() ?? "",
      type: "text",
    },
    termPregnancy: {
      value: medicalhistory?.termPregnancy ?? "",
      type: "text",
    },
    deliveryMode: {
      value: medicalhistory?.deliveryMode ?? "",
      type: "text",
    },
    apgarScore: {
      value: medicalhistory?.apgarScore ?? "",
      type: "text",
    },
    birthWeight: {
      value: medicalhistory?.birthWeight?.toString() ?? "",
      type: "number",
    },
    vaccinationState: {
      value: medicalhistory?.vaccinationState ?? "",
      type: "text",
    },
    antiMalarialProphylaxis: {
      value: medicalhistory?.antiMalarialProphylaxis ?? "",
      type: "text",
    },
    diet: {
      value: medicalhistory?.diet ?? "",
      type: "text",
    },
    deParasitization: {
      value: medicalhistory?.deParasitization ?? "",
      type: "text",
    },
    psychomotorDev: {
      value: medicalhistory?.psychomotorDev ?? "",
      type: "text",
    },
    somaticGrowth: {
      value: medicalhistory?.somaticGrowth ?? "",
      type: "text",
    },
    ironSupplement: {
      value: medicalhistory?.ironSupplement ? "true" : "false",
      type: "boolean",
    },
    folicAcidSupplement: {
      value: medicalhistory?.folicAcidSupplement ? "true" : "false",
      type: "boolean",
    },
    vitASupplement: {
      value: medicalhistory?.vitASupplement ? "true" : "false",
      type: "boolean",
    },
    otherSupplements: {
      value: medicalhistory?.otherSupplements ?? "",
      type: "text",
    },

    transfusion: {
      value: medicalhistory?.transfusion ? "true" : "false",
      type: "boolean",
    },
    sickleCell: {
      value: medicalhistory?.sickleCell ? "true" : "false",
      type: "boolean",
    },
    allergyPrecision: {
      value: medicalhistory?.allergyPrecision ?? "",
      type: "text",
    },
    hemylosis: {
      value: medicalhistory?.hemylosis ?? "",
      type: "text",
    },
    otherPersonalPathologies: {
      value: medicalhistory?.otherPersonalPathologies ?? "",
      type: "text",
    },

    otherFamilyPathologies: {
      value: medicalhistory?.otherFamilyPathologies ?? "",
      type: "text",
    },
  };

  return fields;
};
