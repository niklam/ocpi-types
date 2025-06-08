import { MaxLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

// DTO imports
import { BusinessDetailsDto } from '../../locations/dtos/business-details.dto';

// Enum imports
import { Role } from '../../../enums/role.enum';

// Decorator imports
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

/**
 * CredentialsRole class
 */
export class CredentialsRoleDto {
  /**
   * Type of role.
   */
  role: Role;

  /**
   * Details of this party.
   */
  @ValidateNested()
  @Type(() => BusinessDetailsDto)
  @Expose({ name: 'business_details' })
  businessDetails: BusinessDetailsDto;

  /**
   * CPO, eMSP (or other role) ID of this party (following the ISO-15118 standard).
   */
  @IsOcpiCiString()
  @MaxLength(3)
  @Expose({ name: 'party_id' })
  partyId: string;

  /**
   * ISO-3166 alpha-2 country code of the country this party is operating in.
   */
  @IsOcpiCiString()
  @MaxLength(2)
  @Expose({ name: 'country_code' })
  countryCode: string;
}