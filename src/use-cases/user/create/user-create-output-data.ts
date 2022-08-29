import CreationError from '../../creation-error';

export type UserCreateOutputData = {
  id?: number;
  name?: string;
  err?: CreationError;
};
