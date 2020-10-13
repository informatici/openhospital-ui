import { PatientDTO } from "../../../generated";

interface IOwnProps {
  initialValues: PatientDTO;
  profilePicture?: any;
  onSubmit: (patient: PatientDTO) => void;
  submitButtonLabel: string;
  isLoading: boolean;
}

export type TProps = IOwnProps;
