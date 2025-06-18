import { IsInt, Max, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsTime } from '../../../decorators/is-time.decorator';

/**
 * Regular recurring operation or access hours.
 */
export class RegularHoursDto {
  /**
   * Number of day in the week, from Monday (1) till Sunday (7)
   */
  @IsInt({
    message: 'weekday must be an integer',
  })
  @Min(1, {
    message: 'weekday must be at least 1 (Monday)',
  })
  @Max(7, {
    message: 'weekday must be at most 7 (Sunday)',
  })
  @Expose()
  weekday: number;

  /**
   * Begin of the regular period, in local time, given in hours and minutes.
   * Must be in 24h format with leading zeros. Example: "18:15".
   * Hour/Minute separator: ":"
   * Regex: ([0-1][0-9]|2[0-3]):[0-5][0-9]
   */
  @IsTime()
  @Expose({ name: 'period_begin' })
  periodBegin: string;

  /**
   * End of the regular period, in local time, syntax as for period_begin.
   * Must be later than period_begin.
   */
  @IsTime()
  @Expose({ name: 'period_end' })
  periodEnd: string;
}
