import { TUserCredentials } from "../../../state/main/types";
import { TAPIResponseStatus } from "../../../state/types";

export type TBreadcrumbMap = Record<string, string>;

export interface IOwnProps {
  userCredentials: TUserCredentials;
  breadcrumbMap: TBreadcrumbMap;
}
