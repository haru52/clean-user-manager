import { ViewModel } from './view-model';

export interface View {
  print(viewModel: ViewModel): void;
}
