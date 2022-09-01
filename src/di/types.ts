const TYPES = {
  // Common
  PackageData: Symbol.for('PackageData'),
  UseInMemory: Symbol.for('UseInMemory'),
  View: Symbol.for('View'),

  // User
  UserRepository: Symbol.for('UserRepository'),

  // Register
  UserRegisterInputPort: Symbol.for('UserRegisterInputPort'),
  UserRegisterOutputPort: Symbol.for('UserRegisterOutputPort'),
};

export default TYPES;
