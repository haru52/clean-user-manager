import ConsoleView from '../../external/views/console-view';
import SqliteUserRepository from '../../external/db/sqlite-user-repository';
import UserController from './user-controller';
import { UserRegisterInputBoundary } from '../../use-cases/user/register/user-register-input-boundary';
import { UserRegisterInputData } from '../../use-cases/user/register/user-register-input-data';
import UserRegisterInteractor from '../../use-cases/user/register/user-register-interactor';
import UserRegisterPresenter from '../presenters/user/user-register-presenter';

describe('#register("John Doe")', () => {
  const registerInputBoundary: UserRegisterInputBoundary =
    new UserRegisterInteractor(
      new SqliteUserRepository(true),
      new UserRegisterPresenter(new ConsoleView())
    );
  const controller = new UserController(registerInputBoundary);
  const name = 'John Doe';

  test("hasn't been rejected", async () => {
    await expect(controller.register(name)).resolves.not.toThrow();
  });

  const handleSpy = jest.spyOn(registerInputBoundary, 'handle');

  test('userRegisterInputBoundary.handle() has been called once', () => {
    expect(handleSpy).toHaveBeenCalledTimes(1);
  });

  test('userRegisterInputBoundary.handle() has been called with { name: "John Doe" }', () => {
    const inputData: UserRegisterInputData = { name };
    expect(handleSpy).toHaveBeenCalledWith(inputData);
  });
});
