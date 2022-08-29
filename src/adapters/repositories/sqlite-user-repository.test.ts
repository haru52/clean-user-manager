import NotFoundError from './not-found-error';
import SqliteUserRepository from './sqlite-user-repository';
import User from '../../entities/user';

const sqliteUserRepository = new SqliteUserRepository(true);
const id = 1;
const name = 'John Doe';
const johnDoe = new User(id, name);

describe('#save', () => {
  test('save("John Doe") returns John Doe\'s User object', async () => {
    await expect(sqliteUserRepository.save(name)).resolves.toEqual(johnDoe);
  });

  test('save("John Doe") has been rejected due to duplication', async () => {
    await expect(sqliteUserRepository.save(name)).rejects.toThrow();
  });
});

describe('#find', () => {
  test("find(1) returns John Doe's User object", async () => {
    await expect(sqliteUserRepository.find(id)).resolves.toEqual(johnDoe);
  });

  test('find(2) has been rejected due to not found', async () => {
    await expect(sqliteUserRepository.find(2)).rejects.toThrow(NotFoundError);
  });
});

describe('#close', () => {
  test("hasn't thrown an error", () => {
    expect(() => sqliteUserRepository.close()).not.toThrow();
  });

  test('save() has been rejected after the DB is closed', async () => {
    await expect(() =>
      sqliteUserRepository.save('Alice Smith')
    ).rejects.toThrow();
  });
});
