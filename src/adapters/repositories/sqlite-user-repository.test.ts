import '../../di/inject-test-dependencies';
import { container } from 'tsyringe';
import { SqliteDbConnector } from './sqlite-db-connector';
import SqliteUserRepository from './sqlite-user-repository';
import TYPES from '../../di/types';
import { UnsavedUser } from '../../types';
import User from '../../entities/user';
import UserId from '../../entities/user-id';
import UserName from '../../entities/user-name';

const dbConnector = container.resolve<SqliteDbConnector>(
  TYPES.SqliteDbConnector
);
const repository = new SqliteUserRepository(dbConnector);
const id = 1;
const name = 'John Doe';

describe('#save', () => {
  test('save({ name: "John Doe" }) returns the ID 1', async () => {
    const user: UnsavedUser = { name: new UserName(name) };
    await expect(repository.save(user)).resolves.toEqual(new UserId(id));
  });

  test('save({ name: "John Doe" }) has been rejected due to the duplication', async () => {
    const user: UnsavedUser = { name: new UserName(name) };
    await expect(repository.save(user)).rejects.toThrow();
  });
});

describe('#find', () => {
  test("find(1) returns John Doe's User object", async () => {
    const johnDoe = new User(new UserId(id), new UserName(name));
    await expect(repository.find(new UserId(id))).resolves.toEqual(johnDoe);
  });

  test('find(2) returns null', async () => {
    await expect(repository.find(new UserId(2))).resolves.toBeNull();
  });
});
