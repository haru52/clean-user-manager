import { inject, injectable } from 'tsyringe';
import TYPES from '../../../di/types';
import { UserShowOutputData } from '../../../usecases/user/show/user-show-output-data';
import { UserShowOutputPort } from '../../../usecases/user/show/user-show-output-port';
import { View } from '../../view';
import { ViewModel } from '../../view-model';

@injectable()
export default class UserShowPresenter implements UserShowOutputPort {
  readonly #view;

  constructor(@inject(TYPES.View) view: View) {
    this.#view = view;
  }

  handle(outputData: UserShowOutputData) {
    const message =
      outputData.err === undefined
        ? `#${outputData.id}: ${outputData.name}`
        : outputData.err.message;
    const viewModel: ViewModel = {
      message,
      isErr: outputData.err !== undefined,
    };
    this.#view.print(viewModel);
  }
}
