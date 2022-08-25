import { UserCreateInputBoundary } from '../../use-cases/user/create/user-create-input-boundary';
import { UserCreateInputData } from '../../use-cases/user/create/user-create-input-data';

export default class UserController {
  readonly #createInputBoundary;

  constructor(createInputBoundary: UserCreateInputBoundary) {
    this.#createInputBoundary = createInputBoundary;
  }

  create(name: string) {
    const inputData: UserCreateInputData = { name };
    return this.#createInputBoundary.handle(inputData);
  }
}
