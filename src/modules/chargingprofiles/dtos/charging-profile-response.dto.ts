import { IsInt, Min } from 'class-validator';
import { Expose } from 'class-transformer';

// Enum imports
import { ChargingProfileResponseType } from '../enums/charging-profile-response-type.enum';

/**
 * The ChargingProfileResponse object is send in the HTTP response body.
 *
 * Because OCPI does not allow/require retries, it could happen that the asynchronous result url given by the eMSP is never successfully called.
 * The eMSP might have had a glitch, HTTP 500 returned, was offline for a moment etc. For the eMSP to be able to reject to timeouts,
 * it is important for the eMSP to know the timeout on a certain command.
 */
export class ChargingProfileResponseDto {
  /**
   * Response from the CPO on the ChargingProfile request.
   */
  @Expose()
  result: ChargingProfileResponseType;

  /**
   * Timeout for this ChargingProfile request in seconds. When the Result is not received within this timeout, the eMSP can assume that the message might never be sent.
   */
  @IsInt({
    message: 'timeout must be an integer',
  })
  @Min(1, {
    message: 'timeout must be at least 1 second',
  })
  @Expose()
  timeout: number;
}
