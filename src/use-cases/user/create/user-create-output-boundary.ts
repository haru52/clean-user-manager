import { UserCreateOutputData } from './user-create-output-data';

export interface UserCreateOutputBoundary {
  handle(outputData: UserCreateOutputData): void;
}
