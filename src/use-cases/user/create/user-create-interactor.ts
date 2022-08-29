import CreationError from '../../creation-error';
import User from '../../../entities/user';
import { UserCreateInputBoundary } from './user-create-input-boundary';
import { UserCreateInputData } from './user-create-input-data';
import { UserCreateOutputBoundary } from './user-create-output-boundary';
import { UserCreateOutputData } from './user-create-output-data';
import UserName from '../../../entities/user-name';
import { UserRepository } from '../../../adapters/repositories/user-repository';

export default class UserCreateInteractor implements UserCreateInputBoundary {
  readonly #repository;

  readonly #outputBoundary;

  constructor(
    repository: UserRepository,
    outputBoundary: UserCreateOutputBoundary
  ) {
    this.#repository = repository;
    this.#outputBoundary = outputBoundary;
  }

  async handle(inputData: UserCreateInputData) {
    let err: CreationError | undefined;
    let user: User | void | undefined;

    try {
      UserName.validate(inputData.name);
    } catch (e: unknown) {
      if (!(e instanceof Error)) throw e;
      err = UserCreateInteractor.#createCreationError(inputData, e);
    }

    if (err === undefined) {
      user = await this.#repository
        .save(inputData.name)
        .catch(<E extends Error>(e: E) => {
          err = UserCreateInteractor.#createCreationError(inputData, e);
        });
    }

    const outputData: UserCreateOutputData = {
      id: user?.id.value,
      name: user?.name.value,
      err,
    };
    this.#outputBoundary.handle(outputData);
  }

  static #createCreationError<E extends Error>(
    inputData: UserCreateInputData,
    e: E
  ) {
    return new CreationError(
      `Failed to create the user “${inputData.name}”.\n${e.name}: ${e.message}`
    );
  }
}
