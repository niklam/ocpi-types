/**
 * The format of the connector, whether it is a socket or a plug.
 */
export enum ConnectorFormat {
  /**
   * The connector is a socket; the EV user needs to bring a fitting plug.
   */
  SOCKET = 'SOCKET',

  /**
   * The connector is an attached cable; the EV users car needs to have a fitting inlet.
   */
  CABLE = 'CABLE',
}
