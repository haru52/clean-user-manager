import fs from 'fs';
import path from 'path';
import process from 'process';
import sqlite3 from 'sqlite3';
import DbCreationError from './db-creation-error';
import NotFoundError from './not-found-error';
import User from '../../entities/user';
import { UserRepository } from '../../use-cases/user/user-repository';

export default class SqliteUserRepository implements UserRepository {
  readonly #db;

  /**
   * Initialize an SqliteUserRepository instance.
   *
   * @param useInMemory - Whether to use an in memory DB or a DB file
   * @returns SqliteUserRepository instance
   *
   * @throws {@link DbCreationError}
   * This exception is thrown if the home directory can't be found to create the DB file.
   */
  constructor(useInMemory = false) {
    const sqlite3Client = sqlite3.verbose();
    const dbPath = useInMemory ? ':memory:' : SqliteUserRepository.#getDbPath();
    this.#db = new sqlite3Client.Database(dbPath);
  }

  async save(name: string) {
    const usersTableExists = await this.#tableExists();
    if (!usersTableExists) await this.#createTable();

    return new Promise<User>((resolve, reject) => {
      this.#db.serialize(() => {
        this.#db.run(
          'INSERT INTO users (name) VALUES (?)',
          name,
          (err: Error | null) => {
            if (err !== null) reject(err);
          }
        );
        this.#db.all(
          'SELECT id FROM users WHERE name = ?',
          name,
          (err: Error | null, rows: any[]) => {
            if (err !== null) {
              reject(err);
              return;
            }
            if (rows.length === 0) {
              reject(
                new NotFoundError(`Not found a user which name is “${name}”`)
              );
              return;
            }
            try {
              const user = new User(rows[0].id, name);
              resolve(user);
            } catch (e: unknown) {
              reject(e);
            }
          }
        );
      });
    });
  }

  async find(id: number) {
    const usersTableExists = await this.#tableExists();
    if (!usersTableExists) await this.#createTable();

    return new Promise<User>((resolve, reject) => {
      this.#db.all(
        'SELECT * FROM users WHERE id = ? LIMIT 1',
        id,
        (err: Error | null, rows: any[]) => {
          if (err !== null) {
            reject(err);
            return;
          }
          if (rows.length === 0) {
            reject(new NotFoundError(`Not found a user with ID ${id}`));
            return;
          }
          const userData = rows[0];
          try {
            const user = new User(userData.id, userData.name);
            resolve(user);
          } catch (e: unknown) {
            reject(e);
          }
        }
      );
    });
  }

  close() {
    this.#db.close();
  }

  #tableExists() {
    return new Promise<boolean>((resolve, reject) => {
      this.#db.all(
        'SELECT name FROM sqlite_master WHERE type = "table" AND name = "users"',
        (err: Error | null, rows: any[]) => {
          if (err !== null) {
            reject(err);
            return;
          }
          if (rows === undefined) {
            reject(err);
            return;
          }
          resolve(rows.length >= 1);
        }
      );
    });
  }

  #createTable() {
    return new Promise<void>((resolve, reject) => {
      this.#db.run(
        'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)',
        (err: Error | null) => {
          if (err !== null) {
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
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
