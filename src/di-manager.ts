import ConsoleUi from './external/ui/console-ui';
import ConsoleView from './external/views/console-view';
import { PackageData } from './external/ui/package-data';
import SqliteUserRepository from './external/db/sqlite-user-repository';
import UserController from './adapters/controllers/user-controller';
import { UserRegisterInputBoundary } from './use-cases/user/register/user-register-input-boundary';
import UserRegisterInteractor from './use-cases/user/register/user-register-interactor';
import UserRegisterPresenter from './adapters/presenters/user/user-register-presenter';
import { UserRepository } from './adapters/repositories/user-repository';

const packageData: PackageData = require('../package.json');

export default class DiManager {
  readonly userRepository: UserRepository = new SqliteUserRepository();

  readonly consoleUi;

  constructor() {
    const userRegisterInputBoundary: UserRegisterInputBoundary =
      new UserRegisterInteractor(
        this.userRepository,
        new UserRegisterPresenter(new ConsoleView())
      );
    const userController = new UserController(userRegisterInputBoundary);
    this.consoleUi = new ConsoleUi(packageData, userController);
  }
}
