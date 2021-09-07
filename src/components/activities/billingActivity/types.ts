import { TUserCredentials } from "../../../state/main/types";

export interface IStateProps {
    userCredentials?: TUserCredentials;
}

export interface IDispatchProps {

}

export type TProps = IStateProps & IDispatchProps;
