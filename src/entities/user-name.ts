export default class UserName {
  readonly value;

  static readonly #minNameLength = 1;

  static readonly #maxNameLength = 128;

  /**
   * Initialize a UserName instance.
   *
   * @param value - Name value. This must be 1 to 128 characters
   *
   * @throws {@link RangeError}
   */
  constructor(value: string) {
    if (!UserName.#validate(value))
      throw new RangeError('value length must be between 1 and 128');

    this.value = value;
  }

  static #validate(value: string) {
    return (
      value.length >= UserName.#minNameLength &&
      value.length <= UserName.#maxNameLength
    );
  }
}
