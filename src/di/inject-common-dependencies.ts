import 'reflect-metadata';
import { container } from 'tsyringe';
import ConsoleView from '../external/views/console-view';
import SqliteUserRepository from '../adapters/repositories/sqlite-user-repository';
import TYPES from './types';
import UserRegisterInteractor from '../usecases/user/register/user-register-interactor';
import UserRegisterPresenter from '../adapters/presenters/user/user-register-presenter';
import UserShowInteractor from '../usecases/user/show/user-show-interactor';
import UserShowPresenter from '../adapters/presenters/user/user-show-presenter';

// General
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

// Show
container.register(TYPES.UserShowInputPort, {
  useClass: UserShowInteractor,
});
container.register(TYPES.UserShowOutputPort, {
  useClass: UserShowPresenter,
});
