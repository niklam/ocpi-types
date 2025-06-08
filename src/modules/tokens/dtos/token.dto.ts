import { IsBoolean, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// DTO imports
import { EnergyContractDto } from './energy-contract.dto';

// Enum imports
import { TokenType } from '../enums/token-type.enum';
import { WhitelistType } from '../enums/whitelist-type.enum';
import { ProfileType } from '../../sessions/enums/profile-type.enum';

/**
 * Token object representing an EV driver's authentication token.
 *
 * The combination of uid and type should be unique for every token within the eMSP's system.
 *
 * Note: OCPP supports group_id (or ParentID as it is called in OCPP 1.5/1.6) OCPP 1.5/1.6 only support group ID's with maximum length of string(20), case insensitive.
 * As long as EV-driver can be expected to charge at an OCPP 1.5/1.6 Charge Point, it is adviced to not used a group_id longer then 20.
 */
export class TokenDto {
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
   * Unique ID by which this Token, combined with the Token type, can be identified. This is the field used by CPO system (RFID reader on the Charge Point) to identify this token.
   * Currently, in most cases: type=RFID, this is the RFID hidden ID as read by the RFID reader, but that is not a requirement.
   * If this is a APP_USER or AD_HOC_USER Token, it will be a uniquely, by the eMSP, generated ID.
   * This field is named uid instead of id to prevent confusion with: contract_id.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  uid: string;

  /**
   * Type of the token.
   */
  type: TokenType;

  /**
   * Uniquely identifies the EV Driver contract token within the eMSP's platform (and suboperator platforms).
   * Recommended to follow the specification for eMA ID from "eMI3 standard version V1.0" "Part 2: business objects."
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'contract_id' })
  contractId: string;

  /**
   * Visual readable number/identification as printed on the Token (RFID card), might be equal to the contract_id.
   */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  @Expose({ name: 'visual_number' })
  visualNumber?: string;

  /**
   * Issuing company, most of the times the name of the company printed on the token (RFID card), not necessarily the eMSP.
   */
  @IsString()
  @MaxLength(64)
  issuer: string;

  /**
   * This ID groups a couple of tokens. This can be used to make two or more tokens work as one, so that a session can be started with one token and stopped with another,
   * handy when a card and key-fob are given to the EV-driver. Beware that OCPP 1.5/1.6 only support group_ids (it is called parentId in OCPP 1.5/1.6) with a maximum length of 20.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'group_id' })
  groupId?: string;

  /**
   * Is this Token valid.
   */
  @IsBoolean()
  valid: boolean;

  /**
   * Indicates what type of white-listing is allowed.
   */
  whitelist: WhitelistType;

  /**
   * Language Code ISO 639-1. This optional field indicates the Token owner's preferred interface language.
   * If the language is not provided or not supported then the CPO is free to choose its own language.
   */
  @IsOptional()
  @IsString()
  @MaxLength(2)
  language?: string;

  /**
   * The default Charging Preference. When this is provided, and a charging session is started on an Charge Point that support Preference base Smart Charging and support this ProfileType,
   * the Charge Point can start using this ProfileType, without this having to be set via: Set Charging Preferences.
   */
  @IsOptional()
  @Expose({ name: 'default_profile_type' })
  defaultProfileType?: ProfileType;

  /**
   * When the Charge Point supports using your own energy supplier/contract at a Charge Point, information about the energy supplier/contract is needed so the CPO knows which energy supplier to use.
   * NOTE: In a lot of countries it is currently not allowed/possible to use a drivers own energy supplier/contract at a Charge Point.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => EnergyContractDto)
  @Expose({ name: 'energy_contract' })
  energyContract?: EnergyContractDto;

  /**
   * Timestamp when this Token was last updated (or created).
   */
  @IsOcpiDateTime()
  @Expose({ name: 'last_updated' })
  lastUpdated: string;
}