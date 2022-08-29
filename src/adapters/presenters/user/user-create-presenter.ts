import { UserCreateOutputBoundary } from '../../../use-cases/user/create/user-create-output-boundary';
import { UserCreateOutputData } from '../../../use-cases/user/create/user-create-output-data';
import { View } from '../../view';
import { ViewModel } from '../../view-model';

export default class UserCreatePresenter implements UserCreateOutputBoundary {
  readonly #view;

  constructor(view: View) {
    this.#view = view;
  }

  handle(outputData: UserCreateOutputData) {
    const message =
      outputData.err === undefined
        ? `User “${outputData.name}” has been created with ID ${outputData.id} successfully!`
        : outputData.err.message;
    const viewModel: ViewModel = { message };
    this.#view.print(viewModel);
  }
}
