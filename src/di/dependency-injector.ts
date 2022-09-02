import './dependency-injector-base';
import { container } from 'tsyringe';
import TYPES from './types';

// Common
container.register(TYPES.UseInMemory, {
  useValue: false,
});
