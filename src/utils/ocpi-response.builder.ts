import { OcpiStatusCode } from '../enums/status-codes.enum';
import { OcpiErrorResponse, OcpiResponse } from '../dtos/ocpi-response.dto';

export class OcpiResponseBuilder {
  /**
   * Create a successful response with data
   */
  static success<T>(data: T, message?: string): OcpiResponse<T> {
    return {
      data,
      status_code: OcpiStatusCode.SUCCESS_GENERIC,
      status_message: message,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create a successful response with no data
   */
  static successEmpty(message?: string): OcpiErrorResponse {
    return {
      status_code: OcpiStatusCode.SUCCESS_GENERIC,
      status_message: message,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create an error response
   */
  static error(statusCode: number, message?: string): OcpiErrorResponse {
    return {
      status_code: statusCode,
      status_message: message,
      timestamp: new Date().toISOString(),
    };
  }
}
