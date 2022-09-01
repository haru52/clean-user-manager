import { inject, injectable } from 'tsyringe';
import TYPES from '../../../di/types';
import { UserRegisterOutputData } from '../../../use-cases/user/register/user-register-output-data';
import { UserRegisterOutputPort } from '../../../use-cases/user/register/user-register-output-port';
import { View } from '../../view';
import { ViewModel } from '../../view-model';

@injectable()
export default class UserRegisterPresenter implements UserRegisterOutputPort {
  readonly #view;

  constructor(@inject(TYPES.View) view: View) {
    this.#view = view;
  }

  handle(outputData: UserRegisterOutputData) {
    const message =
      outputData.err === undefined
        ? `User “${outputData.name}” has been registered with ID ${outputData.id} successfully!`
        : outputData.err.message;
    const viewModel: ViewModel = {
      message,
      isErr: outputData.err !== undefined,
    };
    this.#view.print(viewModel);
  }
}
