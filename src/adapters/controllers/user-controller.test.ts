import 'reflect-metadata';
import ConsoleView from '../../external/views/console-view';
import SqliteUserRepository from '../repositories/sqlite-user-repository';
import UserController from './user-controller';
import { UserRegisterInputData } from '../../use-cases/user/register/user-register-input-data';
import { UserRegisterInputPort } from '../../use-cases/user/register/user-register-input-port';
import UserRegisterInteractor from '../../use-cases/user/register/user-register-interactor';
import UserRegisterPresenter from '../presenters/user/user-register-presenter';

describe('#register("John Doe")', () => {
  const registerInputPort: UserRegisterInputPort = new UserRegisterInteractor(
    new SqliteUserRepository(true),
    new UserRegisterPresenter(new ConsoleView())
  );
  const controller = new UserController(registerInputPort);
  const name = 'John Doe';

  test("hasn't been rejected", async () => {
    await expect(controller.register(name)).resolves.not.toThrow();
  });

  const handleSpy = jest.spyOn(registerInputPort, 'handle');

  test('userRegisterInputPort.handle() has been called once', () => {
    expect(handleSpy).toHaveBeenCalledTimes(1);
  });

  test('userRegisterInputPort.handle() has been called with { name: "John Doe" }', () => {
    const inputData: UserRegisterInputData = { name };
    expect(handleSpy).toHaveBeenCalledWith(inputData);
  });
});
