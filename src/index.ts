#!/usr/bin/env node

import './di/dependency-injector';
import { container } from 'tsyringe';
import ConsoleUi from './external/ui/console-ui';
import SqliteDbConnector from './adapters/repositories/sqlite-db-connector';

async function main() {
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
