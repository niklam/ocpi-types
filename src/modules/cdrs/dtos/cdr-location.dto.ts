import { IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// DTO imports
import { GeoLocationDto } from '../../locations/dtos/geo-location.dto';

// Enum imports
import { ConnectorType } from '../../locations/enums/connector-type.enum';
import { ConnectorFormat } from '../../locations/enums/connector-format.enum';
import { PowerType } from '../../locations/enums/power-type.enum';

/**
 * The CdrLocation class contains only the relevant information from the Location object that is needed in a CDR.
 */
export class CdrLocationDto {
  /**
   * Uniquely identifies the location within the CPO's platform (and suboperator platforms).
   * This field can never be changed, modified or renamed.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  id: string;

  /**
   * Display name of the location.
   */
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  /**
   * Street/block name and house number if available.
   */
  @IsString()
  @MaxLength(45)
  address: string;

  /**
   * City or town.
   */
  @IsString()
  @MaxLength(45)
  city: string;

  /**
   * Postal code of the location, may only be omitted when the location has no postal code:
   * in some countries charging locations at highways don't have postal codes.
   */
  @IsOptional()
  @IsString()
  @MaxLength(10)
  @Expose({ name: 'postal_code' })
  postalCode?: string;

  /**
   * State only to be used when relevant.
   */
  @IsOptional()
  @IsString()
  @MaxLength(20)
  state?: string;

  /**
   * ISO 3166-1 alpha-3 code for the country of this location.
   */
  @IsString()
  @MaxLength(3)
  country: string;

  /**
   * Coordinates of the location.
   */
  @ValidateNested()
  @Type(() => GeoLocationDto)
  coordinates: GeoLocationDto;

  /**
   * Uniquely identifies the EVSE within the CPO's platform (and suboperator platforms).
   * For example a database unique ID or the actual EVSE ID. This field can never be changed, modified or renamed.
   * This is the technical identification of the EVSE, not to be used as human readable identification, use the field: evse_id for that.
   * Allowed to be set to: #NA when this CDR is created for a reservation that never resulted in a charging session.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'evse_uid' })
  evseUid: string;

  /**
   * Compliant with the following specification for EVSE ID from "eMI3 standard version V1.0" "Part 2: business objects.".
   * Allowed to be set to: #NA when this CDR is created for a reservation that never resulted in a charging session.
   */
  @IsOcpiCiString()
  @MaxLength(48)
  @Expose({ name: 'evse_id' })
  evseId: string;

  /**
   * Identifier of the connector within the EVSE.
   * Allowed to be set to: #NA when this CDR is created for a reservation that never resulted in a charging session.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'connector_id' })
  connectorId: string;

  /**
   * The standard of the installed connector. When this CDR is created for a reservation that never resulted in a charging session,
   * this field can be set to any value and should be ignored by the Receiver.
   */
  @Expose({ name: 'connector_standard' })
  connectorStandard: ConnectorType;

  /**
   * The format (socket/cable) of the installed connector. When this CDR is created for a reservation that never resulted in a charging session,
   * this field can be set to any value and should be ignored by the Receiver.
   */
  @Expose({ name: 'connector_format' })
  connectorFormat: ConnectorFormat;

  /**
   * When this CDR is created for a reservation that never resulted in a charging session,
   * this field can be set to any value and should be ignored by the Receiver.
   */
  @Expose({ name: 'connector_power_type' })
  connectorPowerType: PowerType;
}