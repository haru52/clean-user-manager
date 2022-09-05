import UserId from './user-id';

describe('#constructor', () => {
  test('A natural number ID is valid', () => {
    const naturalNum = 1;
    const id = new UserId(naturalNum);
    expect(id.value).toBe(naturalNum);
  });

  test('A negative number ID causes TypeError', () => {
    expect(() => new UserId(-1)).toThrow(TypeError);
  });

  test('A 0 ID causes TypeError', () => {
    expect(() => new UserId(0)).toThrow(TypeError);
  });

  test('A decimal ID causes TypeError', () => {
    expect(() => new UserId(1.1)).toThrow(TypeError);
  });
});
