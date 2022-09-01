import ConsoleView from './console-view';
import { ViewModel } from '../../adapters/view-model';

describe('#print', () => {
  const view = new ConsoleView();

  test("hasn't thrown an error without error viewModel", () => {
    const viewModel: ViewModel = { message: 'Hello, world!', isErr: false };
    expect(() => view.print(viewModel)).not.toThrow();
  });

  test("hasn't thrown an error with error viewModel", () => {
    const viewModel: ViewModel = { message: 'Error!', isErr: true };
    expect(() => view.print(viewModel)).not.toThrow();
  });
});
