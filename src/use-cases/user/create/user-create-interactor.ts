import { UserCreateInputBoundary } from './user-create-input-boundary';
import { UserCreateInputData } from './user-create-input-data';
import { UserCreateOutputBoundary } from './user-create-output-boundary';
import { UserCreateOutputData } from './user-create-output-data';
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
    let err: Error | undefined;
    const user = await this.#repository
      .save(inputData.name)
      .catch((e: Error) => {
        err = e;
      });
    const outputData: UserCreateOutputData = {
      id: user?.id.value,
      name: user?.name.value,
      err,
    };
    this.#outputBoundary.present(outputData);
  }
}
