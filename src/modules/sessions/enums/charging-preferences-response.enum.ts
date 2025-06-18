/**
 * An enum with possible responses to a PUT Charging Preferences request.
 *
 * If a PUT with ChargingPreferences is received for an EVSE that does not have the capability CHARGING_PREFERENCES_CAPABLE,
 * the receiver should respond with an HTTP status of 404 and an OCPI status code of 2001 in the OCPI response object.
 */
export enum ChargingPreferencesResponse {
  /**
   * Charging Preferences accepted, EVSE will try to accomplish them, although this is no guarantee that they will be fulfilled.
   */
  ACCEPTED = 'ACCEPTED',

  /**
   * CPO requires departure_time to be able to perform Charging Preference based Smart Charging.
   */
  DEPARTURE_REQUIRED = 'DEPARTURE_REQUIRED',

  /**
   * CPO requires energy_need to be able to perform Charging Preference based Smart Charging.
   */
  ENERGY_NEED_REQUIRED = 'ENERGY_NEED_REQUIRED',

  /**
   * Charging Preferences contain a demand that the EVSE knows it cannot fulfill.
   */
  NOT_POSSIBLE = 'NOT_POSSIBLE',

  /**
   * profile_type contains a value that is not supported by the EVSE.
   */
  PROFILE_TYPE_NOT_SUPPORTED = 'PROFILE_TYPE_NOT_SUPPORTED',
}
