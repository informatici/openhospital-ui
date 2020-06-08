export interface IPatient {
  id: string;
  name: string;
  surname: string;
}

export type IPatientsState = Array<IPatient>;
