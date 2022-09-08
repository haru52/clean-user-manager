import { Command } from 'commander';
import { injectable } from 'tsyringe';
import PackageData from '../../data/package-data.json';
import UserController from '../../adapters/controllers/user-controller';

@injectable()
export default class ConsoleUi {
  readonly #userController;

  constructor(userController: UserController) {
    this.#userController = userController;
  }

  handle() {
    const program = new Command();

    program
      .name(PackageData.name)
      .description(PackageData.description)
      .version(PackageData.version);

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
