#! /usr/bin/env node

import { UserRepository } from 'use-cases/user/user-repository';
import ConsoleUserAddPresenter from './interface-adapters/presenters/user/console-user-add-presenter';
import SQLiteUserRepository from './db/sqlite-user-repository';
import UserAddInteractor from './use-cases/user/add/user-add-interactor';
import UserController from './interface-adapters/controllers/user-controller';

function initInstances() {
  // Inject dependencies
  const userRepository: UserRepository = new SQLiteUserRepository;
  const userAddInteractor = new UserAddInteractor(userRepository, new ConsoleUserAddPresenter);
  const userController = new UserController(userAddInteractor);
  return { userController, userRepository };
}

async function main() {
  const { userController, userRepository } = initInstances();

  await userController.create('John Doe');
  await userController.create('Alice Smith');
  await userController.create('Bob Smith');

  userRepository.close();
}

main();
