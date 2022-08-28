import SQLiteUserRepository from './sqlite-user-repository';
import User from '../../entities/user';

const sqliteUserRepository = new SQLiteUserRepository(true);
const id = 1;
const name = 'John Doe';
const johnDoe = new User(id, name);

describe('#save', () => {
  test("save('John Doe') returns John Doe's User object", async () => {
    await expect(sqliteUserRepository.save(name)).resolves.toEqual(johnDoe);
  });
});

describe('#find', () => {
  test("find(1) returns John Doe's User object", async () => {
    await expect(sqliteUserRepository.find(id)).resolves.toEqual(johnDoe);
  });
});

describe('#close', () => {
  test("shouldn't have been rejected", async () => {
    expect(() => sqliteUserRepository.close()).not.toThrow();
  });
});
