import { Command } from 'commander';
import { inject, injectable } from 'tsyringe';
import { PackageData } from './package-data';
import TYPES from '../../di/types';
import UserController from '../../adapters/controllers/user-controller';

@injectable()
export default class ConsoleUi {
  readonly #packageData;

  readonly #userController;

  constructor(
    @inject(TYPES.PackageData) packageData: PackageData,
    userController: UserController
  ) {
    this.#packageData = packageData;
    this.#userController = userController;
  }

  handle() {
    const program = new Command();
    const commandName = this.#packageData.name.split('/')[1];

    program
      .name(commandName)
      .description(this.#packageData.description)
      .version(this.#packageData.version);

    return new Promise<void>((resolve, reject) => {
      program
        .command('register')
        .description('register a new user')
        .argument('<name>', 'user name')
        .action(async (name) => {
          await this.#userController.register(name).catch((e: unknown) => {
            reject(e);
          });
          resolve();
        });

      program
        .command('show')
        .description('show the user')
        .argument('<id>', 'target user ID')
        .action(async (id) => {
          await this.#userController
            .show(parseFloat(id))
            .catch((e: unknown) => {
              reject(e);
            });
          resolve();
        });

      program.parse();
    });
  }
}
