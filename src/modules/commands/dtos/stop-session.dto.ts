import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

// Decorator imports
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

/**
 * The StopSession object.
 */
export class StopSessionDto {
  /**
   * URL that the CommandResult POST should be sent to. This URL might contain a unique ID to be able to distinguish between StopSession requests.
   */
  @IsString()
  @Expose({ name: 'response_url' })
  responseUrl: string;

  /**
   * Session.id of the Session that is requested to be stopped.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'session_id' })
  sessionId: string;
}