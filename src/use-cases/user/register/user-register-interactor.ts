import { inject, injectable } from 'tsyringe';
import RegistrationError from '../../../errors/registration-error';
import TYPES from '../../../di/types';
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
      const name = new UserName(inputData.name);
      user = await this.#repository
        .save(name)
        .catch(<E extends Error>(e: E) => {
          err = UserRegisterInteractor.createRegistrationError(inputData, e);
        });
    } catch (e: unknown) {
      if (!(e instanceof Error)) throw e;
      err = UserRegisterInteractor.createRegistrationError(inputData, e);
    }

    const outputData: UserRegisterOutputData = {
      id: user?.id.value,
      name: user?.name.value,
      err,
    };
    this.#outputPort.handle(outputData);

    if (err !== undefined) throw err;
  }

  private static createRegistrationError<E extends Error>(
    inputData: UserRegisterInputData,
    e: E
  ) {
    return new RegistrationError(
      `Failed to register the user “${inputData.name}”.\n${e.name}: ${e.message}`
    );
  }
}
