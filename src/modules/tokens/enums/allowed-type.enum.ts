/**
 * Defines whether a token is allowed to charge at a location.
 */
export enum AllowedType {
  /**
   * This Token is allowed to charge (at this location).
   */
  ALLOWED = 'ALLOWED',

  /**
   * This Token is blocked.
   */
  BLOCKED = 'BLOCKED',

  /**
   * This Token has expired.
   */
  EXPIRED = 'EXPIRED',

  /**
   * This Token belongs to an account that has not enough credits to charge (at the given location).
   */
  NO_CREDIT = 'NO_CREDIT',

  /**
   * Token is valid, but is not allowed to charge at the given location.
   */
  NOT_ALLOWED = 'NOT_ALLOWED'
}