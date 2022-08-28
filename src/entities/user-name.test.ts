import UserName from './user-name';

describe('#constructor', () => {
  test('UserName with "John Doe" is valid', () => {
    const regularName = 'John Doe';
    const name = new UserName(regularName);
    expect(name.value).toBe(regularName);
  });

  test('UserName with 128 chars string is valid', () => {
    const validLongName = 'a'.repeat(128);
    const name = new UserName(validLongName);
    expect(name.value).toBe(validLongName);
  });

  test('UserName with empty string throws RangeError', () => {
    expect(() => new UserName('')).toThrow(RangeError);
  });

  test('UserName with over 128 chars string throws RangeError', () => {
    const tooLongName = 'a'.repeat(129);
    expect(() => new UserName(tooLongName)).toThrow(RangeError);
  });
});
