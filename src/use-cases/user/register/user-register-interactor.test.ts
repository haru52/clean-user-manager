import '../../../di/dependency-injector-for-test';
import { container } from 'tsyringe';
import TYPES from '../../../di/types';
import { UserRegisterInputData } from './user-register-input-data';
import UserRegisterInteractor from './user-register-interactor';
import { UserRegisterOutputData } from './user-register-output-data';
import { UserRegisterOutputPort } from './user-register-output-port';
import { UserRepository } from '../user-repository';

describe('#handle({ name: "John Doe" })', () => {
  const repository = container.resolve<UserRepository>(TYPES.UserRepository);
  const outputPort = container.resolve<UserRegisterOutputPort>(
    TYPES.UserRegisterOutputPort
  );
  const interactor = new UserRegisterInteractor(repository, outputPort);
  const name = 'John Doe';
  const inputData: UserRegisterInputData = { name };

  test("shouldn't have been rejected", async () => {
    await expect(interactor.handle(inputData)).resolves.not.toThrow();
  });

  const saveSpy = jest.spyOn(repository, 'save');

  test('userRepository.save has been called once', () => {
    expect(saveSpy).toBeCalledTimes(1);
  });

  test('userRepository.save has been called with "John Doe"', () => {
    expect(saveSpy).toHaveBeenCalledWith(name);
  });

  const handleSpy = jest.spyOn(outputPort, 'handle');

  test('userRegisterOutputPort.handle has been called once', () => {
    expect(handleSpy).toBeCalledTimes(1);
  });

  test('userRegisterOutputPort.handle has been called with { id: 1, name: "John Doe" }', () => {
    const outputData: UserRegisterOutputData = {
      id: 1,
      name,
    };
    expect(handleSpy).toHaveBeenCalledWith(outputData);
  });
});
