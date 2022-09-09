import '../../../di/inject-test-dependencies';
import { container } from 'tsyringe';
import RegistrationError from '../../../errors/registration-error';
import TYPES from '../../../di/types';
import { UserRegisterOutputData } from '../../../usecases/user/register/user-register-output-data';
import UserRegisterPresenter from './user-register-presenter';
import { View } from '../view';
import { ViewModel } from '../view-model';

const view = container.resolve<View>(TYPES.View);
const presenter = new UserRegisterPresenter(view);
const printSpy = jest.spyOn(view, 'print');

describe('#handle with a normal outputData', () => {
  const id = 1;
  const name = 'John Doe';

  test("hasn't thrown an error", () => {
    const outputData: UserRegisterOutputData = { id, name };
    expect(() => presenter.handle(outputData)).not.toThrow();
  });

  test('view#print has been called once', () => {
    expect(printSpy).toHaveBeenCalledTimes(1);
  });

  test('view#print has been called with the normal viewModel', () => {
    const viewModel: ViewModel = {
      message: `User “${name}” has been registered with ID ${id} successfully!`,
      isErr: false,
    };
    expect(printSpy).toHaveBeenCalledWith(viewModel);
  });
});

describe('#handle with an errored outputData', () => {
  test("hasn't thrown an error", () => {
    const outputData: UserRegisterOutputData = {
      err: new RegistrationError(),
    };
    expect(() => presenter.handle(outputData)).not.toThrow();
  });

  test('view#print has been called with the errored viewModel', () => {
    const partialViewModel: Pick<ViewModel, 'isErr'> = { isErr: true };
    expect(printSpy).toHaveBeenLastCalledWith(
      expect.objectContaining(partialViewModel)
    );
  });
});
