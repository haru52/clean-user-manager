import { container } from 'tsyringe';
import ConsoleView from '../external/views/console-view';
import SqliteUserRepository from '../adapters/repositories/sqlite-user-repository';
import TYPES from './types';
import UserRegisterInteractor from '../use-cases/user/register/user-register-interactor';
import UserRegisterPresenter from '../adapters/presenters/user/user-register-presenter';

const packageData = require('../../package.json');

export default class DependencyInjectorBase {
  static run() {
    // Common
    container.register(TYPES.PackageData, {
      useValue: packageData,
    });
    container.register(TYPES.View, {
      useClass: ConsoleView,
    });

    // User
    container.register(TYPES.UserRepository, {
      useClass: SqliteUserRepository,
    });

    // Register
    container.register(TYPES.UserRegisterInputPort, {
      useClass: UserRegisterInteractor,
    });
    container.register(TYPES.UserRegisterOutputPort, {
      useClass: UserRegisterPresenter,
    });
  }
}
