import { ArrayMinSize, IsArray, IsBoolean, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

// DTO imports
import { RegularHoursDto } from './regular-hours.dto';
import { ExceptionalPeriodDto } from './exceptional-period.dto';

/**
 * Opening and access hours of the location.
 *
 * Example: 24/7 open with exceptional closing.
 * Open 24 hours per day, 7 days a week, except for 25th of December 2018 between 03:00 and 05:00.
 */
export class HoursDto {
  /**
   * True to represent 24 hours a day and 7 days a week, except the given exceptions.
   */
  @IsBoolean()
  @Expose({ name: 'twentyfourseven' })
  twentyFourSeven: boolean;

  /**
   * Regular hours, weekday-based.
   * Only to be used if twentyfourseven=false, then this field needs to contain at least one RegularHours object.
   */
  @ValidateIf((o: HoursDto) => o.twentyFourSeven === false)
  @IsArray()
  @ArrayMinSize(1, {
    message: 'regularHours must contain at least one RegularHours object when twentyFourSeven is false',
  })
  @ValidateNested({ each: true })
  @Type(() => RegularHoursDto)
  @Expose({ name: 'regular_hours' })
  regularHours?: RegularHoursDto[];

  /**
   * Exceptions for specified calendar dates, time-range based.
   * Periods the station is operating/accessible. Additional to regular_hours. May overlap regular rules.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExceptionalPeriodDto)
  @Expose({ name: 'exceptional_openings' })
  exceptionalOpenings?: ExceptionalPeriodDto[];

  /**
   * Exceptions for specified calendar dates, time-range based.
   * Periods the station is not operating/accessible. Overwriting regular_hours and exceptional_openings.
   * Should not overlap exceptional_openings.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExceptionalPeriodDto)
  @Expose({ name: 'exceptional_closings' })
  exceptionalClosings?: ExceptionalPeriodDto[];
}
