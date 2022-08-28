import ConsoleUserCreatePresenter from './console-user-create-presenter';
import { UserCreateOutputData } from '../../../use-cases/user/create/user-create-output-data';

describe('#present', () => {
  test("shouldn't throw errors", () => {
    const presenter = new ConsoleUserCreatePresenter();
    const outputData: UserCreateOutputData = {
      id: 2,
      name: 'John Doe',
    };
    expect(() => presenter.present(outputData)).not.toThrow();
  });
});
