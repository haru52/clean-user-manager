import { UserRegisterInputData } from './user-register-input-data';

export interface UserRegisterInputBoundary {
  handle(inputData: UserRegisterInputData): Promise<void>;
}
