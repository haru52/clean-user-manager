import { UserAddInputBoundary } from './user-add-input-boundary';
import { UserAddInputData } from './user-add-input-data';
import { UserAddOutputBoundary } from './user-add-output-boundary';
import { UserAddOutputData } from './user-add-output-data';
import { UserRepository } from '../user-repository';

export default class UserAddInteractor implements UserAddInputBoundary {
  readonly #repository;

  readonly #outputBoundary;

  constructor(repository: UserRepository, outputBoundary: UserAddOutputBoundary) {
    this.#repository = repository;
    this.#outputBoundary = outputBoundary;
  }

  async handle(inputData: UserAddInputData) {
    const user = await this.#repository.save(inputData.name);
    const outputData: UserAddOutputData = {
      name: user.name,
      id: user.id,
    };
    this.#outputBoundary.present(outputData);
  }
}
