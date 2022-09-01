import sqlite3 from 'sqlite3';
import SqliteDbConnector from './sqlite-db-connector';

describe('#constructor', () => {
  const connector = new SqliteDbConnector(true);

  test('db property is instance of sqlite3.Database', () => {
    expect(connector.db).toBeInstanceOf(sqlite3.Database);
  });
});
