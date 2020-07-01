import { PatientDTO } from "../../../generated";

interface IOwnProps {
  initialValues: PatientDTO;
  profilePicture?: any;
  handleSubmit: (patient: PatientDTO) => void;
  submitButtonLabel: string;
}

export type TProps = IOwnProps;
