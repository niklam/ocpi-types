/**
 * ConnectionStatus enum
 */
export enum ConnectionStatus {
  /**
   * Party is connected.
   */
  CONNECTED = 'CONNECTED',

  /**
   * Party is currently not connected.
   */
  OFFLINE = 'OFFLINE',

  /**
   * Connection to this party is planned, but has never been connected.
   */
  PLANNED = 'PLANNED',

  /**
   * Party is now longer active, will never connect anymore.
   */
  SUSPENDED = 'SUSPENDED'
}