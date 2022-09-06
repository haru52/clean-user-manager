import '../../../di/inject-test-dependencies';
import { container } from 'tsyringe';
import RegistrationError from '../../../errors/registration-error';
import TYPES from '../../../di/types';
import { UnsavedUser } from '../../../types';
import UserName from '../../../entities/user-name';
import { UserRegisterInputData } from './user-register-input-data';
import UserRegisterInteractor from './user-register-interactor';
import { UserRegisterOutputData } from './user-register-output-data';
import { UserRegisterOutputPort } from './user-register-output-port';
import { UserRepository } from '../user-repository';

const repository = container.resolve<UserRepository>(TYPES.UserRepository);
const outputPort = container.resolve<UserRegisterOutputPort>(
  TYPES.UserRegisterOutputPort
);
const interactor = new UserRegisterInteractor(repository, outputPort);

describe('#handle with a normal inputData', () => {
  const name = 'John Doe';

  test('has been resolved', async () => {
    const inputData: UserRegisterInputData = { name };
    await expect(interactor.handle(inputData)).resolves.not.toThrow();
  });

  const saveSpy = jest.spyOn(repository, 'save');

  test('userRepository#save has been called once', () => {
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });

  test('userRepository#save has been called with { name: "John Doe" }', () => {
    const user: UnsavedUser = { name: new UserName(name) };
    expect(saveSpy).toHaveBeenCalledWith(user);
  });

  const outputPorthandleSpy = jest.spyOn(outputPort, 'handle');

  test('userRegisterOutputPort#handle has been called once', () => {
    expect(outputPorthandleSpy).toHaveBeenCalledTimes(1);
  });

  test('userRegisterOutputPort#handle has been called with { id: 1, name: "John Doe" }', () => {
    const outputData: UserRegisterOutputData = {
      id: 1,
      name,
    };
    expect(outputPorthandleSpy).toHaveBeenCalledWith(outputData);
  });
});

describe('#handle with an invalid inputData', () => {
  const name = 'a'.repeat(129);
  const inputData: UserRegisterInputData = { name };
  test('has been rejected with a RegistrationError', async () => {
    await expect(interactor.handle(inputData)).rejects.toThrow(
      RegistrationError
    );
  });
});
