import { MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// Enum imports
import { TokenType } from '../../tokens/enums/token-type.enum';

/**
 * Token information for CDR purposes.
 */
export class CdrTokenDto {
  /**
   * ISO-3166 alpha-2 country code of the MSP that 'owns' this Token.
   */
  @IsOcpiCiString()
  @MinLength(2)
  @MaxLength(2)
  @Expose({ name: 'country_code' })
  countryCode: string;

  /**
   * ID of the eMSP that 'owns' this Token (following the ISO-15118 standard).
   */
  @IsOcpiCiString()
  @MinLength(3)
  @MaxLength(3)
  @Expose({ name: 'party_id' })
  partyId: string;

  /**
   * Unique ID by which this Token can be identified. This is the field used by the CPO's system (RFID reader on the Charge Point) to identify this token.
   * Currently, in most cases: type=RFID, this is the RFID hidden ID as read by the RFID reader, but that is not a requirement.
   * If this is a type=APP_USER Token, it will be a unique, by the eMSP, generated ID.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose()
  uid: string;

  /**
   * Type of the token.
   */
  @Expose()
  type: TokenType;

  /**
   * Uniquely identifies the EV driver contract token within the eMSP's platform (and suboperator platforms).
   * Recommended to follow the specification for eMA ID from "eMI3 standard version V1.0" "Part 2: business objects."
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'contract_id' })
  contractId: string;
}
