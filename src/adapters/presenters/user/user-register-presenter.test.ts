import ConsoleView from '../../../external/views/console-view';
import { UserRegisterOutputData } from '../../../use-cases/user/register/user-register-output-data';
import UserRegisterPresenter from './user-register-presenter';
import { View } from '../../view';
import { ViewModel } from '../../view-model';

describe('#handle', () => {
  const view: View = new ConsoleView();
  const presenter = new UserRegisterPresenter(view);
  const id = 1;
  const name = 'John Doe';
  const outputData: UserRegisterOutputData = { id, name };

  test("hasn't thrown an error", () => {
    expect(() => presenter.handle(outputData)).not.toThrow();
  });

  const printSpy = jest.spyOn(view, 'print');

  test('view.print() has been called once', () => {
    expect(printSpy).toHaveBeenCalledTimes(1);
  });

  test('view.print() has been called with the viewModel', () => {
    const viewModel: ViewModel = {
      message: `User “${name}” has been registered with ID ${id} successfully!`,
    };
    expect(printSpy).toHaveBeenCalledWith(viewModel);
  });
});
