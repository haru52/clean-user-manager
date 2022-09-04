const TYPES = {
  // General
  PackageData: Symbol.for('PackageData'),
  SqliteDbConnector: Symbol.for('SqliteDbConnector'),
  View: Symbol.for('View'),

  // User
  UserRepository: Symbol.for('UserRepository'),

  // Register
  UserRegisterInputPort: Symbol.for('UserRegisterInputPort'),
  UserRegisterOutputPort: Symbol.for('UserRegisterOutputPort'),
};

export default TYPES;
