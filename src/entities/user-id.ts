export default class UserId {
  readonly value;

  /**
   * Initialize a UserId instance.
   *
   * @param value - ID value. This must be a natural number
   *
   * @throws {@link RangeError}
   */
  constructor(value: number) {
    if (!UserId.#validate(value))
      throw new RangeError('value must be a natural number');

    this.value = value;
  }

  static #validate(value: number) {
    if (!Number.isInteger(value)) return false;

    return value >= 1;
  }
}
