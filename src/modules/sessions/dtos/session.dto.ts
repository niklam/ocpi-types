import { IsArray, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// DTO imports
import { CdrTokenDto } from '../../cdrs/dtos/cdr-token.dto';
import { ChargingPeriodDto } from '../../cdrs/dtos/charging-period.dto';
import { PriceDto } from '../../../dtos/price.dto';

// Enum imports
import { AuthMethod } from '../../cdrs/enums/auth-method.enum';
import { SessionStatus } from '../enums/session-status.enum';

/**
 * The Session object describes one charging session. That doesn't mean it is required that energy has been transferred between EV and the Charge Point.
 * It is possible that the EV never took energy from the Charge Point because it was instructed not to take energy by the driver.
 * But as the EV was connected to the Charge Point, some form of start tariff, park tariff or reservation cost might be relevant.
 */
export class SessionDto {
  /**
   * ISO-3166 alpha-2 country code of the CPO that 'owns' this Session.
   */
  @IsOcpiCiString()
  @MinLength(2)
  @MaxLength(2)
  @Expose({ name: 'country_code' })
  countryCode: string;

  /**
   * ID of the CPO that 'owns' this Session (following the ISO-15118 standard).
   */
  @IsOcpiCiString()
  @MinLength(3)
  @MaxLength(3)
  @Expose({ name: 'party_id' })
  partyId: string;

  /**
   * The unique id that identifies the charging session in the CPO platform.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose()
  id: string;

  /**
   * The timestamp when the session became ACTIVE in the Charge Point.
   * When the session is still PENDING, this field SHALL be set to the time the Session was created at the Charge Point.
   * When a Session goes from PENDING to ACTIVE, this field SHALL be updated to the moment the Session went to ACTIVE in the Charge Point.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'start_date_time' })
  startDateTime: string;

  /**
   * The timestamp when the session was completed/finished, charging might have finished before the session ends,
   * for example: EV is full, but parking cost also has to be paid.
   */
  @IsOptional()
  @IsOcpiDateTime()
  @Expose({ name: 'end_date_time' })
  endDateTime?: string;

  /**
   * How many kWh were charged.
   */
  @IsNumber(
    {},
    {
      message: 'kwh must be a number',
    },
  )
  @Min(0, {
    message: 'kwh must be at least 0',
  })
  @Expose()
  kwh: number;

  /**
   * Token used to start this charging session, including all the relevant information to identify the unique token.
   */
  @ValidateNested()
  @Type(() => CdrTokenDto)
  @Expose({ name: 'cdr_token' })
  cdrToken: CdrTokenDto;

  /**
   * Method used for authentication. This might change during a session, for example when the session was started with a reservation: ReserveNow: COMMAND.
   * When the driver arrives and starts charging using a Token that is whitelisted: WHITELIST.
   */
  @Expose({ name: 'auth_method' })
  authMethod: AuthMethod;

  /**
   * Reference to the authorization given by the eMSP. When the eMSP provided an authorization_reference in either: real-time authorization, StartSession or ReserveNow this field SHALL contain the same value.
   * When different authorization_reference values have been given by the eMSP that are relevant to this Session, the last given value SHALL be used here.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'authorization_reference' })
  authorizationReference?: string;

  /**
   * Location.id of the Location object of this CPO, on which the charging session is/was happening.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'location_id' })
  locationId: string;

  /**
   * EVSE.uid of the EVSE of this Location on which the charging session is/was happening.
   * Allowed to be set to: #NA when this session is created for a reservation, but no EVSE yet assigned to the driver.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'evse_uid' })
  evseUid: string;

  /**
   * Connector.id of the Connector of this Location where the charging session is/was happening.
   * Allowed to be set to: #NA when this session is created for a reservation, but no connector yet assigned to the driver.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'connector_id' })
  connectorId: string;

  /**
   * Optional identification of the kWh meter.
   */
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Expose({ name: 'meter_id' })
  meterId?: string;

  /**
   * ISO 4217 code of the currency used for this session.
   */
  @IsString()
  @MaxLength(3)
  @Expose()
  currency: string;

  /**
   * An optional list of Charging Periods that can be used to calculate and verify the total cost.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChargingPeriodDto)
  @Expose({ name: 'charging_periods' })
  chargingPeriods?: ChargingPeriodDto[];

  /**
   * The total cost of the session in the specified currency. This is the price that the eMSP will have to pay to the CPO.
   * A total_cost of 0.00 means free of charge. When omitted, i.e. no price information is given in the Session object, it does not imply the session is/was free of charge.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  @Expose({ name: 'total_cost' })
  totalCost?: PriceDto;

  /**
   * The status of the session.
   */
  @Expose()
  status: SessionStatus;

  /**
   * Timestamp when this Session was last updated (or created).
   */
  @IsOcpiDateTime()
  @Expose({ name: 'last_updated' })
  lastUpdated: string;
}
