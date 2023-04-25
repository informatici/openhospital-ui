import { Data } from "react-csv/components/CommonPropTypes";

export interface IProps {
  csvData: string | Data;
  handleDownloadPDF?: () => void;
  title?: string;
}
