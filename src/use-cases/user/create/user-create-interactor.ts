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
    const user = await this.#repository.save(inputData.name);
    const outputData: UserCreateOutputData = {
      name: user.name,
      id: user.id.value,
    };
    this.#outputBoundary.present(outputData);
  }
}
