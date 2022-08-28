import ConsoleUserCreatePresenter from '../presenters/user/console-user-create-presenter';
import SQLiteUserRepository from '../../db/sqlite-user-repository';
import UserController from './user-controller';
import { UserCreateInputData } from '../../use-cases/user/create/user-create-input-data';
import UserCreateInteractor from '../../use-cases/user/create/user-create-interactor';

describe("#create('John Doe')", () => {
  const userCreateInteractor = new UserCreateInteractor(
    new SQLiteUserRepository(true),
    new ConsoleUserCreatePresenter()
  );
  const userController = new UserController(userCreateInteractor);
  const name = 'John Doe';

  test("shouldn't be rejected", async () => {
    await expect(userController.create(name)).resolves.not.toThrow();
  });

  const handleSpy = jest.spyOn(userCreateInteractor, 'handle');

  test('userCreateInteractor.handle() has been called once', () => {
    expect(handleSpy).toHaveBeenCalledTimes(1);
  });

  test("userCreateInteractor.handle() has been called with { name: 'John Doe' }", () => {
    const inputData: UserCreateInputData = { name };
    expect(handleSpy).toHaveBeenCalledWith(inputData);
  });
});
