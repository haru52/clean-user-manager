import User from './user';

describe('John Doe with ID 2', () => {
  const johnDoe = new User(2, 'John Doe');

  test('ID is 2', () => {
    expect(johnDoe.id.value).toBe(2);
  });

  test('Name is "John Doe"', () => {
    expect(johnDoe.name.value).toBe('John Doe');
  });
});
