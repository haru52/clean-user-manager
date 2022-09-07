import { UserShowInputData } from './user-show-input-data';

export interface UserShowInputPort {
  handle(inputData: UserShowInputData): Promise<void>;
}
