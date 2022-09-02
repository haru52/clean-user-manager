import '../../di/dependency-injector-for-test';
import { container } from 'tsyringe';
import NotFoundError from './errors/not-found-error';
import SqliteDbConnector from './sqlite-db-connector';
import SqliteUserRepository from './sqlite-user-repository';
import User from '../../entities/user';

const dbConnector = container.resolve(SqliteDbConnector);
const sqliteUserRepository = new SqliteUserRepository(dbConnector);
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
