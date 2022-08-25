#! /usr/bin/env node

import { Command } from 'commander';
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

  const program = new Command();

  program
    .name('User Manager')
    .description('User management system. This is an example TypeScript project of Clean Architecture.')
    .version('0.1.0');

  program.command('create')
    .description('Create a new user')
    .argument('<name>', 'user name to create')
    .action(async name => {
      await userController.create(name);
      userRepository.close();
    });

  program.parse();
}

main();
