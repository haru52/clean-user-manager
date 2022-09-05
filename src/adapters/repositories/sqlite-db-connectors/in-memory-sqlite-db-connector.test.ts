import 'reflect-metadata';
import sqlite3 from 'sqlite3';
import InMemorySqliteDbConnector from './in-memory-sqlite-db-connector';

const connector = new InMemorySqliteDbConnector();

describe('#constructor', () => {
  test('db property is an instance of sqlite3.Database', () => {
    expect(connector.db).toBeInstanceOf(sqlite3.Database);
  });
});

describe('#close', () => {
  test("hasn't thrown an error", () => {
    expect(() => connector.close()).not.toThrow();
  });
});
