import RegistrationError from '../../registration-error';

export type UserRegisterOutputData = {
  id?: number;
  name?: string;
  err?: RegistrationError;
};
