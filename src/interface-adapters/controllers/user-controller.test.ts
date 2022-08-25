import ConsoleUserCreatePresenter from '../presenters/user/console-user-create-presenter';
import SQLiteUserRepository from '../../db/sqlite-user-repository';
import UserController from './user-controller';
import UserCreateInteractor from '../../use-cases/user/create/user-create-interactor';

describe('create()', () => {
  const userCreateInteractor = new UserCreateInteractor(
    new SQLiteUserRepository(),
    new ConsoleUserCreatePresenter()
  );
  const userController = new UserController(userCreateInteractor);

  test("create('John Doe') shouldn't be rejected", async () => {
    await expect(userController.create('John Doe')).resolves.not.toThrow();
  });
});
