import { Expose } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

/**
 * OCPI Response DTO
 *
 * The standard response format for all OCPI API endpoints.
 * The data field contains the actual response data and can be:
 * - A single object (for endpoints returning one item)
 * - An array of objects (for endpoints returning multiple items)
 * - A string (for simple responses)
 * - undefined (for error responses or operations with no return data)
 */
export class OcpiResponse<T = any> {
  /**
   * Contains the actual response data object or list of objects from each request.
   * - Array when cardinality is * or +
   * - Single object when cardinality is 1 or ?
   * - May be omitted for error responses or operations with no return data
   */
  @IsOptional()
  @Expose()
  data?: T;

  /**
   * OCPI status code (4 digits) indicating how the request was handled.
   * Different from HTTP status codes to avoid confusion.
   *
   * @see OcpiStatusCodes
   */
  @IsNumber()
  @Expose({ name: 'status_code' })
  statusCode: number;

  /**
   * Optional status message which may help when debugging.
   */
  @IsOptional()
  @IsString()
  @Expose({ name: 'status_message' })
  statusMessage?: string;

  /**
   * The time this message was generated (ISO 8601 format).
   */
  @IsString()
  @Expose()
  timestamp: string;
}

/**
 * Response for endpoints that return a single object
 */
export type OcpiSingleResponse<T> = OcpiResponse<T>;

/**
 * Response for endpoints that return an array of objects
 */
export type OcpiListResponse<T> = OcpiResponse<T[]>;

/**
 * Response for endpoints that return no data (e.g., DELETE, some POST/PUT operations)
 */
export type OcpiEmptyResponse = OcpiResponse<undefined>;

/**
 * Response for error cases where no data is returned
 */
export type OcpiErrorResponse = OcpiResponse<undefined>;
