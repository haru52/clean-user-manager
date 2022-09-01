import fs from 'fs';
import path from 'path';
import process from 'process';
import sqlite3 from 'sqlite3';
import DbCreationError from './db-creation-error';

export default class SqliteDbConnector {
  readonly db;

  /**
   * Initialize an SqliteDbConnector instance.
   *
   * @param useInMemory - Whether to use an in memory DB or a DB file
   * @returns SqliteDbConnector instance
   *
   * @throws {@link DbCreationError}
   * This exception is thrown if the home directory can't be found to create the DB file.
   */
  constructor(useInMemory = false) {
    const sqlite3Client = sqlite3.verbose();
    const dbPath = useInMemory ? ':memory:' : SqliteDbConnector.#getDbPath();
    this.db = new sqlite3Client.Database(dbPath);
  }

  /**
   * Get the DB file path.
   *
   * @returns DB file path
   *
   * @throws {@link DbCreationError}
   * This exception is thrown if the home directory can't be found to create the DB file.
   */
  static #getDbPath() {
    const homeDirPath =
      process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

    if (homeDirPath === undefined)
      throw new DbCreationError(
        'Failed to create the DB file to the home directory'
      );

    const dbDirPath = path.resolve(homeDirPath, '.usermgr');
    if (!fs.existsSync(dbDirPath)) fs.mkdirSync(dbDirPath);
    return path.resolve(dbDirPath, 'usermgr.db');
  }
}
