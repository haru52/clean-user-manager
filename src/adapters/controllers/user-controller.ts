import { inject, injectable } from 'tsyringe';
import TYPES from '../../di/types';
import { UserRegisterInputData } from '../../use-cases/user/register/user-register-input-data';
import { UserRegisterInputPort } from '../../use-cases/user/register/user-register-input-port';
import { UserShowInputData } from '../../use-cases/user/show/user-show-input-data';
import { UserShowInputPort } from '../../use-cases/user/show/user-show-input-port';

@injectable()
export default class UserController {
  readonly #registerInputPort;

  readonly #showInputPort;

  constructor(
    @inject(TYPES.UserRegisterInputPort)
    registerInputPort: UserRegisterInputPort,
    @inject(TYPES.UserShowInputPort)
    showInputPort: UserShowInputPort
  ) {
    this.#registerInputPort = registerInputPort;
    this.#showInputPort = showInputPort;
  }

  register(name: string) {
    const inputData: UserRegisterInputData = { name };
    return this.#registerInputPort.handle(inputData);
  }

  show(id: number) {
    const inputData: UserShowInputData = { id };
    return this.#showInputPort.handle(inputData);
  }
}
