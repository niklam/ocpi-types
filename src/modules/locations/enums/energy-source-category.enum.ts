/**
 * Categories of energy sources.
 */
export enum EnergySourceCategory {
  /**
   * Nuclear power sources.
   */
  NUCLEAR = 'NUCLEAR',

  /**
   * All kinds of fossil power sources.
   */
  GENERAL_FOSSIL = 'GENERAL_FOSSIL',

  /**
   * Fossil power from coal.
   */
  COAL = 'COAL',

  /**
   * Fossil power from gas.
   */
  GAS = 'GAS',

  /**
   * All kinds of regenerative power sources.
   */
  GENERAL_GREEN = 'GENERAL_GREEN',

  /**
   * Regenerative power from PV.
   */
  SOLAR = 'SOLAR',

  /**
   * Regenerative power from wind turbines.
   */
  WIND = 'WIND',

  /**
   * Regenerative power from water turbines.
   */
  WATER = 'WATER'
}