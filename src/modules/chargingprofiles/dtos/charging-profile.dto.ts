import { IsArray, IsInt, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

// DTO imports
import { ChargingProfilePeriodDto } from './charging-profile-period.dto';

// Enum imports
import { ChargingRateUnit } from '../enums/charging-rate-unit.enum';

// Decorator imports
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';

/**
 * Charging profile class defines a list of charging periods.
 */
export class ChargingProfileDto {
  /**
   * Starting point of an absolute profile. If absent the profile will be relative to start of charging.
   */
  @IsOptional()
  @IsOcpiDateTime()
  @Expose({ name: 'start_date_time' })
  startDateTime?: Date;

  /**
   * Duration of the charging profile in seconds. If the duration is left empty, the last period will continue indefinitely or until end of the transaction in case start_date_time is absent.
   */
  @IsOptional()
  @IsInt()
  duration?: number;

  /**
   * The unit of measure.
   */
  @Expose({ name: 'charging_rate_unit' })
  chargingRateUnit: ChargingRateUnit;

  /**
   * Minimum charging rate supported by the EV. The unit of measure is defined by the chargingRateUnit. This parameter is intended to be used by a local smart charging algorithm to optimize the power allocation for in the case a charging process is inefficient at lower charging rates. Accepts at most one digit fraction (e.g. 8.1)
   */
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Expose({ name: 'min_charging_rate' })
  minChargingRate?: number;

  /**
   * List of ChargingProfilePeriod elements defining maximum power or current usage over time.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChargingProfilePeriodDto)
  @Expose({ name: 'charging_profile_period' })
  chargingProfilePeriod: ChargingProfilePeriodDto[];
}