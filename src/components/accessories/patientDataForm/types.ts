import { PatientDTO } from "../../../generated";

interface IOwnProps {
  initialValues: PatientDTO;
  profilePicture?: any;
  onSubmit: (patient: PatientDTO) => void;
  submitButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type TProps = IOwnProps;
