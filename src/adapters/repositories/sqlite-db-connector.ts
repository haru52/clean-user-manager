import fs from 'fs';
import path from 'path';
import process from 'process';
import { inject, singleton } from 'tsyringe';
import sqlite3 from 'sqlite3';
import DbConnectionError from './errors/db-connection-error';
import TYPES from '../../di/types';

@singleton()
export default class SqliteDbConnector {
  readonly db;

  /**
   * Initialize an SqliteDbConnector instance.
   *
   * @param useInMemory - Whether to use an in memory DB or a DB file
   * @returns SqliteDbConnector instance
   *
   * @throws {@link DbConnectionError}
   * This exception is thrown if the home directory can't be found where the DB file resides.
   */
  constructor(@inject(TYPES.UseInMemory) useInMemory = false) {
    const sqlite3Client = sqlite3.verbose();
    const dbPath = useInMemory ? ':memory:' : SqliteDbConnector.getDbPath();
    this.db = new sqlite3Client.Database(dbPath);
  }

  close() {
    this.db.close();
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
