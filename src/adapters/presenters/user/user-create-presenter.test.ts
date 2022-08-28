import ConsoleView from '../../../external/views/console-view';
import UserCreatePresenter from './user-create-presenter';
import { UserCreateOutputData } from '../../../use-cases/user/create/user-create-output-data';
import { ViewModel } from '../../view-model';

describe('#present', () => {
  const view = new ConsoleView();
  const presenter = new UserCreatePresenter(view);
  const id = 2;
  const name = 'John Doe';
  const outputData: UserCreateOutputData = { id, name };

  test("shouldn't throw errors", () => {
    expect(() => presenter.present(outputData)).not.toThrow();
  });

  const printSpy = jest.spyOn(view, 'print');

  test('view.print has been called once', () => {
    expect(printSpy).toHaveBeenCalledTimes(1);
  });

  test('view.print has been called with the viewModel', () => {
    const viewModel: ViewModel = {
      message: `User “${name}” has been created with ID ${id} successfully!`,
    };
    expect(printSpy).toHaveBeenCalledWith(viewModel);
  });
});
