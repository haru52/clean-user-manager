import { singleton } from 'tsyringe';
import { SqliteDbConnector } from '../sqlite-db-connector';
import SqliteDbConnectorCore from './sqlite-db-connector-core';

@singleton()
export default class InMemorySqliteDbConnector implements SqliteDbConnector {
  readonly db;

  readonly #core;

  constructor() {
    // https://github.com/TryGhost/node-sqlite3/wiki/API#new-sqlite3databasefilename--mode--callback
    this.#core = new SqliteDbConnectorCore(':memory:');
    this.db = this.#core.db;
  }

  close() {
    this.#core.close();
  }
}
