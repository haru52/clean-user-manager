import '../../di/inject-dependencies-for-test';
import { container } from 'tsyringe';
import TYPES from '../../di/types';
import UserController from './user-controller';
import { UserRegisterInputData } from '../../use-cases/user/register/user-register-input-data';
import { UserRegisterInputPort } from '../../use-cases/user/register/user-register-input-port';

describe('#register("John Doe")', () => {
  const registerInputPort = container.resolve<UserRegisterInputPort>(
    TYPES.UserRegisterInputPort
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
