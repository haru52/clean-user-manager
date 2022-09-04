import './inject-dependencies-base';
import { container } from 'tsyringe';
import StorageSqliteDbConnector from '../adapters/repositories/sqlite-db-connectors/storage-sqlite-db-connector';
import TYPES from './types';

// General
container.register(TYPES.SqliteDbConnector, {
  useClass: StorageSqliteDbConnector,
});
