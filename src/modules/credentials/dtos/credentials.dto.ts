import { ArrayMinSize, IsArray, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// DTO imports
import { CredentialsRoleDto } from './credentials-role.dto';

/**
 * Credentials object
 *
 * Every role needs a unique combination of: role, party_id and country_code.
 * A platform can have the same role more than once, each with its own unique party_id and country_code, for example when a CPO provides 'white-label' services for 'virtual' CPOs.
 *
 * One or more roles and thus party_id and country_code sets are provided here to inform a server about the party_id and country_code sets a client will use when pushing Client Owned Objects.
 * This helps a server to determine the URLs a client will use when pushing a Client Owned Object. The country_code is added to make certain the URL used when pushing a Client Owned Object is unique
 * as there might be multiple parties in the world with the same party_id. The combination of country_code and party_id should always be unique though.
 * A party operating in multiple countries can always use the home country of the company for all connections.
 *
 * For example: EVSE IDs can be pushed under the country and provider identification of a company, even if the EVSEs are actually located in a different country.
 * This way it is not necessary to establish one OCPI connection per country a company operates in.
 *
 * The party_id and country_code given here have no direct link with the eMI3 EVSE IDs and Contract IDs that might be used in the different OCPI modules.
 * A party implementing OCPI MAY push EVSE IDs with an eMI3 spot operator different from the OCPI party_id and/or the country_code.
 *
 * A Hub SHALL only reports itself as role: Hub. A Hub SHALL NOT report all the other connected parties as a role on the platform.
 * A Hub SHALL report connected parties via the HubClientInfo module.
 */
export class CredentialsDto {
  /**
   * The credentials token for the other party to authenticate in your system. It should only contain printable non-whitespace ASCII characters,
   * that is, characters with Unicode code points from the range of U+0021 up to and including U+007E.
   */
  @IsString()
  @MaxLength(64)
  token: string;

  /**
   * The URL to your API versions endpoint.
   */
  @IsString()
  url: string;

  /**
   * List of the roles this party provides.
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CredentialsRoleDto)
  roles: CredentialsRoleDto[];
}