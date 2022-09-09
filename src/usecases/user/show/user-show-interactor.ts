import { inject, injectable } from 'tsyringe';
import ShowingError from '../../../errors/showing-error';
import TYPES from '../../../di/types';
import User from '../../../entities/user';
import UserId from '../../../entities/user-id';
import { UserRepository } from '../user-repository';
import { UserShowInputData } from './user-show-input-data';
import { UserShowInputPort } from './user-show-input-port';
import { UserShowOutputData } from './user-show-output-data';
import { UserShowOutputPort } from './user-show-output-port';

@injectable()
export default class UserShowInteractor implements UserShowInputPort {
  readonly #repository;

  readonly #outputPort;

  constructor(
    @inject(TYPES.UserRepository) repository: UserRepository,
    @inject(TYPES.UserShowOutputPort) outputPort: UserShowOutputPort
  ) {
    this.#repository = repository;
    this.#outputPort = outputPort;
  }

  async handle(inputData: UserShowInputData) {
    let user: User | null | void | undefined;
    let err: ShowingError | undefined;

    try {
      const id = new UserId(inputData.id);
      user = await this.#repository.find(id).catch((e: unknown) => {
        err = UserShowInteractor.createShowingError(inputData, e);
      });
      if (user === null)
        err = UserShowInteractor.createShowingError(
          inputData,
          "The user with this ID doesn't exist"
        );
    } catch (e: unknown) {
      err = UserShowInteractor.createShowingError(inputData, e);
    }

    const outputData: UserShowOutputData = {
      id: user?.id.value,
      name: user?.name.value,
      err,
    };
    this.#outputPort.handle(outputData);

    if (err !== undefined) throw err;
  }

  private static createShowingError(
    inputData: UserShowInputData,
    err: unknown
  ) {
    const header = `Failed to show the user with ID: ${inputData.id}.\n`;
    const message =
      err instanceof Error
        ? `${header}${err.name}: ${err.message}`
        : `${header}${err}`;
    return new ShowingError(message);
  }
}
