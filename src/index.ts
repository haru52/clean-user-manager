#!/usr/bin/env node

import ConsoleUi from './external/ui/console-ui';
import ConsoleView from './external/views/console-view';
import UserCreatePresenter from './adapters/presenters/user/user-create-presenter';
import { PackageData } from './external/ui/package-data';
import SQLiteUserRepository from './external/db/sqlite-user-repository';
import UserController from './adapters/controllers/user-controller';
import UserCreateInteractor from './use-cases/user/create/user-create-interactor';
import { UserRepository } from './use-cases/user/user-repository';

const packageData: PackageData = require('../package.json');

function initInstances() {
  // Inject dependencies
  const userRepository: UserRepository = new SQLiteUserRepository();
  const userCreateInteractor = new UserCreateInteractor(
    userRepository,
    new UserCreatePresenter(new ConsoleView())
  );
  const userController = new UserController(userCreateInteractor);
  const consoleUi = new ConsoleUi(packageData, userController);
  return { consoleUi, userRepository };
}

async function main() {
  const { consoleUi, userRepository } = initInstances();
  await consoleUi.handle();

  userRepository.close();
}

main();
