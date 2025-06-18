/**
 * Reflects the general type of the charge point's location.
 * May be used for user information.
 */
export enum ParkingType {
  /**
   * Location on a parking facility/rest area along a motorway, freeway, interstate, highway etc.
   */
  ALONG_MOTORWAY = 'ALONG_MOTORWAY',

  /**
   * Multistorey car park.
   */
  PARKING_GARAGE = 'PARKING_GARAGE',

  /**
   * A cleared area that is intended for parking vehicles, i.e. at super markets, bars, etc.
   */
  PARKING_LOT = 'PARKING_LOT',

  /**
   * Location is on the driveway of a house/building.
   */
  ON_DRIVEWAY = 'ON_DRIVEWAY',

  /**
   * Parking in public space along a street.
   */
  ON_STREET = 'ON_STREET',

  /**
   * Multistorey car park, mainly underground.
   */
  UNDERGROUND_GARAGE = 'UNDERGROUND_GARAGE',
}
