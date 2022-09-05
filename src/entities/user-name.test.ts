import UserName from './user-name';

describe('#constructor', () => {
  test('A name "John Doe" is valid', () => {
    const normalName = 'John Doe';
    const userName = new UserName(normalName);
    expect(userName.value).toBe(normalName);
  });

  test('A 128 characters name is valid', () => {
    const validLongName = 'a'.repeat(128);
    const userName = new UserName(validLongName);
    expect(userName.value).toBe(validLongName);
  });

  test('An empty string name causes TypeError', () => {
    expect(() => new UserName('')).toThrow(TypeError);
  });

  test('An over 128 characters name causes TypeError', () => {
    const tooLongName = 'a'.repeat(129);
    expect(() => new UserName(tooLongName)).toThrow(TypeError);
  });
});
