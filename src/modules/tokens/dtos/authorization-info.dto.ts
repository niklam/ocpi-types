import { IsOptional, MaxLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

// DTO imports
import { TokenDto } from './token.dto';
import { LocationReferencesDto } from './location-references.dto';
import { DisplayTextDto } from '../../../dtos/display-text.dto';

// Enum imports
import { AllowedType } from '../enums/allowed-type.enum';


// Decorator imports
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

/**
 * AuthorizationInfo Object
 */
export class AuthorizationInfoDto {
  /**
   * Status of the Token, and whether charging is allowed at the optionally given location.
   */
  allowed: AllowedType;

  /**
   * The complete Token object for which this authorization was requested.
   */
  @ValidateNested()
  @Type(() => TokenDto)
  token: TokenDto;

  /**
   * Optional reference to the location if it was included in the request, and if the EV driver is allowed to charge at that location. Only the EVSEs the EV driver is allowed to charge at are returned.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationReferencesDto)
  location?: LocationReferencesDto;

  /**
   * Reference to the authorization given by the eMSP, when given, this reference will be provided in the relevant Session and/or CDR.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'authorization_reference' })
  authorizationReference?: string;

  /**
   * Optional display text, additional information to the EV driver.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => DisplayTextDto)
  info?: DisplayTextDto;
}