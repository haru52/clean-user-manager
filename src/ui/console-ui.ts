import { Command } from 'commander';
import { PackageData } from './package-data';
import UserController from '../interface-adapters/controllers/user-controller';

export default class ConsoleUi {
  readonly #program = new Command();

  readonly #packageData;

  readonly #userController;

  constructor(packageData: PackageData, userController: UserController) {
    this.#packageData = packageData;
    this.#userController = userController;
  }

  handle() {
    this.#program
      .name('User Manager')
      .description(this.#packageData.description)
      .version(this.#packageData.version);

    return new Promise<void>(resolve => {
      this.#program.command('create')
        .description('Create a new user')
        .argument('<name>', 'user name')
        .action(async name => {
          await this.#userController.create(name);
          resolve();
        });

      this.#program.parse();
    });
  }
}
