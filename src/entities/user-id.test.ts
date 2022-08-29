import UserId from './user-id';

describe('#constructor', () => {
  test('UserId with natural number value is valid', () => {
    const naturalNum = 1;
    const userId = new UserId(naturalNum);
    expect(userId.value).toBe(naturalNum);
  });

  test('UserId with negative number value throws TypeError', () => {
    expect(() => new UserId(-1)).toThrow(TypeError);
  });

  test('UserId with 0 value throws TypeError', () => {
    expect(() => new UserId(0)).toThrow(TypeError);
  });

  test('UserId with decimal value throws TypeError', () => {
    expect(() => new UserId(1.1)).toThrow(TypeError);
  });
});
