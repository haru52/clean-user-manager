import { inject, injectable } from 'tsyringe';
import NotFoundError from '../../errors/not-found-error';
import { SqliteDbConnector } from './sqlite-db-connector';
import TYPES from '../../di/types';
import { UnsavedUser } from '../../types';
import User from '../../entities/user';
import UserId from '../../entities/user-id';
import UserName from '../../entities/user-name';
import { UserRepository } from '../../use-cases/user/user-repository';

@injectable()
export default class SqliteUserRepository implements UserRepository {
  readonly #db;

  constructor(@inject(TYPES.SqliteDbConnector) dbConnector: SqliteDbConnector) {
    this.#db = dbConnector.db;
  }

  async save(user: UnsavedUser) {
    const usersTableExists = await this.#tableExists();
    if (!usersTableExists) await this.#createTable();

    return new Promise<UserId>((resolve, reject) => {
      this.#db.serialize(() => {
        this.#db.run(
          'INSERT INTO users (name) VALUES (?)',
          user.name.value,
          (err: Error | null) => {
            if (err !== null) reject(err);
          }
        );
        this.#db.all(
          'SELECT id FROM users WHERE name = ?',
          user.name.value,
          (err: Error | null, rows: any[]) => {
            if (err !== null) {
              reject(err);
              return;
            }
            if (rows.length === 0) {
              reject(
                new NotFoundError(
                  `Not found the newly inserted user which name is “${user.name.value}”`
                )
              );
              return;
            }
            try {
              const id = new UserId(rows[0].id);
              resolve(id);
            } catch (e: unknown) {
              reject(e);
            }
          }
        );
      });
    });
  }

  async find(id: UserId) {
    const usersTableExists = await this.#tableExists();
    if (!usersTableExists) await this.#createTable();

    return new Promise<User | null>((resolve, reject) => {
      this.#db.all(
        'SELECT * FROM users WHERE id = ? LIMIT 1',
        id.value,
        (err: Error | null, rows: any[]) => {
          if (err !== null) {
            reject(err);
            return;
          }
          if (rows.length === 0) {
            resolve(null);
            return;
          }
          const userData = rows[0];
          try {
            const userId = new UserId(userData.id);
            const userName = new UserName(userData.name);
            const user = new User(userId, userName);
            resolve(user);
          } catch (e: unknown) {
            reject(e);
          }
        }
      );
    });
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
}
