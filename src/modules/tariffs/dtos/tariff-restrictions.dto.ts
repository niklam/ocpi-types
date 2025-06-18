import { IsArray, IsInt, IsNumber, IsOptional, IsString, Matches, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsTime } from '../../../decorators/is-time.decorator';

// Enum imports
import { DayOfWeek } from '../enums/day-of-week.enum';
import { ReservationRestrictionType } from '../enums/reservation-restriction-type.enum';

/**
 * A TariffRestrictions object describes if and when a Tariff Element becomes active or inactive during a Charging Session.
 * These restrictions are not to be interpreted as making the Tariff Element applicable or not applicable for the entire Charging Session.
 *
 * When more than one restriction is set, they are to be treated as a logical AND.
 * So a Tariff Element is active if and only if all of the properties in its TariffRestrictions match.
 */
export class TariffRestrictionsDto {
  /**
   * Start time of day in local time, the time zone is defined in the time_zone field of the Location, for example 13:30, valid from this time of the day.
   * Must be in 24h format with leading zeros. Hour/Minute separator: ":"
   * Regex: ([0-1][0-9]|2[0-3]):[0-5][0-9]
   */
  @IsOptional()
  @IsTime()
  @Expose({ name: 'start_time' })
  startTime?: string;

  /**
   * End time of day in local time, the time zone is defined in the time_zone field of the Location, for example 19:45, valid until this time of the day.
   * Same syntax as start_time. If end_time < start_time then the period wraps around to the next day. To stop at end of the day use: 00:00.
   */
  @IsOptional()
  @IsTime()
  @Expose({ name: 'end_time' })
  endTime?: string;

  /**
   * Start date in local time, the time zone is defined in the time_zone field of the Location, for example: 2015-12-24, valid from this day (inclusive).
   * Regex: ([12][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
   */
  @IsOptional()
  @IsString()
  @Matches(/^([12][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'startDate must be in YYYY-MM-DD format (e.g., 2015-12-24)',
  })
  @Expose({ name: 'start_date' })
  startDate?: string;

  /**
   * End date in local time, the time zone is defined in the time_zone field of the Location, for example: 2015-12-27, valid until this day (exclusive).
   * Same syntax as start_date.
   */
  @IsOptional()
  @IsString()
  @Matches(/^([12][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'endDate must be in YYYY-MM-DD format (e.g., 2015-12-27)',
  })
  @Expose({ name: 'end_date' })
  endDate?: string;

  /**
   * Minimum consumed energy in kWh, for example 20, valid from this amount of energy (inclusive) being used.
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'minKwh must be a number',
    },
  )
  @Min(0, {
    message: 'minKwh must be at least 0',
  })
  @Expose({ name: 'min_kwh' })
  minKwh?: number;

  /**
   * Maximum consumed energy in kWh, for example 50, valid until this amount of energy (exclusive) being used.
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'maxKwh must be a number',
    },
  )
  @Min(0, {
    message: 'maxKwh must be at least 0',
  })
  @Expose({ name: 'max_kwh' })
  maxKwh?: number;

  /**
   * Sum of the minimum current (in Amperes) over all phases, for example 5. When the EV is charging with more than, or equal to, the defined amount of current, this TariffElement is/becomes active.
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'minCurrent must be a number',
    },
  )
  @Min(0, {
    message: 'minCurrent must be at least 0',
  })
  @Expose({ name: 'min_current' })
  minCurrent?: number;

  /**
   * Sum of the maximum current (in Amperes) over all phases, for example 20. When the EV is charging with less than the defined amount of current, this TariffElement becomes/is active.
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'maxCurrent must be a number',
    },
  )
  @Min(0, {
    message: 'maxCurrent must be at least 0',
  })
  @Expose({ name: 'max_current' })
  maxCurrent?: number;

  /**
   * Minimum power in kW, for example 5. When the EV is charging with more than, or equal to, the defined amount of power, this TariffElement is/becomes active.
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'minPower must be a number',
    },
  )
  @Min(0, {
    message: 'minPower must be at least 0',
  })
  @Expose({ name: 'min_power' })
  minPower?: number;

  /**
   * Maximum power in kW, for example 20. When the EV is charging with less than the defined amount of power, this TariffElement becomes/is active.
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'maxPower must be a number',
    },
  )
  @Min(0, {
    message: 'maxPower must be at least 0',
  })
  @Expose({ name: 'max_power' })
  maxPower?: number;

  /**
   * Minimum duration in seconds the Charging Session MUST last (inclusive). When the duration of a Charging Session is longer than the defined value, this TariffElement is or becomes active.
   */
  @IsOptional()
  @IsInt({
    message: 'minDuration must be an integer',
  })
  @Min(0, {
    message: 'minDuration must be at least 0',
  })
  @Expose({ name: 'min_duration' })
  minDuration?: number;

  /**
   * Maximum duration in seconds the Charging Session MUST last (exclusive). When the duration of a Charging Session is shorter than the defined value, this TariffElement is or becomes active.
   */
  @IsOptional()
  @IsInt({
    message: 'maxDuration must be an integer',
  })
  @Min(0, {
    message: 'maxDuration must be at least 0',
  })
  @Expose({ name: 'max_duration' })
  maxDuration?: number;

  /**
   * Which day(s) of the week this TariffElement is active.
   */
  @IsOptional()
  @IsArray()
  @Expose({ name: 'day_of_week' })
  dayOfWeek?: DayOfWeek[];

  /**
   * When this field is present, the TariffElement describes reservation costs. A reservation starts when the reservation is made, and ends when the driver starts charging on the reserved EVSE/Location, or when the reservation expires.
   */
  @IsOptional()
  @Expose()
  reservation?: ReservationRestrictionType;
}
