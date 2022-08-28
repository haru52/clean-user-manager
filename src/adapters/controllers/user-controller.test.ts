import ConsoleView from '../../external/views/console-view';
import SQLiteUserRepository from '../../external/db/sqlite-user-repository';
import UserController from './user-controller';
import { UserCreateInputData } from '../../use-cases/user/create/user-create-input-data';
import UserCreateInteractor from '../../use-cases/user/create/user-create-interactor';
import UserCreatePresenter from '../presenters/user/user-create-presenter';

describe("#create('John Doe')", () => {
  const userCreateInteractor = new UserCreateInteractor(
    new SQLiteUserRepository(true),
    new UserCreatePresenter(new ConsoleView())
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
