import RegistrationError from '../../../errors/registration-error';

export type UserRegisterOutputData = {
  id?: number;
  name?: string;
  err?: RegistrationError;
};
