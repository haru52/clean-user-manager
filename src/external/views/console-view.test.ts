import ConsoleView from './console-view';
import { ViewModel } from '../../adapters/view-model';

describe('#print', () => {
  const view = new ConsoleView();

  test('console.log() has been called with "Hello, world!"', () => {
    const logSpy = jest.spyOn(console, 'log');
    const message = 'Hello, world!';
    const viewModel: ViewModel = { message, isErr: false };
    view.print(viewModel);
    expect(logSpy).toHaveBeenCalledWith(message);
  });

  test('console.error() has been called with "Error!"', () => {
    const errorSpy = jest.spyOn(console, 'error');
    const message = 'Error!';
    const viewModel: ViewModel = { message, isErr: true };
    view.print(viewModel);
    expect(errorSpy).toHaveBeenCalledWith(message);
  });
});
