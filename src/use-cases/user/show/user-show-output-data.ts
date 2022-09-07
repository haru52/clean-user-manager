import ShowingError from '../../../errors/showing-error';

export type UserShowOutputData = {
  id?: number;
  name?: string;
  err?: ShowingError;
};
