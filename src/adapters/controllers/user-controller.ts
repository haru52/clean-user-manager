import { UserRegisterInputBoundary } from '../../use-cases/user/register/user-register-input-boundary';
import { UserRegisterInputData } from '../../use-cases/user/register/user-register-input-data';

export default class UserController {
  readonly #registerInputBoundary;

  constructor(registerInputBoundary: UserRegisterInputBoundary) {
    this.#registerInputBoundary = registerInputBoundary;
  }

  register(name: string) {
    const inputData: UserRegisterInputData = { name };
    return this.#registerInputBoundary.handle(inputData);
  }
}
