import User from './user';
import UserId from './user-id';
import UserName from './user-name';

describe('#constructor', () => {
  const id = 1;
  const name = 'John Doe';
  const johnDoe = new User(new UserId(id), new UserName(name));

  test('ID is 1', () => {
    expect(johnDoe.id).toEqual(new UserId(id));
  });

  test('Name is "John Doe"', () => {
    expect(johnDoe.name).toEqual(new UserName(name));
  });
});
