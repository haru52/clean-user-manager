#! /usr/bin/env node

import ConsoleUi from './ui/console-ui';
import ConsoleUserAddPresenter from './interface-adapters/presenters/user/console-user-add-presenter';
import { PackageData } from './ui/package-data';
import SQLiteUserRepository from './db/sqlite-user-repository';
import UserAddInteractor from './use-cases/user/add/user-add-interactor';
import UserController from './interface-adapters/controllers/user-controller';
import { UserRepository } from './use-cases/user/user-repository';

const packageData: PackageData = require('../package.json');

function initInstances() {
  // Inject dependencies
  const userRepository: UserRepository = new SQLiteUserRepository;
  const userAddInteractor = new UserAddInteractor(userRepository, new ConsoleUserAddPresenter);
  const userController = new UserController(userAddInteractor);
  const consoleUi = new ConsoleUi(packageData, userController);
  return { consoleUi, userRepository };
}

async function main() {
  const { consoleUi, userRepository } = initInstances();
  await consoleUi.handle();

  userRepository.close();
}

main();
