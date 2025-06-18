import { MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

// Enum imports
import { ConnectionStatus } from '../enums/connection-status.enum';

// Decorator imports
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';
import { Role } from '../../../enums/role.enum';

/**
 * ClientInfo Object
 */
export class ClientInfoDto {
  /**
   * CPO or eMSP ID of this party (following the 15118 ISO standard), as used in the credentials exchange.
   */
  @IsOcpiCiString()
  @MaxLength(3)
  @Expose({ name: 'party_id' })
  partyId: string;

  /**
   * Country code of the country this party is operating in, as used in the credentials exchange.
   */
  @IsOcpiCiString()
  @MaxLength(2)
  @Expose({ name: 'country_code' })
  countryCode: string;

  /**
   * The role of the connected party.
   */
  @Expose()
  role: Role;

  /**
   * Status of the connection to the party.
   */
  @Expose()
  status: ConnectionStatus;

  /**
   * Timestamp when this ClientInfo object was last updated.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'last_updated' })
  lastUpdated: Date;
}
