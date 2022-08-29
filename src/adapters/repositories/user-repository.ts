import User from '../../entities/user';

export interface UserRepository {
  /**
   * Save a new user to the DB.
   *
   * @param name - User name to save
   * @returns Saved {@link User} instance
   *
   * @throws NotFoundError
   * This exception is thrown if the user is not found after the insertion of a new user to the DB.
   *
   * @throws Error
   * This exception is thrown if the DB throws an unexpected error.
   */
  save(name: string): Promise<User>;
  /**
   * Find a user from the DB.
   *
   * @param id - User ID to find
   * @returns Found {@link User} instance
   *
   * @throws NotFoundError
   * This exception is thrown if the user is not found.
   *
   * @throws Error
   * This exception is thrown if the DB throws an unexpected error.
   */
  find(id: number): Promise<User>;
  close(): void;
}
