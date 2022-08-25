import ConsoleView from '../../../views/console-view';
import { ConsoleViewModel } from '../../view-models/console-view-model';
import { UserCreateOutputBoundary } from '../../../use-cases/user/create/user-create-output-boundary';
import { UserCreateOutputData } from '../../../use-cases/user/create/user-create-output-data';

export default class ConsoleUserCreatePresenter implements UserCreateOutputBoundary {
  present(outputData: UserCreateOutputData) { // eslint-disable-line class-methods-use-this
    const viewModel: ConsoleViewModel = {
      message: `User “${outputData.name}” has been created with ID ${outputData.id} successfully!`,
    };
    ConsoleView.print(viewModel);
  }
}
