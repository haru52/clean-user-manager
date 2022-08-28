import ConsoleUserCreatePresenter from '../../../interface-adapters/presenters/user/console-user-create-presenter';
import SQLiteUserRepository from '../../../db/sqlite-user-repository';
import { UserCreateInputData } from './user-create-input-data';
import UserCreateInteractor from './user-create-interactor';
import { UserCreateOutputData } from './user-create-output-data';

describe('#handle({ name: "John Doe" })', () => {
  const repository = new SQLiteUserRepository(true);
  const presenter = new ConsoleUserCreatePresenter();
  const interactor = new UserCreateInteractor(repository, presenter);
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

  const presentSpy = jest.spyOn(presenter, 'present');

  test('consoleUserCreatePresenter.present has been called once', () => {
    expect(presentSpy).toBeCalledTimes(1);
  });

  test('consoleUserCreatePresenter.present has been called with { id: 1, name: "John Doe" }', () => {
    const outputData: UserCreateOutputData = {
      id: 1,
      name,
    };
    expect(presentSpy).toHaveBeenCalledWith(outputData);
  });
});
