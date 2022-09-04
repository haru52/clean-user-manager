#!/usr/bin/env node

import './di/inject-dependencies';
import { container } from 'tsyringe';
import ConsoleUi from './external/ui/console-ui';
import SqliteDbConnector from './adapters/repositories/sqlite-db-connector';

async function main() {
  const consoleUi = container.resolve(ConsoleUi);
  let isErr = false;
  await consoleUi.handle().catch(() => {
    isErr = true;
  });

  const dbConnector = container.resolve(SqliteDbConnector);
  dbConnector.close();

  if (isErr) process.exit(1);
}

main();
