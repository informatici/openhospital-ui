import { RefObject } from "react";
import { Data } from "react-csv/components/CommonPropTypes";

export interface IOwnProps {
  csvData: string | Data;
  graphRef: RefObject<any>;
  title?: string;
}
