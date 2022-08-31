#!/usr/bin/env node

import 'reflect-metadata';
import { container } from 'tsyringe';
import ConsoleUi from './external/ui/console-ui';
import DependencyInjector from './dependency-injector';
import TYPES from './types';
import { UserRepository } from './use-cases/user/user-repository';

async function main() {
  DependencyInjector.run();

  const consoleUi = container.resolve(ConsoleUi);
  await consoleUi.handle();

  const userRepository = container.resolve<UserRepository>(
    TYPES.UserRepository
  );
  userRepository.close();
}

main();
