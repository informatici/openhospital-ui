import { AdmissionDTO } from "../../../../generated";
import { IForm, TFields } from "../../../../libraries/formDataHandling/types";

export type TProps = IForm<TCurrentAdmissionFieldName, any>;

export type TCurrentAdmissionFieldName =
  | "ward"
  | "transUnit"
  | "admDate"
  | "admType"
  | "diseaseIn"
  | "fhu"
  | "note"
  | "cliDiaryCharge"
  | "imageryCharge";

export type TActivityTransitionState = "IDLE" | "TO_RESET" | "FAIL";

export interface IOwnProps {
  onDiscard: () => void;
  fields: TFields<TCurrentAdmissionFieldName>;
  onSubmit: (adm: AdmissionDTO) => void;
}
