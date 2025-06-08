/**
 * The command requested.
 */
export enum CommandType {
  /**
   * Request the Charge Point to cancel a specific reservation.
   */
  CANCEL_RESERVATION = 'CANCEL_RESERVATION',

  /**
   * Request the Charge Point to reserve a (specific) EVSE for a Token for a certain time, starting now.
   */
  RESERVE_NOW = 'RESERVE_NOW',

  /**
   * Request the Charge Point to start a transaction on the given EVSE/Connector.
   */
  START_SESSION = 'START_SESSION',

  /**
   * Request the Charge Point to stop an ongoing session.
   */
  STOP_SESSION = 'STOP_SESSION',

  /**
   * Request the Charge Point to unlock the connector (if applicable). This functionality is for help desk operators only!
   */
  UNLOCK_CONNECTOR = 'UNLOCK_CONNECTOR'
}