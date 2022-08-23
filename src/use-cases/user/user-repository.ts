import User from '../../entities/user';

export interface UserRepository {
  save(name: string): Promise<User>;
  find(id: number): Promise<User>;
}
