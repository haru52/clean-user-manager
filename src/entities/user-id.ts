export default class UserId {
  readonly value;

  /**
   * Initialize a UserId instance.
   *
   * @param value - The ID value. This must be a natural number
   * @returns The UserId instance
   *
   * @throws {@link TypeError}
   * This exception is thrown if the input is invalid.
   */
  constructor(value: number) {
    if (!UserId.#validate(value))
      throw new TypeError('User ID must be a natural number');

    this.value = value;
  }

  static #validate(value: number) {
    if (!Number.isInteger(value)) return false;

    return value >= 1;
  }
}
