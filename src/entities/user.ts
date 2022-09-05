import UserId from './user-id';
import UserName from './user-name';

export default class User {
  constructor(public readonly id: UserId, public readonly name: UserName) {}
}
