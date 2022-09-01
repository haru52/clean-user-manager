#!/usr/bin/env node

import 'reflect-metadata';
import { container } from 'tsyringe';
import ConsoleUi from './external/ui/console-ui';
import DependencyInjector from './di/dependency-injector';
import SqliteDbConnector from './adapters/repositories/sqlite-db-connector';

async function main() {
  DependencyInjector.run();

  const consoleUi = container.resolve(ConsoleUi);
  let isError = false;
  await consoleUi.handle().catch(() => {
    isError = true;
  });

  const dbConnector = container.resolve(SqliteDbConnector);
  dbConnector.close();

  if (isError) process.exit(1);
}

main();
