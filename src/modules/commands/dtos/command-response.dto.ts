import { IsArray, IsInt, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type, Expose } from 'class-transformer';

// DTO imports
import { DisplayTextDto } from '../../../dtos/display-text.dto';

// Enum imports
import { CommandResponseType } from '../enums/command-response-type.enum';

/**
 * The CommandResponse object is send in the HTTP response body.
 *
 * Because OCPI does not allow/require retries, it could happen that the asynchronous result url given by the eMSP is never successfully called.
 * The eMSP might have had a glitch, HTTP 500 returned, was offline for a moment etc. For the eMSP to be able to give a quick as possible response to another system or driver app.
 * It is important for the eMSP to know the timeout on a certain command.
 */
export class CommandResponseDto {
  /**
   * Response from the CPO on the command request.
   */
  @Expose()
  result: CommandResponseType;

  /**
   * Timeout for this command in seconds. When the Result is not received within this timeout, the eMSP can assume that the message might never be send.
   */
  @IsInt({
    message: 'timeout must be an integer',
  })
  @Min(1, {
    message: 'timeout must be at least 1 second',
  })
  @Expose()
  timeout: number;

  /**
   * Human-readable description of the result (if one can be provided), multiple languages can be provided.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DisplayTextDto)
  @Expose()
  message?: DisplayTextDto[];
}
