import { UserRegisterInputData } from './user-register-input-data';

export interface UserRegisterInputPort {
  handle(inputData: UserRegisterInputData): Promise<void>;
}
