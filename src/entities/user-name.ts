export default class UserName {
  readonly value;

  static readonly #minNameLength = 1;

  static readonly #maxNameLength = 128;

  /**
   * Initialize a UserName instance.
   *
   * @param value - The name value. This must be 1 to 128 characters
   * @returns The UserName instance
   *
   * @throws {@link TypeError}
   * This exception is thrown if the input is invalid.
   */
  constructor(value: string) {
    if (!UserName.#validate(value))
      throw new TypeError('User name must be 1 to 128 characters');

    this.value = value;
  }

  static #validate(value: string) {
    return (
      value.length >= UserName.#minNameLength &&
      value.length <= UserName.#maxNameLength
    );
  }
}
