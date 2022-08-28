import ConsoleView from './console-view';
import { ViewModel } from '../../adapters/view-model';

describe('#print', () => {
  test("shouldn't throw errors", () => {
    const view = new ConsoleView();
    const viewModel: ViewModel = { message: 'Hello, world!' };
    expect(() => view.print(viewModel)).not.toThrow();
  });
});
