import { inject, injectable } from 'tsyringe';
import RegistrationError from '../../registration-error';
import TYPES from '../../../types';
import User from '../../../entities/user';
import UserName from '../../../entities/user-name';
import { UserRegisterInputData } from './user-register-input-data';
import { UserRegisterInputPort } from './user-register-input-port';
import { UserRegisterOutputData } from './user-register-output-data';
import { UserRegisterOutputPort } from './user-register-output-port';
import { UserRepository } from '../user-repository';

@injectable()
export default class UserRegisterInteractor implements UserRegisterInputPort {
  readonly #repository;

  readonly #outputPort;

  constructor(
    @inject(TYPES.UserRepository) repository: UserRepository,
    @inject(TYPES.UserRegisterOutputPort) outputPort: UserRegisterOutputPort
  ) {
    this.#repository = repository;
    this.#outputPort = outputPort;
  }

  async handle(inputData: UserRegisterInputData) {
    let err: RegistrationError | undefined;
    let user: User | void | undefined;

    try {
      UserName.validate(inputData.name);
    } catch (e: unknown) {
      if (!(e instanceof Error)) throw e;
      err = UserRegisterInteractor.createCreationError(inputData, e);
    }

    if (err === undefined) {
      user = await this.#repository
        .save(inputData.name)
        .catch(<E extends Error>(e: E) => {
          err = UserRegisterInteractor.createCreationError(inputData, e);
        });
    }

    const outputData: UserRegisterOutputData = {
      id: user?.id.value,
      name: user?.name.value,
      err,
    };
    this.#outputPort.handle(outputData);
  }

  private static createCreationError<E extends Error>(
    inputData: UserRegisterInputData,
    e: E
  ) {
    return new RegistrationError(
      `Failed to register the user “${inputData.name}”.\n${e.name}: ${e.message}`
    );
  }
}
