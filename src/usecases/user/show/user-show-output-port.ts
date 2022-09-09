import { UserShowOutputData } from './user-show-output-data';

export interface UserShowOutputPort {
  handle(outputData: UserShowOutputData): void;
}
