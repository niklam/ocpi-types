/**
 * The Module identifiers for each endpoint are described in the beginning of each Module chapter.
 * The following table contains the list of modules in this version of OCPI. Most modules (except Credentials & Registration) are optional,
 * but there might be dependencies between modules. If there are dependencies between modules, it will be mentioned in the affected module description.
 *
 * Custom Modules:
 * Parties are allowed to create custom modules or customized versions of the existing modules. To do so, the ModuleID enum can be extended with additional custom moduleIDs.
 * These custom moduleIDs MAY only be sent to parties with which there is an agreement to use a custom module. Do NOT send custom moduleIDs to parties you are not 100% sure will understand the custom moduleIDs.
 * It is advised to use a prefix (e.g. country-code + party-id) for any custom moduleID, this ensures that the moduleID will not be used for any future module of OCPI.
 * For example: nltnm-tokens
 */
export enum ModuleID {
  /**
   * CDRs
   */
  cdrs = 'cdrs',

  /**
   * Charging Profiles
   */
  chargingprofiles = 'chargingprofiles',

  /**
   * Commands
   */
  commands = 'commands',

  /**
   * Credentials & Registration - Required for all implementations. The role field has no function for this module.
   */
  credentials = 'credentials',

  /**
   * Hub Client Info
   */
  hubclientinfo = 'hubclientinfo',

  /**
   * Locations
   */
  locations = 'locations',

  /**
   * Sessions
   */
  sessions = 'sessions',

  /**
   * Tariffs
   */
  tariffs = 'tariffs',

  /**
   * Tokens
   */
  tokens = 'tokens',
}
