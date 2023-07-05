import { TUserCredentials } from "../../../state/main/types";

export interface IOwnProps {}

export interface IStateProps {
  userCredentials: TUserCredentials;
}

export type TProps = IOwnProps & IStateProps;
