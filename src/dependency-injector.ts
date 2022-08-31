import { container } from 'tsyringe';
import ConsoleView from './external/views/console-view';
import SqliteUserRepository from './adapters/repositories/sqlite-user-repository';
import UserRegisterInteractor from './use-cases/user/register/user-register-interactor';
import UserRegisterPresenter from './adapters/presenters/user/user-register-presenter';

const packageData = require('../package.json');

export default class DependencyInjector {
  static run() {
    DependencyInjector.#registerDependencies();
  }

  static runForTest() {
    DependencyInjector.#registerDependencies(true);
  }

  static #registerDependencies(isTest = false) {
    // Common
    container.register('PackageData', {
      useValue: packageData,
    });
    container.register('View', {
      useClass: ConsoleView,
    });

    // User
    const sqliteUserRepository = isTest
      ? new SqliteUserRepository(true)
      : new SqliteUserRepository();
    container.register('UserRepository', {
      useValue: sqliteUserRepository,
    });

    // Register
    container.register('UserRegisterInputPort', {
      useClass: UserRegisterInteractor,
    });
    container.register('UserRegisterOutputPort', {
      useClass: UserRegisterPresenter,
    });
  }
}
