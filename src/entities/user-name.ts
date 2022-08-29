export default class UserName {
  readonly value;

  static readonly #minNameLength = 1;

  static readonly #maxNameLength = 128;

  /**
   * Initialize a UserName instance.
   *
   * @param value - Name value. This must be 1 to 128 characters
   *
   * @throws {@link TypeError}
   * This exception is thrown if the input isn't valid.
   */
  constructor(value: string) {
    UserName.validate(value);

    this.value = value;
  }

  /**
   * Validate a value of UserName.
   *
   * @param value - Name value. This must be 1 to 128 characters
   *
   * @throws {@link TypeError}
   * This exception is thrown if the input isn't valid.
   */
  static validate(value: string) {
    if (
      value.length < UserName.#minNameLength ||
      value.length > UserName.#maxNameLength
    ) {
      throw new TypeError('User name must be 1 to 128 characters');
    }
  }
}
