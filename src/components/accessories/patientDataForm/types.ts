import { PatientDTO } from "../../../generated";

interface IOwnProps {
  initialValues: PatientDTO;
  profilePicture?: any;
  onSubmit: (patient: PatientDTO) => void;
  submitButtonLabel: string;
}

export type TProps = IOwnProps;
