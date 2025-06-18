import { OcpiStatusCode } from '../enums/status-codes.enum';
import { OcpiErrorResponse, OcpiResponse } from '../dtos/ocpi-response.dto';

export class OcpiResponseBuilder {
  /**
   * Create a successful response with data
   */
  static success<T>(data: T, message?: string): OcpiResponse<T> {
    const response = new OcpiResponse<T>();
    response.data = data;
    response.statusCode = OcpiStatusCode.SUCCESS_GENERIC;
    response.statusMessage = message;
    response.timestamp = new Date().toISOString();
    return response;
  }

  /**
   * Create a successful response with no data
   */
  static successEmpty(message?: string): OcpiErrorResponse {
    const response = new OcpiErrorResponse();
    response.statusCode = OcpiStatusCode.SUCCESS_GENERIC;
    response.statusMessage = message;
    response.timestamp = new Date().toISOString();
    return response;
  }

  /**
   * Create an error response
   */
  static error(statusCode: number, message?: string): OcpiErrorResponse {
    const response = new OcpiErrorResponse();
    response.statusCode = statusCode;
    response.statusMessage = message;
    response.timestamp = new Date().toISOString();
    return response;
  }
}
