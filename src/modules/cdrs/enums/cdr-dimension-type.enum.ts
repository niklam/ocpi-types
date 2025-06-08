/**
 * This enumeration contains allowed values for CdrDimensions, which are used to define dimensions of ChargingPeriods in both CDRs and Sessions.
 * Some of these values are not useful for CDRs, and SHALL therefor only be used in Sessions.
 *
 * Note: OCPI makes it possible to provide SoC in the Session object. This information can be useful to show the current State of Charge to an EV driver during charging.
 * Implementers should be aware that SoC is only available at some DC Chargers. Which is currently a small amount of the total amount of Charge Points.
 * Of these DC Chargers, only a small percentage currently provides SoC via OCPP to the CPO. Then there is also the question if SoC is allowed to be provided to third-parties
 * as it can be seen as privacy-sensitive information.
 */
export enum CdrDimensionType {
  /**
   * Average charging current during this ChargingPeriod: defined in A (Ampere). When negative, the current is flowing from the EV to the grid.
   * Session Only: Yes
   */
  CURRENT = 'CURRENT',

  /**
   * Total amount of energy (dis-)charged during this ChargingPeriod: defined in kWh. When negative, more energy was feed into the grid then charged into the EV. Default step_size is 1.
   * Session Only: No
   */
  ENERGY = 'ENERGY',

  /**
   * Total amount of energy feed back into the grid: defined in kWh.
   * Session Only: Yes
   */
  ENERGY_EXPORT = 'ENERGY_EXPORT',

  /**
   * Total amount of energy charged, defined in kWh.
   * Session Only: Yes
   */
  ENERGY_IMPORT = 'ENERGY_IMPORT',

  /**
   * Sum of the maximum current over all phases, reached during this ChargingPeriod: defined in A (Ampere).
   * Session Only: No
   */
  MAX_CURRENT = 'MAX_CURRENT',

  /**
   * Sum of the minimum current over all phases, reached during this ChargingPeriod, when negative, current has flowed from the EV to the grid. Defined in A (Ampere).
   * Session Only: No
   */
  MIN_CURRENT = 'MIN_CURRENT',

  /**
   * Maximum power reached during this ChargingPeriod: defined in kW (Kilowatt).
   * Session Only: No
   */
  MAX_POWER = 'MAX_POWER',

  /**
   * Minimum power reached during this ChargingPeriod: defined in kW (Kilowatt), when negative, the power has flowed from the EV to the grid.
   * Session Only: No
   */
  MIN_POWER = 'MIN_POWER',

  /**
   * Time during this ChargingPeriod not charging: defined in hours, default step_size multiplier is 1 second.
   * Session Only: No
   */
  PARKING_TIME = 'PARKING_TIME',

  /**
   * Average power during this ChargingPeriod: defined in kW (Kilowatt). When negative, the power is flowing from the EV to the grid.
   * Session Only: Yes
   */
  POWER = 'POWER',

  /**
   * Time during this ChargingPeriod Charge Point has been reserved and not yet been in use for this customer: defined in hours, default step_size multiplier is 1 second.
   * Session Only: No
   */
  RESERVATION_TIME = 'RESERVATION_TIME',

  /**
   * Current state of charge of the EV, in percentage, values allowed: 0 to 100.
   * Session Only: Yes
   */
  STATE_OF_CHARGE = 'STATE_OF_CHARGE',

  /**
   * Time charging during this ChargingPeriod: defined in hours, default step_size multiplier is 1 second.
   * Session Only: No
   */
  TIME = 'TIME'
}