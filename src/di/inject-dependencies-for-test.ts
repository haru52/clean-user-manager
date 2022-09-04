import './inject-dependencies-base';
import { container } from 'tsyringe';
import InMemorySqliteDbConnector from '../adapters/repositories/sqlite-db-connectors/in-memory-sqlite-db-connector';
import TYPES from './types';

// General
container.register(TYPES.SqliteDbConnector, {
  useClass: InMemorySqliteDbConnector,
});
