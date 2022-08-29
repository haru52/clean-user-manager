import RegistrationError from '../../registration-error';
import User from '../../../entities/user';
import { UserRegisterInputBoundary } from './user-register-input-boundary';
import { UserRegisterInputData } from './user-register-input-data';
import { UserRegisterOutputBoundary } from './user-register-output-boundary';
import { UserRegisterOutputData } from './user-register-output-data';
import UserName from '../../../entities/user-name';
import { UserRepository } from '../../../adapters/repositories/user-repository';

export default class UserRegisterInteractor
  implements UserRegisterInputBoundary
{
  readonly #repository;

  readonly #outputBoundary;

  constructor(
    repository: UserRepository,
    outputBoundary: UserRegisterOutputBoundary
  ) {
    this.#repository = repository;
    this.#outputBoundary = outputBoundary;
  }

  async handle(inputData: UserRegisterInputData) {
    let err: RegistrationError | undefined;
    let user: User | void | undefined;

    try {
      UserName.validate(inputData.name);
    } catch (e: unknown) {
      if (!(e instanceof Error)) throw e;
      err = UserRegisterInteractor.#createCreationError(inputData, e);
    }

    if (err === undefined) {
      user = await this.#repository
        .save(inputData.name)
        .catch(<E extends Error>(e: E) => {
          err = UserRegisterInteractor.#createCreationError(inputData, e);
        });
    }

    const outputData: UserRegisterOutputData = {
      id: user?.id.value,
      name: user?.name.value,
      err,
    };
    this.#outputBoundary.handle(outputData);
  }

  static #createCreationError<E extends Error>(
    inputData: UserRegisterInputData,
    e: E
  ) {
    return new RegistrationError(
      `Failed to register the user “${inputData.name}”.\n${e.name}: ${e.message}`
    );
  }
}
