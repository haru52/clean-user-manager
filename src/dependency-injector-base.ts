import { container } from 'tsyringe';
import ConsoleView from './external/views/console-view';
import UserRegisterInteractor from './use-cases/user/register/user-register-interactor';
import UserRegisterPresenter from './adapters/presenters/user/user-register-presenter';

const packageData = require('../package.json');

export default class DependencyInjectorBase {
  static run() {
    // Common
    container.register('PackageData', {
      useValue: packageData,
    });
    container.register('View', {
      useClass: ConsoleView,
    });

    // User
    // Register
    container.register('UserRegisterInputPort', {
      useClass: UserRegisterInteractor,
    });
    container.register('UserRegisterOutputPort', {
      useClass: UserRegisterPresenter,
    });
  }
}
