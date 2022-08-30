import ConsoleView from '../../../external/views/console-view';
import SqliteUserRepository from '../../../adapters/repositories/sqlite-user-repository';
import { UserRegisterInputData } from './user-register-input-data';
import UserRegisterInteractor from './user-register-interactor';
import { UserRegisterOutputData } from './user-register-output-data';
import { UserRegisterOutputPort } from './user-register-output-port';
import UserRegisterPresenter from '../../../adapters/presenters/user/user-register-presenter';
import { UserRepository } from '../user-repository';

describe('#handle({ name: "John Doe" })', () => {
  const repository: UserRepository = new SqliteUserRepository(true);
  const outputPort: UserRegisterOutputPort = new UserRegisterPresenter(
    new ConsoleView()
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
