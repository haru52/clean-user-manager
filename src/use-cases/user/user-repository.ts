// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NotFoundError from '../../errors/not-found-error';
import { UnsavedUser } from '../../types';
import User from '../../entities/user';
import UserId from '../../entities/user-id';

export interface UserRepository {
  /**
   * Save a new user to the DB.
   *
   * @param user - The user to save
   * @returns The ID of the saved user
   *
   * @throws {@link NotFoundError}
   * This exception is thrown if the user is not found after the insertion of a new user to the DB.
   *
   * @throws {@link TypeError}
   * Thrown if the instantiation of the newly inserted user fails.
   *
   * @throws {@link Error}
   * Thrown if the DB throws an unexpected error.
   */
  save(user: UnsavedUser): Promise<UserId>;

  /**
   * Find a user from the DB.
   *
   * @param id - The user ID to find
   * @returns The found user instance or null if the user is not found
   *
   * @throws {@link TypeError}
   * Thrown if the instantiation of the found user fails.
   *
   * @throws {@link Error}
   * Thrown if the DB throws an unexpected error.
   */
  find(id: UserId): Promise<User | null>;
}
