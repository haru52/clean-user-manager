import UserId from './user-id';
import UserName from './user-name';

export default class User {
  readonly id;

  name;

  constructor(id: number, name: string) {
    this.id = new UserId(id);
    this.name = new UserName(name);
  }
}
