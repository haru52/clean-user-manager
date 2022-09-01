import { container } from 'tsyringe';
import DependencyInjectorBase from './dependency-injector-base';
import SqliteDbConnector from '../adapters/repositories/sqlite-db-connector';
import TYPES from './types';

export default class DependencyInjectorForTest {
  static run() {
    // Base
    DependencyInjectorBase.run();

    // Common
    const sqliteDbConnector = new SqliteDbConnector(true);
    container.register(TYPES.Sqlite3Database, {
      useValue: sqliteDbConnector.db,
    });
  }
}
