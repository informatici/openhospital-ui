import { ReactNode } from "react";
import { TPermission } from "../../../types";

export interface IOwnProps {
  fallback?: ReactNode;
  permission: TPermission;
}
