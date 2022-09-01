const TYPES = {
  // Common
  PackageData: Symbol.for('PackageData'),
  Sqlite3Database: Symbol.for('Sqlite3Database'),
  View: Symbol.for('View'),

  // User
  UserRepository: Symbol.for('UserRepository'),

  // Register
  UserRegisterInputPort: Symbol.for('UserRegisterInputPort'),
  UserRegisterOutputPort: Symbol.for('UserRegisterOutputPort'),
};

export default TYPES;
