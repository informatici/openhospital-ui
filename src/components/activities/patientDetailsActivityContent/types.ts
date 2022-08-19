import React from "react";
import { PatientDTO } from "../../../generated";
import { IApiResponse } from "../../../state/types";

export interface IProps {
  title: string;
  content: React.ComponentType;
}
