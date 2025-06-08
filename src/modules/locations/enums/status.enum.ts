/**
 * The status of an EVSE.
 */
export enum Status {
  /**
   * The EVSE/Connector is able to start a new charging session.
   */
  AVAILABLE = 'AVAILABLE',

  /**
   * The EVSE/Connector is not accessible because of a physical barrier, i.e. a car.
   */
  BLOCKED = 'BLOCKED',

  /**
   * The EVSE/Connector is in use.
   */
  CHARGING = 'CHARGING',

  /**
   * The EVSE/Connector is not yet active, or temporarily not available for use, but not broken or defect.
   */
  INOPERATIVE = 'INOPERATIVE',

  /**
   * The EVSE/Connector is currently out of order, some part/components may be broken/defect.
   */
  OUTOFORDER = 'OUTOFORDER',

  /**
   * The EVSE/Connector is planned, will be operating soon.
   */
  PLANNED = 'PLANNED',

  /**
   * The EVSE/Connector was discontinued/removed.
   */
  REMOVED = 'REMOVED',

  /**
   * The EVSE/Connector is reserved for a particular EV driver and is unavailable for other drivers.
   */
  RESERVED = 'RESERVED',

  /**
   * No status information available (also used when offline).
   */
  UNKNOWN = 'UNKNOWN'
}