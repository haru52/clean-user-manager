import { UserAddOutputData } from './user-add-output-data';

export interface UserAddOutputBoundary {
  present(outputData: UserAddOutputData): void;
}
