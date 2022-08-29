import { UserRegisterOutputBoundary } from '../../../use-cases/user/register/user-register-output-boundary';
import { UserRegisterOutputData } from '../../../use-cases/user/register/user-register-output-data';
import { View } from '../../view';
import { ViewModel } from '../../view-model';

export default class UserRegisterPresenter
  implements UserRegisterOutputBoundary
{
  readonly #view;

  constructor(view: View) {
    this.#view = view;
  }

  handle(outputData: UserRegisterOutputData) {
    const message =
      outputData.err === undefined
        ? `User “${outputData.name}” has been created with ID ${outputData.id} successfully!`
        : outputData.err.message;
    const viewModel: ViewModel = { message };
    this.#view.print(viewModel);
  }
}
