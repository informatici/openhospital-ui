interface IOwnProps {
  initialValues: IPatientData;
  profilePicture?: any;
  handleSubmit: () => void;
  submitButtonLabel: string;
}

export type TProps = IOwnProps;

export interface IPatientData {
  name: string;
  surname: string;
  taxNumber: string;
  gender: string;
  birthday: string;
  address: string;
  city: string;
  zipCode: string;
  bloodType: string;
  telephone: string;
  email: string;
  insurance: string;
}
