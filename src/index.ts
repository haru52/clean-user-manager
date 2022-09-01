#!/usr/bin/env node

import 'reflect-metadata';
import { container } from 'tsyringe';
import ConsoleUi from './external/ui/console-ui';
import DependencyInjector from './di/dependency-injector';
import SqliteDbConnector from './adapters/repositories/sqlite-db-connector';

async function main() {
  DependencyInjector.run();

  const consoleUi = container.resolve(ConsoleUi);
  await consoleUi.handle();

  const dbConnector = container.resolve(SqliteDbConnector);
  dbConnector.close();
}

main();
