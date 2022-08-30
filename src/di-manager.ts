import ConsoleUi from './external/ui/console-ui';
import ConsoleView from './external/views/console-view';
import { PackageData } from './external/ui/package-data';
import SqliteUserRepository from './adapters/repositories/sqlite-user-repository';
import UserController from './adapters/controllers/user-controller';
import { UserRegisterInputPort } from './use-cases/user/register/user-register-input-port';
import UserRegisterInteractor from './use-cases/user/register/user-register-interactor';
import UserRegisterPresenter from './adapters/presenters/user/user-register-presenter';
import { UserRepository } from './use-cases/user/user-repository';

const packageData: PackageData = require('../package.json');

export default class DiManager {
  readonly userRepository: UserRepository = new SqliteUserRepository();

  readonly consoleUi;

  constructor() {
    const userRegisterInputPort: UserRegisterInputPort =
      new UserRegisterInteractor(
        this.userRepository,
        new UserRegisterPresenter(new ConsoleView())
      );
    const userController = new UserController(userRegisterInputPort);
    this.consoleUi = new ConsoleUi(packageData, userController);
  }
}
