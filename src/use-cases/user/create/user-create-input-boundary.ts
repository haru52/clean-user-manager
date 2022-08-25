import { UserCreateInputData } from './user-create-input-data';

export interface UserCreateInputBoundary {
  handle(inputData: UserCreateInputData): Promise<void>;
}
