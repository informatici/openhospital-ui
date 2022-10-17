import { IForm } from "../../../libraries/formDataHandling/types";

export type TProps = IForm<TPatientExtraDataFormFieldName, any>;

export type TPatientExtraDataFormFieldName = "allergies" | "anamnesis";

export type TActivityTransitionState = "IDLE" | "TO_RESET" | "FAIL";
