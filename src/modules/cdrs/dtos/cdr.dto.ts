import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// DTO imports
import { CdrTokenDto } from './cdr-token.dto';
import { CdrLocationDto } from './cdr-location.dto';
import { TariffDto } from '../../tariffs/dtos/tariff.dto';
import { ChargingPeriodDto } from './charging-period.dto';
import { SignedDataDto } from './signed-data.dto';
import { PriceDto } from '../../../dtos/price.dto';

// Enum imports
import { AuthMethod } from '../enums/auth-method.enum';

/**
 * The CDR object describes the charging session and its costs, how these costs are composed, etc.
 *
 * The CDR object is different from the Session object. The Session object is dynamic as it reflects the current state of the charging session.
 * The information is meant to be viewed by the driver while the charging session is ongoing.
 *
 * The CDR on the other hand can be thought of as sealed, preserving the information valid at the moment in time the underlying session was started.
 * This is a requirement of the main use case for CDRs, namely invoicing.
 */
export class CdrDto {
  /**
   * ISO-3166 alpha-2 country code of the CPO that 'owns' this CDR.
   */
  @IsOcpiCiString()
  @MinLength(2)
  @MaxLength(2)
  @Expose({ name: 'country_code' })
  countryCode: string;

  /**
   * ID of the CPO that 'owns' this CDR (following the ISO-15118 standard).
   */
  @IsOcpiCiString()
  @MinLength(3)
  @MaxLength(3)
  @Expose({ name: 'party_id' })
  partyId: string;

  /**
   * Uniquely identifies the CDR, the ID SHALL be unique per country_code/party_id combination.
   * This field is longer than the usual 36 characters to allow for credit CDRs to have something appended to the original ID.
   * Normal (non-credit) CDRs SHALL only have an ID with a maximum length of 36.
   */
  @IsOcpiCiString()
  @MaxLength(39)
  @Expose()
  id: string;

  /**
   * Start timestamp of the charging session, or in-case of a reservation (before the start of a session) the start of the reservation.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'start_date_time' })
  startDateTime: string;

  /**
   * The timestamp when the session was completed/finished, charging might have finished before the session ends,
   * for example: EV is full, but parking cost also has to be paid.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'end_date_time' })
  endDateTime: string;

  /**
   * Unique ID of the Session for which this CDR is sent. Is only allowed to be omitted when the CPO has not implemented the Sessions module
   * or this CDR is the result of a reservation that never became a charging session, thus no OCPI Session.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'session_id' })
  sessionId?: string;

  /**
   * Token used to start this charging session, including all the relevant information to identify the unique token.
   */
  @ValidateNested()
  @Type(() => CdrTokenDto)
  @Expose({ name: 'cdr_token' })
  cdrToken: CdrTokenDto;

  /**
   * Method used for authentication. Multiple AuthMethods are possible during a charging sessions, for example when the session was started with a reservation: ReserveNow: COMMAND.
   * When the driver arrives and starts charging using a Token that is whitelisted: WHITELIST. The last method SHALL be used in the CDR.
   */
  @Expose({ name: 'auth_method' })
  authMethod: AuthMethod;

  /**
   * Reference to the authorization given by the eMSP. When the eMSP provided an authorization_reference in either: real-time authorization, StartSession or ReserveNow, this field SHALL contain the same value.
   * When different authorization_reference values have been given by the eMSP that are relevant to this Session, the last given value SHALL be used here.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'authorization_reference' })
  authorizationReference?: string;

  /**
   * Location where the charging session took place, including only the relevant EVSE and Connector.
   */
  @ValidateNested()
  @Type(() => CdrLocationDto)
  @Expose({ name: 'cdr_location' })
  cdrLocation: CdrLocationDto;

  /**
   * Identification of the Meter inside the Charge Point.
   */
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Expose({ name: 'meter_id' })
  meterId?: string;

  /**
   * Currency of the CDR in ISO 4217 Code.
   */
  @IsString()
  @MaxLength(3)
  @Expose()
  currency: string;

