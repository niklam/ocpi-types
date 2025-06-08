import { IsString, MaxLength, MinLength } from 'class-validator';

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
  language: string;

  /**
   * Text to be displayed to a end user.
   * No markup, html etc. allowed.
   */
  @IsString()
  @MaxLength(512)
  text: string;
}