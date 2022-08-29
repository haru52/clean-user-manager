import { UserRegisterOutputData } from './user-register-output-data';

export interface UserRegisterOutputBoundary {
  handle(outputData: UserRegisterOutputData): void;
}
