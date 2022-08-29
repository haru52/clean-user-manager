import { UserRegisterInputBoundary } from '../../use-cases/user/register/user-register-input-boundary';
import { UserRegisterInputData } from '../../use-cases/user/register/user-register-input-data';

export default class UserController {
  readonly #createInputBoundary;

  constructor(createInputBoundary: UserRegisterInputBoundary) {
    this.#createInputBoundary = createInputBoundary;
  }

  register(name: string) {
    const inputData: UserRegisterInputData = { name };
    return this.#createInputBoundary.handle(inputData);
  }
}
