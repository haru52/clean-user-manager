import { UserAddInputData } from './user-add-input-data';

export interface UserAddInputBoundary {
  handle(inputData: UserAddInputData): void;
}
