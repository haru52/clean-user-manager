import { UserRegisterOutputData } from './user-register-output-data';

export interface UserRegisterOutputPort {
  handle(outputData: UserRegisterOutputData): void;
}
