import ConsoleView from '../../../external/views/console-view';
import SQLiteUserRepository from '../../../external/db/sqlite-user-repository';
import { UserCreateInputData } from './user-create-input-data';
import UserCreateInteractor from './user-create-interactor';
import { UserCreateOutputBoundary } from './user-create-output-boundary';
import { UserCreateOutputData } from './user-create-output-data';
import UserCreatePresenter from '../../../adapters/presenters/user/user-create-presenter';
import { UserRepository } from '../../../adapters/repositories/user-repository';

describe('#handle({ name: "John Doe" })', () => {
  const repository: UserRepository = new SQLiteUserRepository(true);
  const outputBoundary: UserCreateOutputBoundary = new UserCreatePresenter(
    new ConsoleView()
  );
  const interactor = new UserCreateInteractor(repository, outputBoundary);
  const name = 'John Doe';
  const inputData: UserCreateInputData = { name };

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

  const handleSpy = jest.spyOn(outputBoundary, 'handle');

  test('userCreateOutputBoundary.handle has been called once', () => {
    expect(handleSpy).toBeCalledTimes(1);
  });

  test('userCreateOutputBoundary.handle has been called with { id: 1, name: "John Doe" }', () => {
    const outputData: UserCreateOutputData = {
      id: 1,
      name,
    };
    expect(handleSpy).toHaveBeenCalledWith(outputData);
  });
});
