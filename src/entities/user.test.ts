import User from './user';

describe('#constructor', () => {
  const id = 1;
  const name = 'John Doe';
  const johnDoe = new User(id, name);

  test('ID is 1', () => {
    expect(johnDoe.id.value).toBe(id);
  });

  test('Name is "John Doe"', () => {
    expect(johnDoe.name.value).toBe(name);
  });
});
