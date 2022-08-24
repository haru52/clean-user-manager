import ConsoleView from '../../../views/console-view';
import { ConsoleViewModel } from '../../view-models/console-view-model';
import { UserAddOutputBoundary } from '../../../use-cases/user/add/user-add-output-boundary';
import { UserAddOutputData } from '../../../use-cases/user/add/user-add-output-data';

export default class ConsoleUserAddPresenter implements UserAddOutputBoundary {
  present(outputData: UserAddOutputData) {
    const viewModel: ConsoleViewModel = {
      message: `User “${outputData.name}” has been created with ID ${outputData.id} successfully!`,
    };
    ConsoleView.print(viewModel);
  }
}
