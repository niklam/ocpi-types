import { IsString, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

/**
 * Multi-language text for display to end users.
 */
export class DisplayTextDto {
  /**
   * Language Code ISO 639-1.
   */
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @Expose()
  language: string;

  /**
   * Text to be displayed to a end user.
   * No markup, html etc. allowed.
   */
  @IsString()
  @MaxLength(512)
  @Expose()
  text: string;
}
