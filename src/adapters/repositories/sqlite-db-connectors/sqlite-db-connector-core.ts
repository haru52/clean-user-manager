import sqlite3 from 'sqlite3';

export default class SqliteDbConnectorCore {
  readonly db;

  constructor(dbName: string) {
    const sqlite3Client = sqlite3.verbose();
    this.db = new sqlite3Client.Database(dbName);
  }

  close() {
    this.db.close();
  }
}
