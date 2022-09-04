import fs from 'fs';
import path from 'path';
import process from 'process';
import { singleton } from 'tsyringe';
import DbConnectionError from '../../../errors/db-connection-error';
import { SqliteDbConnector } from './sqlite-db-connector';
import SqliteDbConnectorCore from './sqlite-db-connector-core';

@singleton()
export default class StorageSqliteDbConnector implements SqliteDbConnector {
  readonly db;

  readonly #core;

  /**
   * Initialize a StorageSqliteDbConnector instance.
   *
   * @returns StorageSqliteDbConnector instance
   *
   * @throws {@link DbConnectionError}
   * This exception is thrown if the home directory can't be found where the DB file resides.
   */
  constructor() {
    const dbPath = StorageSqliteDbConnector.getDbPath();
    this.#core = new SqliteDbConnectorCore(dbPath);
    this.db = this.#core.db;
  }

  close() {
    this.#core.close();
  }

  /**
   * Get the DB file path.
   *
   * @returns DB file path
   *
   * @throws {@link DbConnectionError}
   * This exception is thrown if the home directory can't be found where the DB file resides.
   */
  private static getDbPath() {
    const homeDirPath =
      process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

    if (homeDirPath === undefined)
      throw new DbConnectionError(
        'Failed to connect to the DB file in the home directory'
      );

    const dbDirPath = path.resolve(homeDirPath, '.usermgr');
    if (!fs.existsSync(dbDirPath)) fs.mkdirSync(dbDirPath);
    return path.resolve(dbDirPath, 'usermgr.db');
  }
}
