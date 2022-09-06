import React from "react";
import { TPermission } from "../../../types";

export interface IProps {
  title: string;
  content: React.ComponentType;
  permission?: TPermission;
}
