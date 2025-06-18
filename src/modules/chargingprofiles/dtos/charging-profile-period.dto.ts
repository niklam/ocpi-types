import { IsInt, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

/**
 * Charging profile period structure defines a time period in a charging profile, as used in: ChargingProfile
 */
export class ChargingProfilePeriodDto {
  /**
   * Start of the period, in seconds from the start of profile. The value of StartPeriod also defines the stop time of the previous period.
   */
  @IsInt()
  @Expose({ name: 'start_period' })
  startPeriod: number;

  /**
   * Charging rate limit during the profile period, in the applicable chargingRateUnit, for example in Amperes (A) or Watts (W). Accepts at most one digit fraction (e.g. 8.1).
   */
  @IsNumber({ maxDecimalPlaces: 1 })
  @Expose()
  limit: number;
}
