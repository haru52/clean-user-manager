import { container } from 'tsyringe';
import DependencyInjectorBase from './dependency-injector-base';
import SqliteUserRepository from './adapters/repositories/sqlite-user-repository';

export default class DependencyInjectorForTest {
  static run() {
    // Base
    DependencyInjectorBase.run();

    // User
    container.register('UserRepository', {
      useValue: new SqliteUserRepository(true),
    });
  }
}
