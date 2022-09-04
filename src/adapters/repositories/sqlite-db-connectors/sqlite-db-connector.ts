import sqlite3 from 'sqlite3';

export interface SqliteDbConnector {
  readonly db: sqlite3.Database;

  close(): void;
}
