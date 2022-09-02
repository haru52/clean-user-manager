import '../../../di/inject-dependencies-for-test';
import { container } from 'tsyringe';
import RegistrationError from '../../../use-cases/registration-error';
import TYPES from '../../../di/types';
import { UserRegisterOutputData } from '../../../use-cases/user/register/user-register-output-data';
import UserRegisterPresenter from './user-register-presenter';
import { View } from '../../view';
import { ViewModel } from '../../view-model';

describe('#handle', () => {
  const view = container.resolve<View>(TYPES.View);
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
      isErr: false,
    };
    expect(printSpy).toHaveBeenCalledWith(viewModel);
  });

  test("hasn't thrown an error with an errored outputData", () => {
    const erroredOutputData: UserRegisterOutputData = {
      err: new RegistrationError(),
    };
    expect(() => presenter.handle(erroredOutputData)).not.toThrow();
  });

  test('view.print() has been called with the errored viewModel', () => {
    const partialViewModel: Pick<ViewModel, 'isErr'> = { isErr: true };
    expect(printSpy).toHaveBeenLastCalledWith(
      expect.objectContaining(partialViewModel)
    );
  });
});
