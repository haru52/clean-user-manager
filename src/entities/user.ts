export default class User {
  readonly id;

  name;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
