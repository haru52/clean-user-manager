import UserId from './user-id';

describe('#constructor', () => {
  test('UserId with natural number value is valid', () => {
    const naturalNum = 1;
    const id = new UserId(naturalNum);
    expect(id.value).toBe(naturalNum);
  });

  test('UserId with negative number value throws RangeError', () => {
    expect(() => new UserId(-1)).toThrow(RangeError);
  });

  test('UserId with 0 value throws RangeError', () => {
    expect(() => new UserId(0)).toThrow(RangeError);
  });

  test('UserId with decimal value throws RangeError', () => {
    expect(() => new UserId(1.1)).toThrow(RangeError);
  });
});
