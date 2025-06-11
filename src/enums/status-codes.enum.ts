/**
 * OCPI (Open Charge Point Interface) Status Codes
 * Based on official OCPI specification from https://github.com/ocpi/ocpi
 *
 * @see https://github.com/ocpi/ocpi/blob/master/status_codes.asciidoc
 */
export enum OcpiStatusCode {
  // 1xxx: Success codes
  SUCCESS_GENERIC = 1000,

  // 2xxx: Client errors
  CLIENT_ERROR_GENERIC = 2000,
  CLIENT_ERROR_INVALID_OR_MISSING_PARAMETERS = 2001,
  CLIENT_ERROR_NOT_ENOUGH_INFORMATION = 2002,
  CLIENT_ERROR_UNKNOWN_LOCATION = 2003,
  CLIENT_ERROR_UNKNOWN_TOKEN = 2004,

  // 3xxx: Server errors
  SERVER_ERROR_GENERIC = 3000,
  SERVER_ERROR_UNABLE_TO_USE_CLIENT_API = 3001,
  SERVER_ERROR_UNSUPPORTED_VERSION = 3002,
  SERVER_ERROR_NO_MATCHING_ENDPOINTS = 3003,

  // 4xxx: Hub errors
  HUB_ERROR_GENERIC = 4000,
  HUB_ERROR_UNKNOWN_RECEIVER = 4001,
  HUB_ERROR_REQUEST_TIMEOUT = 4002,
  HUB_ERROR_CONNECTION_PROBLEM = 4003,
}
