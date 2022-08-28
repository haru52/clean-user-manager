import UserId from './user-id';
import UserName from './user-name';

export default class User {
  readonly id;

  name;

  /**
   * Initialize a User instance.
   *
   * @param id - ID value. This must be a natural number
   * @param name - Name value. This must be 1 to 128 characters
   *
   * @throws {@link RangeError}
   */
  constructor(id: number, name: string) {
    this.id = new UserId(id);
    this.name = new UserName(name);
  }
}
