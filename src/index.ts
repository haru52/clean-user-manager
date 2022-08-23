import SQLiteUserRepository from './db/sqlite-user-repository';
import UserAddInteractor from './use-cases/user/add/user-add-interactor';
import UserAddPresenter from './interface-adapters/presenters/user/user-add-presenter';
import UserController from './interface-adapters/controllers/user-controller';

const sqliteUserRepository = new SQLiteUserRepository;

function initInstances() {
  // Inject dependencies
  const userAddInteractor = new UserAddInteractor(sqliteUserRepository, new UserAddPresenter);
  const userController = new UserController(userAddInteractor);
  return { userController };
}

function main() {
  const instances = initInstances();
  instances.userController.create('John Doe');
  sqliteUserRepository.close();
}

main();
