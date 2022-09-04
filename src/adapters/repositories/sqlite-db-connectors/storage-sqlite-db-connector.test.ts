import 'reflect-metadata';
import sqlite3 from 'sqlite3';
import StorageSqliteDbConnector from './storage-sqlite-db-connector';

const connector = new StorageSqliteDbConnector();

describe('#constructor', () => {
  test('db property is instance of sqlite3.Database', () => {
    expect(connector.db).toBeInstanceOf(sqlite3.Database);
  });
});

describe('#close', () => {
  test("hasn't thrown an error", () => {
    expect(() => connector.close()).not.toThrow();
  });
});
