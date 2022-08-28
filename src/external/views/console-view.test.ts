import ConsoleView from './console-view';
import { ConsoleViewModel } from '../../interface-adapters/view-models/console-view-model';

describe('#print', () => {
  test("shouldn't throw errors", () => {
    const viewModel: ConsoleViewModel = { message: 'Hello, world!' };
    expect(() => ConsoleView.print(viewModel)).not.toThrow();
  });
});
