/**
 * This value, if provided, represents the restriction to the parking spot for different purposes.
 */
export enum ParkingRestriction {
  /**
   * Reserved parking spot for electric vehicles.
   */
  EV_ONLY = 'EV_ONLY',

  /**
   * Parking is only allowed while plugged in (charging).
   */
  PLUGGED = 'PLUGGED',

  /**
   * Reserved parking spot for disabled people with valid ID.
   */
  DISABLED = 'DISABLED',

  /**
   * Parking spot for customers/guests only, for example in case of a hotel or shop.
   */
  CUSTOMERS = 'CUSTOMERS',

  /**
   * Parking spot only suitable for (electric) motorcycles or scooters.
   */
  MOTORCYCLES = 'MOTORCYCLES',
}
