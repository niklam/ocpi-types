/**
 * Enum for reservation restriction types in tariff elements.
 *
 * Note: When a Tariff has both RESERVATION and RESERVATION_EXPIRES Tariff Elements,
 * where both Tariff Elements have a TIME Price Component, then the time based cost
 * of an expired reservation will be calculated based on the RESERVATION_EXPIRES Tariff Element.
 */
export enum ReservationRestrictionType {
  /**
   * Used in Tariff Elements to describe costs for a reservation.
   */
  RESERVATION = 'RESERVATION',

  /**
   * Used in Tariff Elements to describe costs for a reservation that expires
   * (i.e. driver does not start a charging session before expiry_date of the reservation).
   */
  RESERVATION_EXPIRES = 'RESERVATION_EXPIRES'
}