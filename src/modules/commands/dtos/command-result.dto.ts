import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type, Expose } from 'class-transformer';

// DTO imports
import { DisplayTextDto } from '../../../dtos/display-text.dto';

// Enum imports
import { CommandResultType } from '../enums/command-result-type.enum';

/**
 * The CommandResult object.
 */
export class CommandResultDto {
  /**
   * Result of the command request as sent by the Charge Point to the CPO.
   */
  @Expose()
  result: CommandResultType;

  /**
   * Human-readable description of the reason (if one can be provided), multiple languages can be provided.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DisplayTextDto)
  @Expose()
  message?: DisplayTextDto[];
}
