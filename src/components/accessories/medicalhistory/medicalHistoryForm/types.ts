import { MedicalHistoryDTO } from "generated";
import { TFields } from "libraries/formDataHandling/types";

interface IMedicalHistoryProps {
  fields: TFields<MedicalHistoryFormFieldName>;
  submitButtonLabel: string;
  resetButtonLabel: string;
  onSubmit: (adm: MedicalHistoryDTO) => void;
  creationMode: boolean;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type MedicalHistoryProps = IMedicalHistoryProps;

export type MedicalHistoryFormFieldName =
  | "siblingRank"
  | "termPregnancy"
  | "deliveryMode"
  | "apgarScore"
  | "birthWeight"
  | "vaccinationState"
  | "antiMalarialProphylaxis"
  | "diet"
  | "deParasitization"
  | "psychomotorDev"
  | "somaticGrowth"
  | "ironSupplement"
  | "folicAcidSupplement"
  | "vitASupplement"
  | "otherSupplements"
  | "transfusion"
  | "lastTransfusionDate"
  | "sickleCell"
  | "allergyPrecision"
  | "hemylosis"
  | "otherPersonalPathologies"
  | "otherFamilyPathologies"
  | "performedAt";
