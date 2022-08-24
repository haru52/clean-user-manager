import path from 'path';
import sqlite3 from 'sqlite3';
import User from '../entities/user';
import { UserRepository } from '../use-cases/user/user-repository';

export default class SQLiteUserRepository implements UserRepository {
  readonly #db;

  constructor() {
    const sqlite3Client = sqlite3.verbose();
    const dbPath = path.resolve(__dirname, '../../db/user_manager.db');
    this.#db = new sqlite3Client.Database(dbPath);
  }

  async save(name: string) {
    const usersTableExists = await this.#tableExists()
    if (!usersTableExists) await this.#createTable();

    return new Promise<User>(resolve => {
      this.#db.serialize(() => {
        this.#db.run('INSERT INTO users (name) VALUES (?)', name);
        this.#db.all('SELECT id FROM users WHERE name = ?', name, (err: Error | null, rows: any[]) => {
          resolve(new User(rows[0].id, name))
        });
      });
    });
  }

  async find(id: number) {
    const usersTableExists = await this.#tableExists()
    if (!usersTableExists) await this.#createTable();

    return new Promise<User>(resolve => {
      this.#db.all('SELECT * FROM users WHERE id = ? LIMIT 1', id, (err: Error | null, rows: any[]) => {
        const user = rows[0];
        resolve(new User(user.id, user.name));
      });
    });
  }

  close() {
    this.#db.close();
  }

  #tableExists() {
    return new Promise<boolean>(resolve => {
      this.#db.all('SELECT name FROM sqlite_master WHERE type = "table" AND name = "users"', (err: Error | null, rows: any[]) => {
        if (err) resolve(false);
        resolve(rows.length >= 1);
      });
    });
  }

  #createTable() {
    return new Promise<void>(resolve => {
      this.#db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)', resolve);
    });
  }
}
