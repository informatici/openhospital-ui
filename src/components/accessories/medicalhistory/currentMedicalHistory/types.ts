import { MedicalHistoryDTO } from "generated";

export interface IOwnProps {
  onEditChange?: (value: boolean) => void;
  onEditMedicalHistory?: (mh: MedicalHistoryDTO) => void;
}
