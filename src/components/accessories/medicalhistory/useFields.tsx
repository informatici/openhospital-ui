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
    pregnancy: {
      value: medicalhistory?.pregnancy ?? "",
      type: "text",
    },
    deliveryMode: {
      value: medicalhistory?.deliveryMode ?? "",
      type: "text",
    },
    reasonMode: {
      value: medicalhistory?.reasonMode ?? "",
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
    vaccinationStatePev: {
      value: medicalhistory?.vaccinationStatePev ?? "",
      type: "text",
    },
    vaccinationStateNoPev: {
      value: medicalhistory?.vaccinationStateNoPev ?? "",
      type: "text",
    },
    antiMalarialProphylaxisVap: {
      value: medicalhistory?.antiMalarialProphylaxisVap ?? "",
      type: "text",
    },
    antiMalarialProphylaxisMilda: {
      value: medicalhistory?.antiMalarialProphylaxisMilda ?? "",
      type: "text",
    },
    antiMalarialProphylaxisOthers: {
      value: medicalhistory?.antiMalarialProphylaxisOthers ?? "",
      type: "text",
    },
    surgicalProcedure: {
      value: medicalhistory?.surgicalProcedure ? "true" : "false",
      type: "boolean",
    },
    surgicalProcedureCondition: {
      value: medicalhistory?.surgicalProcedureCondition ?? "",
      type: "text",
    },
    surgicalProcedureType: {
      value: medicalhistory?.surgicalProcedureType ?? "",
      type: "text",
    },
    surgicalProcedureDate: {
      value: medicalhistory?.surgicalProcedureDate ?? "",
      type: "date",
    },
    diversification: {
      value: medicalhistory?.diversification ?? "",
      type: "text",
    },
    neonatalPeriod: {
      value: medicalhistory?.neonatalPeriod ?? "",
      type: "text",
    },
    previousHospitalization: {
      value: medicalhistory?.previousHospitalization ?? "",
      type: "text",
    },
    father: {
      value: medicalhistory?.father ?? "",
      type: "text",
    },
    mother: {
      value: medicalhistory?.mother ?? "",
      type: "text",
    },
    siblings: {
      value: medicalhistory?.siblings?.toString() ?? "",
      type: "number",
    },
    otherUsefulInformation: {
      value: medicalhistory?.otherUsefulInformation ?? "",
      type: "text",
    },
    diet: {
      value: medicalhistory?.diet ?? "",
      type: "text",
    },
    deParasitization: {
      value: medicalhistory?.deParasitization ? "true" : "false",
      type: "boolean",
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
    performedAt: {
      value: medicalhistory?.performedAt
        ? parseDateTime(medicalhistory.performedAt.toString()!, false)
        : new Date().toISOString(),
      type: "date",
    },
  };

  return fields;
};
