import sqlite3 from 'sqlite3';
import SqliteDbConnectorCore from './sqlite-db-connector-core';

const core = new SqliteDbConnectorCore(':memory:');

describe('#constructor', () => {
  test('db property is instance of sqlite3.Database', () => {
    expect(core.db).toBeInstanceOf(sqlite3.Database);
  });
});

describe('#close', () => {
  test("hasn't thrown an error", () => {
    expect(() => core.close()).not.toThrow();
  });
});
