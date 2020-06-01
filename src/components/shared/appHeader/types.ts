import { IUserCredentials } from "../../../state/main/types";

export type TBreadcrumbMap = Record<string, string>;

export interface IOwnProps {
  userCredentials: IUserCredentials;
  breadcrumbMap: TBreadcrumbMap;
}

export type TProps = IOwnProps;
