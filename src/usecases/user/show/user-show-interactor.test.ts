import '../../../di/inject-test-dependencies';
import { container } from 'tsyringe';
import ShowingError from '../../../errors/showing-error';
import TYPES from '../../../di/types';
import { UnsavedUser } from '../../../types';
import UserId from '../../../entities/user-id';
import UserName from '../../../entities/user-name';
import { UserRepository } from '../user-repository';
import { UserShowInputData } from './user-show-input-data';
import UserShowInteractor from './user-show-interactor';
import { UserShowOutputData } from './user-show-output-data';
import { UserShowOutputPort } from './user-show-output-port';

const repository = container.resolve<UserRepository>(TYPES.UserRepository);
const outputPort = container.resolve<UserShowOutputPort>(
  TYPES.UserShowOutputPort
);
const interactor = new UserShowInteractor(repository, outputPort);
const outputPortHandleSpy = jest.spyOn(outputPort, 'handle');
const name = 'John Doe';

beforeAll(() => {
  const johnDoe: UnsavedUser = { name: new UserName(name) };
  return repository.save(johnDoe);
});

describe('#handle with a normal inputData', () => {
  const id = 1;
  const findSpy = jest.spyOn(repository, 'find');

  test('has been resolved', async () => {
    const inputData: UserShowInputData = { id };
    await expect(interactor.handle(inputData)).resolves.not.toThrow();
  });

  test('userRepository#find has been called once', () => {
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  test('userRepository#find has been called with the ID 1', () => {
    const userId = new UserId(id);
    expect(findSpy).toHaveBeenCalledWith(userId);
  });

  test('userShowOutputPort#handle has been called once', () => {
    expect(outputPortHandleSpy).toHaveBeenCalledTimes(1);
  });

  test('userShowOutputPort#handle has been called with { id: 1, name: "John Doe" }', () => {
    const outputData: UserShowOutputData = {
      id: 1,
      name,
    };
    expect(outputPortHandleSpy).toHaveBeenCalledWith(outputData);
  });
});

describe('#handle with an unregistered user ID', () => {
  beforeAll(() => {
    outputPortHandleSpy.mockClear();
  });

  const id = 2;

  test('has been rejected with a ShowingError', async () => {
    const inputData: UserShowInputData = { id };
    await expect(interactor.handle(inputData)).rejects.toThrow(ShowingError);
  });

  test('userShowOutputPort#handle has been called with an errored outputData', () => {
    const errMsg = `Failed to show the user with ID: ${id}.\nThe user with this ID doesn't exist`;
    const outputData: UserShowOutputData = { err: new ShowingError(errMsg) };
    expect(outputPortHandleSpy).toHaveBeenCalledWith(outputData);
  });
});
