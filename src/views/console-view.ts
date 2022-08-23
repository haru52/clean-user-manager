import { ConsoleViewModel } from '../interface-adapters/view-models/console-view-model';

export default class ConsoleView {
  static print(viewModel: ConsoleViewModel) {
    console.log(viewModel.message);
  }
}
