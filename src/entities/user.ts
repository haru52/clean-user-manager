import UserId from './user-id';

export default class User {
  readonly id;

  name;

  constructor(id: number, name: string) {
    this.id = new UserId(id);
    this.name = name;
  }
}
