/**
 * Result of a ChargingProfile request that the EVSE sends via the CPO to the eMSP.
 */
export enum ChargingProfileResultType {
  /**
   * ChargingProfile request accepted by the EVSE.
   */
  ACCEPTED = 'ACCEPTED',

  /**
   * ChargingProfile request rejected by the EVSE.
   */
  REJECTED = 'REJECTED',

  /**
   * No Charging Profile(s) were found by the EVSE matching the request.
   */
  UNKNOWN = 'UNKNOWN',
}
