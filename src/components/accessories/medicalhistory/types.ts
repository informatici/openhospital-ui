import { TFields } from "libraries/formDataHandling/types";

interface IMedicalHistoryProps {
  fields: TFields<MedicalHistoryFormFieldName>;
  submitButtonLabel: string;
  resetButtonLabel: string;
}

export type MedicalHistoryProps = IMedicalHistoryProps;

export type MedicalHistoryFormFieldName =
  | "siblingRank"
  | "pregnancyTerm"
  | "deliveryMode"
  | "apgarScore"
  | "birthWeight"
  | "vaccinationStatus"
  | "malariaProphylaxis"
  | "diet"
  | "deworming"
  | "psychomotorDevelopment"
  | "somaticGrowth"
  | "ironSupplement"
  | "folicAcidSupplement"
  | "vitASupplement"
  | "otherSupplements"
  | "transfusion"
  | "lastTransfusionDate"
  | "sickleCell"
  | "drugAllergy"
  | "allergyDetails"
  | "hemolysis"
  | "otherPathologies"
  | "otherFamilyPathologies";
