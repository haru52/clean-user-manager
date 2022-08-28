import { ViewModel } from '../../view-model';
import { UserCreateOutputBoundary } from '../../../use-cases/user/create/user-create-output-boundary';
import { UserCreateOutputData } from '../../../use-cases/user/create/user-create-output-data';
import { View } from '../../view';

export default class UserCreatePresenter implements UserCreateOutputBoundary {
  #view: View;

  constructor(view: View) {
    this.#view = view;
  }

  // eslint-disable-next-line class-methods-use-this
  present(outputData: UserCreateOutputData) {
    const viewModel: ViewModel = {
      message: `User “${outputData.name}” has been created with ID ${outputData.id} successfully!`,
    };
    this.#view.print(viewModel);
  }
}
