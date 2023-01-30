import { LoginResponse } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";
import { IAction } from "../../../state/types";

export interface IOwnProps {}

export interface IStateProps {
  userCredentials: TUserCredentials;
}

export type TProps = IOwnProps & IStateProps;
