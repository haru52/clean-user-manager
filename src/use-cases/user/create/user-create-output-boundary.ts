import { UserCreateOutputData } from './user-create-output-data';

export interface UserCreateOutputBoundary {
  present(outputData: UserCreateOutputData): void;
}
