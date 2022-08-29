import path from 'path';
import process from 'process';
import sqlite3 from 'sqlite3';
import NotFoundError from './not-found-error';
import User from '../../entities/user';
import { UserRepository } from '../../adapters/repositories/user-repository';

export default class SqliteUserRepository implements UserRepository {
  readonly #db;

  static readonly #defaultDbPath = path.resolve(process.cwd(), 'usermgr.db');

  constructor(
    useInMemory = false,
    dbPath = SqliteUserRepository.#defaultDbPath
  ) {
    const sqlite3Client = sqlite3.verbose();
    const db = useInMemory ? ':memory:' : dbPath;
    this.#db = new sqlite3Client.Database(db);
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
}
