export interface IUserCredentials {
  name: string;
  surname: string;
  token: string;
}

export interface IMainState {
  userCredentials: IUserCredentials;
}
