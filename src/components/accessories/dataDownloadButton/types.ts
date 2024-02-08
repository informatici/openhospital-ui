import { RefObject } from "react";
import { Data } from "react-csv/lib/core";

export interface IOwnProps {
  csvData: string | Data;
  graphRef: RefObject<any>;
  title?: string;
}
