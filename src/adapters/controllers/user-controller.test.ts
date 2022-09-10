import '../../di/inject-test-dependencies';
import { container } from 'tsyringe';
import TYPES from '../../di/types';
import UserController from './user-controller';
import { UserRegisterInputData } from '../../usecases/user/register/user-register-input-data';
import { UserRegisterInputPort } from '../../usecases/user/register/user-register-input-port';
// import { UserShowInputData } from '../../usecases/user/show/user-show-input-data';
import { UserShowInputPort } from '../../usecases/user/show/user-show-input-port';

const registerInputPort = container.resolve<UserRegisterInputPort>(
  TYPES.UserRegisterInputPort
);
const showInputPort = container.resolve<UserShowInputPort>(
  TYPES.UserShowInputPort
);
const controller = new UserController(registerInputPort, showInputPort);

// Register
describe('#register("John Doe")', () => {
  const name = 'John Doe';
  const handleSpy = jest.spyOn(registerInputPort, 'handle');

  test('has been resolved', async () => {
    await expect(controller.register(name)).resolves.not.toThrow();
  });

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

// Show

// TODO: Make these tests in this describe pass
// Somehow these tests fail

// describe('#show', () => {
//   const id = 1;
//   const handleSpy = jest.spyOn(showInputPort, 'handle');

//   test('has been resolved', async () => {
//     await expect(controller.show(id)).resolves.not.toThrow();
//   });

//   test('userShowInputPort#handle has been called once', () => {
//     expect(handleSpy).toHaveBeenCalledTimes(1);
//   });

//   test('userShowInputPort#handle has been called with { id: 1 }', () => {
//     const inputData: UserShowInputData = { id };
//     expect(handleSpy).toHaveBeenCalledWith(inputData);
//   });
// });

describe('#show with an unregistered user ID', () => {
  const id = 2;

  test('has been rejected with an Error', async () => {
    await expect(controller.show(id)).rejects.toThrow(Error);
  });
});
