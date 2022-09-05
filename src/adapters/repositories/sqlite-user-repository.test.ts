import '../../di/inject-test-dependencies';
import { container } from 'tsyringe';
import { SqliteDbConnector } from './sqlite-db-connector';
import SqliteUserRepository from './sqlite-user-repository';
import TYPES from '../../di/types';
import User from '../../entities/user';
import UserId from '../../entities/user-id';
import UserName from '../../entities/user-name';

const dbConnector = container.resolve<SqliteDbConnector>(
  TYPES.SqliteDbConnector
);
const repository = new SqliteUserRepository(dbConnector);
const id = 1;
const name = 'John Doe';

function createJohnDoe() {
  return new User(new UserId(id), new UserName(name));
}

describe('#save', () => {
  test('save("John Doe") returns John Doe\'s User object', async () => {
    await expect(repository.save(new UserName(name))).resolves.toEqual(
      createJohnDoe()
    );
  });

  test('save("John Doe") has been rejected due to the duplication', async () => {
    await expect(repository.save(new UserName(name))).rejects.toThrow();
  });
});

describe('#find', () => {
  test("find(1) returns John Doe's User object", async () => {
    await expect(repository.find(new UserId(id))).resolves.toEqual(
      createJohnDoe()
    );
  });

  test('find(2) returns null', async () => {
    await expect(repository.find(new UserId(2))).resolves.toBeNull();
  });
});
