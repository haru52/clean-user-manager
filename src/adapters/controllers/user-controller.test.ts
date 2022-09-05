import '../../di/inject-test-dependencies';
import { container } from 'tsyringe';
import TYPES from '../../di/types';
import UserController from './user-controller';
import { UserRegisterInputData } from '../../use-cases/user/register/user-register-input-data';
import { UserRegisterInputPort } from '../../use-cases/user/register/user-register-input-port';

const registerInputPort = container.resolve<UserRegisterInputPort>(
  TYPES.UserRegisterInputPort
);
const controller = new UserController(registerInputPort);

describe('#register("John Doe")', () => {
  const name = 'John Doe';

  test('has been resolved', async () => {
    await expect(controller.register(name)).resolves.not.toThrow();
  });

  const handleSpy = jest.spyOn(registerInputPort, 'handle');

  test('userRegisterInputPort#handle has been called once', () => {
    expect(handleSpy).toHaveBeenCalledTimes(1);
  });

  test('userRegisterInputPort#handle has been called with { name: "John Doe" }', () => {
    const inputData: UserRegisterInputData = { name };
    expect(handleSpy).toHaveBeenCalledWith(inputData);
  });
});

describe('#register with an invalid name', () => {
  const name = 'a'.repeat(129);

  test('has been rejected with an Error', async () => {
    await expect(controller.register(name)).rejects.toThrow(Error);
  });
});
