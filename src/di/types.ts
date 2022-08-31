const TYPES = {
  // Common
  PackageData: Symbol.for('PackageData'),
  View: Symbol.for('View'),

  // User
  UserRepository: Symbol.for('UserRepository'),

  // Register
  UserRegisterInputPort: Symbol.for('UserRegisterInputPort'),
  UserRegisterOutputPort: Symbol.for('UserRegisterOutputPort'),
};

export default TYPES;
