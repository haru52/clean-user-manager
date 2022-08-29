import { Command } from 'commander';
import { PackageData } from './package-data';
import UserController from '../../adapters/controllers/user-controller';

export default class ConsoleUi {
  readonly #program = new Command();

  readonly #packageData;

  readonly #userController;

  constructor(packageData: PackageData, userController: UserController) {
    this.#packageData = packageData;
    this.#userController = userController;
  }

  handle() {
    const commandName = this.#packageData.name.split('/')[1];

    this.#program
      .name(commandName)
      .description(this.#packageData.description)
      .version(this.#packageData.version);

    return new Promise<void>((resolve) => {
      this.#program
        .command('register')
        .description('register a new user')
        .argument('<name>', 'user name')
        .action(async (name) => {
          await this.#userController.register(name);
          resolve();
        });

      this.#program.parse();
    });
  }
}
