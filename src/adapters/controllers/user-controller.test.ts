import ConsoleView from '../../external/views/console-view';
import SQLiteUserRepository from '../../external/db/sqlite-user-repository';
import UserController from './user-controller';
import { UserCreateInputBoundary } from '../../use-cases/user/create/user-create-input-boundary';
import { UserCreateInputData } from '../../use-cases/user/create/user-create-input-data';
import UserCreateInteractor from '../../use-cases/user/create/user-create-interactor';
import UserCreatePresenter from '../presenters/user/user-create-presenter';

describe('#create("John Doe")', () => {
  const createInputBoundary: UserCreateInputBoundary = new UserCreateInteractor(
    new SQLiteUserRepository(true),
    new UserCreatePresenter(new ConsoleView())
  );
  const controller = new UserController(createInputBoundary);
  const name = 'John Doe';

  test("hasn't been rejected", async () => {
    await expect(controller.create(name)).resolves.not.toThrow();
  });

  const handleSpy = jest.spyOn(createInputBoundary, 'handle');

  test('userCreateInputBoundary.handle() has been called once', () => {
    expect(handleSpy).toHaveBeenCalledTimes(1);
  });

  test('userCreateInputBoundary.handle() has been called with { name: "John Doe" }', () => {
    const inputData: UserCreateInputData = { name };
    expect(handleSpy).toHaveBeenCalledWith(inputData);
  });
});
