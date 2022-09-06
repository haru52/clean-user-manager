import { inject, injectable } from 'tsyringe';
import RegistrationError from '../../../errors/registration-error';
import TYPES from '../../../di/types';
import { UnsavedUser } from '../../../types';
import UserId from '../../../entities/user-id';
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
    let name: UserName | undefined;
    let id: UserId | void | undefined;
    let err: RegistrationError | undefined;

    try {
      name = new UserName(inputData.name);
      const user: UnsavedUser = { name };
      id = await this.#repository.save(user).catch((e: unknown) => {
        err = UserRegisterInteractor.createRegistrationError(inputData, e);
      });
    } catch (e: unknown) {
      err = UserRegisterInteractor.createRegistrationError(inputData, e);
    }

    const outputData: UserRegisterOutputData = {
      id: id?.value,
      name: name?.value,
      err,
    };
    this.#outputPort.handle(outputData);

    if (err !== undefined) throw err;
  }

  private static createRegistrationError(
    inputData: UserRegisterInputData,
    err: unknown
  ) {
    const header = `Failed to register the user “${inputData.name}”.\n`;
    const message =
      err instanceof Error
        ? `${header}${err.name}: ${err.message}`
        : `${header}${err}`;
    return new RegistrationError(message);
  }
}