  /**
   * List of relevant Tariffs. When relevant, a Free of Charge tariff should also be in this list, and point to a defined Free of Charge Tariff.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TariffDto)
  @Expose()
  tariffs?: TariffDto[];

  /**
   * List of Charging Periods that make up this charging session.
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ChargingPeriodDto)
  @Expose({ name: 'charging_periods' })
  chargingPeriods: ChargingPeriodDto[];

  /**
   * Signed data that belongs to this charging Session.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => SignedDataDto)
  @Expose({ name: 'signed_data' })
  signedData?: SignedDataDto;

  /**
   * Total sum of all the costs of this transaction in the specified currency.
   */
  @ValidateNested()
  @Type(() => PriceDto)
  @Expose({ name: 'total_cost' })
  totalCost: PriceDto;

  /**
   * Total sum of all the fixed costs in the specified currency, except fixed price components of parking and reservation.
   * The cost not depending on amount of time/energy used etc. Can contain costs like a start tariff.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  @Expose({ name: 'total_fixed_cost' })
  totalFixedCost?: PriceDto;

  /**
   * Total energy charged, in kWh.
   */
  @IsNumber(
    {},
    {
      message: 'totalEnergy must be a number',
    },
  )
  @Min(0, {
    message: 'totalEnergy must be at least 0',
  })
  @Expose({ name: 'total_energy' })
  totalEnergy: number;

  /**
   * Total sum of all the cost of all the energy used, in the specified currency.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  @Expose({ name: 'total_energy_cost' })
  totalEnergyCost?: PriceDto;

  /**
   * Total duration of the charging session (including the duration of charging and not charging), in hours.
   */
  @IsNumber(
    {},
    {
      message: 'totalTime must be a number',
    },
  )
  @Min(0, {
    message: 'totalTime must be at least 0',
  })
  @Expose({ name: 'total_time' })
  totalTime: number;

  /**
   * Total sum of all the cost related to duration of charging during this transaction, in the specified currency.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  @Expose({ name: 'total_time_cost' })
  totalTimeCost?: PriceDto;

  /**
   * Total duration of the charging session where the EV was not charging (no energy was transferred between EVSE and EV), in hours.
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'totalParkingTime must be a number',
    },
  )
  @Min(0, {
    message: 'totalParkingTime must be at least 0',
  })
  @Expose({ name: 'total_parking_time' })
  totalParkingTime?: number;

  /**
   * Total sum of all the cost related to parking of this transaction, including fixed price components, in the specified currency.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  @Expose({ name: 'total_parking_cost' })
  totalParkingCost?: PriceDto;

  /**
   * Total sum of all the cost related to a reservation of a Charge Point, including fixed price components, in the specified currency.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  @Expose({ name: 'total_reservation_cost' })
  totalReservationCost?: PriceDto;

  /**
   * Optional remark, can be used to provide additional human readable information to the CDR, for example: reason why a transaction was stopped.
   */
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Expose()
  remark?: string;

  /**
   * This field can be used to reference an invoice, that will later be send for this CDR. Making it easier to link a CDR to a given invoice.
   * Maybe even group CDRs that will be on the same invoice.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(39)
  @Expose({ name: 'invoice_reference_id' })
  invoiceReferenceId?: string;

  /**
   * When set to true, this is a Credit CDR, and the field credit_reference_id needs to be set as well.
   */
  @IsOptional()
  @IsBoolean()
  @Expose()
  credit?: boolean;

  /**
   * Is required to be set for a Credit CDR. This SHALL contain the id of the CDR for which this is a Credit CDR.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(39)
  @Expose({ name: 'credit_reference_id' })
  creditReferenceId?: string;

  /**
   * When set to true, this CDR is for a charging session using the home charger of the EV Driver for which the energy cost needs to be financial compensated to the EV Driver.
   */
  @IsOptional()
  @IsBoolean()
  @Expose({ name: 'home_charging_compensation' })
  homeChargingCompensation?: boolean;

  /**
   * Timestamp when this CDR was last updated (or created).
   */
  @IsOcpiDateTime()
  @Expose({ name: 'last_updated' })
  lastUpdated: string;
}
