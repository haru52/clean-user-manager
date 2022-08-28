import { View } from '../../adapters/view';
import { ViewModel } from '../../adapters/view-model';

export default class ConsoleView implements View {
  // eslint-disable-next-line class-methods-use-this
  print(viewModel: ViewModel) {
    console.log(viewModel.message); // eslint-disable-line no-console
  }
}
