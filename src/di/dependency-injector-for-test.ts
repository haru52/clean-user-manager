import { container } from 'tsyringe';
import DependencyInjectorBase from './dependency-injector-base';
import TYPES from './types';

export default class DependencyInjectorForTest {
  static run() {
    // Base
    DependencyInjectorBase.run();

    // Common
    container.register(TYPES.UseInMemory, {
      useValue: true,
    });
  }
}
