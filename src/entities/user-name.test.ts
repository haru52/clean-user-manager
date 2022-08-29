import UserName from './user-name';

describe('#constructor', () => {
  test('UserName with "John Doe" is valid', () => {
    const regularName = 'John Doe';
    const userName = new UserName(regularName);
    expect(userName.value).toBe(regularName);
  });

  test('UserName with 128 chars name is valid', () => {
    const validLongName = 'a'.repeat(128);
    const userName = new UserName(validLongName);
    expect(userName.value).toBe(validLongName);
  });

  test('UserName with empty string throws TypeError', () => {
    expect(() => new UserName('')).toThrow(TypeError);
  });

  test('UserName with over 128 chars name throws TypeError', () => {
    const tooLongName = 'a'.repeat(129);
    expect(() => new UserName(tooLongName)).toThrow(TypeError);
  });
});
