import SQLiteUserRepository from './db/sqlite-user-repository';
import UserAddInteractor from './use-cases/user/add/user-add-interactor';
import UserAddConsolePresenter from './interface-adapters/presenters/user/user-add-console-presenter';
import UserController from './interface-adapters/controllers/user-controller';

const sqliteUserRepository = new SQLiteUserRepository;

function initInstances() {
  // Inject dependencies
  const userAddInteractor = new UserAddInteractor(sqliteUserRepository, new UserAddConsolePresenter);
  const userController = new UserController(userAddInteractor);
  return { userController };
}

async function main() {
  const { userController } = initInstances();
  await userController.create('John Doe');
  await userController.create('Alice Smith');
  await userController.create('Bob Smith');

  sqliteUserRepository.close();
}

main();