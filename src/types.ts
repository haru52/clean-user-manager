import User from './entities/user';

export type UnsavedUser = Omit<User, 'id'>;
