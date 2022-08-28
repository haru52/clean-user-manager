import ConsoleUi from './external/ui/console-ui';
import ConsoleView from './external/views/console-view';
import { PackageData } from './external/ui/package-data';
import SQLiteUserRepository from './external/db/sqlite-user-repository';
import UserController from './adapters/controllers/user-controller';
import UserCreateInteractor from './use-cases/user/create/user-create-interactor';
import UserCreatePresenter from './adapters/presenters/user/user-create-presenter';
import { UserRepository } from './adapters/repositories/user-repository';

const packageData: PackageData = require('../package.json');

export default class DiManager {
  readonly userRepository: UserRepository = new SQLiteUserRepository();

  readonly consoleUi;

  constructor() {
    const userCreateInteractor = new UserCreateInteractor(
      this.userRepository,
      new UserCreatePresenter(new ConsoleView())
    );
    const userController = new UserController(userCreateInteractor);
    this.consoleUi = new ConsoleUi(packageData, userController);
  }
}
