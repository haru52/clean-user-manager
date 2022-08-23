import path from 'path';
import User from '../entities/user';
import { UserRepository } from '../use-cases/user/user-repository';

const sqlite3 = require('sqlite3').verbose();

export default class SQLiteUserRepository implements UserRepository {
  static readonly #dbPath = path.resolve(__dirname, '../../db/user_manager.db');

  readonly #db = new sqlite3.Database(SQLiteUserRepository.#dbPath);

  async save(name: string) {
    const usersTableExists = await this.#tableExists()
    if (!usersTableExists) await this.#createTable();

    const id = await (() => new Promise<number>((resolve) => {
      this.#db.serialize(() => {
        this.#db.run('INSERT INTO users (name) VALUES (?)', name);
        // this.#db.run('INSERT INTO users (name) VALUES ("John Doe")');
        this.#db.all('SELECT id FROM users WHERE name = "John Doe"', (err: any, rows: any) => resolve(rows[0].id));
      });
    }))();

    return new User(id, name);
  }

  async find(id: number) {
    const usersTableExists = await this.#tableExists()
    if (!usersTableExists) await this.#createTable();

    return new Promise<User>((resolve) => {
      this.#db.all('SELECT * FROM users WHERE id = ? LIMIT 1', id, (err: any, rows: any) => {
        const user = rows[0];
        resolve(new User(user.id, user.name));
      });
    });
  }

  close() {
    this.#db.close();
  }

  async #tableExists() {
    let exists = true;
    const tables = await (async () => new Promise<any[]>((resolve) => {
      this.#db.all('SELECT name FROM sqlite_master WHERE type = "table" AND name = "users"', (err: any, rows: any) => {
        if (err) exists = false;
        resolve(rows);
      });
    }))();
    if (tables.length === 0) exists = false;
    return exists;
  }

  #createTable() {
    return new Promise<void>((resolve) => {
      this.#db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)', resolve);
    });
  }
}
