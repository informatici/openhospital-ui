import { TUserCredentials } from "../../../state/main/types";

export interface IOwnProps {
  medicalsRoute: string;
}

export interface IStateProps {
  userCredentials: TUserCredentials;
}

export type TProps = IOwnProps & IStateProps;

export type TActivityTransitionState =
  | "IDLE"
  | "TO_MEDICALS"
  | "TO_MEDICAL_STOCK"
  | "TO_MEDICAL_STOCK_WARD";
