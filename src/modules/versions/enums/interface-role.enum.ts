/**
 * InterfaceRole enum
 */
export enum InterfaceRole {
  /**
   * Sender Interface implementation. Interface implemented by the owner of data, so the Receiver can Pull information from the data Sender/owner.
   */
  SENDER = 'SENDER',

  /**
   * Receiver Interface implementation. Interface implemented by the receiver of data, so the Sender/owner can Push information to the Receiver.
   */
  RECEIVER = 'RECEIVER',
}
