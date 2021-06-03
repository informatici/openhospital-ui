import { TUserCredentials } from "../../../state/main/types";
import { TAPIResponseStatus } from "../../../state/types";

export type TBreadcrumbMap = Record<string, string>;

export interface IOwnProps {
  userCredentials: TUserCredentials;
  breadcrumbMap: TBreadcrumbMap;
}

export interface IStateProps {
  status: TAPIResponseStatus;
}

export interface IDispatchProps {
  setLogoutThunk: () => void;
}

export type TProps = IOwnProps & IStateProps & IDispatchProps;
