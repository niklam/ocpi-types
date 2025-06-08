/**
 * Response to the command request from the eMSP to the CPO.
 */
export enum CommandResponseType {
  /**
   * The requested command is not supported by this CPO, Charge Point, EVSE etc.
   */
  NOT_SUPPORTED = 'NOT_SUPPORTED',

  /**
   * Command request rejected by the CPO. (Session might not be from a customer of the eMSP that send this request)
   */
  REJECTED = 'REJECTED',

  /**
   * Command request accepted by the CPO.
   */
  ACCEPTED = 'ACCEPTED',

  /**
   * The Session in the requested command is not known by this CPO.
   */
  UNKNOWN_SESSION = 'UNKNOWN_SESSION'
}