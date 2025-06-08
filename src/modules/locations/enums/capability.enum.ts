/**
 * The capabilities of an EVSE.
 *
 * When a Charge Point supports ad-hoc payments with a payment terminal, please use a combination of the following values
 * to explain the possibilities of the terminal: CHIP_CARD_SUPPORT, CONTACTLESS_CARD_SUPPORT, CREDIT_CARD_PAYABLE, DEBIT_CARD_PAYABLE, PED_TERMINAL.
 *
 * There are Charge Points in the field that do not yet support OCPP 2.x. If these Charge Points have multiple connectors per EVSE,
 * the CPO needs to know which connector to start when receiving a StartSession for the given EVSE. If this is the case,
 * the CPO should set the START_SESSION_CONNECTOR_REQUIRED capability on the given EVSE.
 */
export enum Capability {
  /**
   * The EVSE supports charging profiles.
   */
  CHARGING_PROFILE_CAPABLE = 'CHARGING_PROFILE_CAPABLE',

  /**
   * The EVSE supports charging preferences.
   */
  CHARGING_PREFERENCES_CAPABLE = 'CHARGING_PREFERENCES_CAPABLE',

  /**
   * EVSE has a payment terminal that supports chip cards.
   */
  CHIP_CARD_SUPPORT = 'CHIP_CARD_SUPPORT',

  /**
   * EVSE has a payment terminal that supports contactless cards.
   */
  CONTACTLESS_CARD_SUPPORT = 'CONTACTLESS_CARD_SUPPORT',

  /**
   * EVSE has a payment terminal that makes it possible to pay for charging using a credit card.
   */
  CREDIT_CARD_PAYABLE = 'CREDIT_CARD_PAYABLE',

  /**
   * EVSE has a payment terminal that makes it possible to pay for charging using a debit card.
   */
  DEBIT_CARD_PAYABLE = 'DEBIT_CARD_PAYABLE',

  /**
   * EVSE has a payment terminal with a pin-code entry device.
   */
  PED_TERMINAL = 'PED_TERMINAL',

  /**
   * The EVSE can remotely be started/stopped.
   */
  REMOTE_START_STOP_CAPABLE = 'REMOTE_START_STOP_CAPABLE',

  /**
   * The EVSE can be reserved.
   */
  RESERVABLE = 'RESERVABLE',

  /**
   * Charging at this EVSE can be authorized with an RFID token.
   */
  RFID_READER = 'RFID_READER',

  /**
   * When a StartSession is sent to this EVSE, the MSP is required to add the optional `connector_id` field in the StartSession object.
   */
  START_SESSION_CONNECTOR_REQUIRED = 'START_SESSION_CONNECTOR_REQUIRED',

  /**
   * This EVSE supports token groups, two or more tokens work as one, so that a session can be started with one token and stopped with another (handy when a card and key-fob are given to the EV-driver).
   */
  TOKEN_GROUP_CAPABLE = 'TOKEN_GROUP_CAPABLE',

  /**
   * Connectors have mechanical lock that can be requested by the eMSP to be unlocked.
   */
  UNLOCK_CAPABLE = 'UNLOCK_CAPABLE'
}