import { UserCreateInputBoundary } from '../../use-cases/user/create/user-create-input-boundary';
import { UserCreateInputData } from '../../use-cases/user/create/user-create-input-data';

export default class UserController {
  readonly #addInputBoundary;

  constructor(addInputBoundary: UserCreateInputBoundary) {
    this.#addInputBoundary = addInputBoundary;
  }

  create(name: string) {
    const inputData: UserCreateInputData = { name };
    return this.#addInputBoundary.handle(inputData);
  }
}
