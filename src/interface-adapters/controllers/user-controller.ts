import { UserAddInputBoundary } from '../../use-cases/user/add/user-add-input-boundary';
import { UserAddInputData } from '../../use-cases/user/add/user-add-input-data';

export default class UserController {
  readonly #addInputBoundary;

  constructor(addInputBoundary: UserAddInputBoundary) {
    this.#addInputBoundary = addInputBoundary;
  }

  create(name: string) {
    const inputData: UserAddInputData = { name };
    return this.#addInputBoundary.handle(inputData);
  }
}
