import { ArrayMinSize, IsArray, IsOptional, MaxLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// DTO imports
import { CdrDimensionDto } from './cdr-dimension.dto';

/**
 * A Charging Period consists of a start timestamp and a list of possible values that influence this period,
 * for example: amount of energy charged this period, maximum current during this period etc.
 */
export class ChargingPeriodDto {
  /**
   * Start timestamp of the charging period. A period ends when the next period starts.
   * The last period ends when the session ends.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'start_date_time' })
  startDateTime: string;

  /**
   * List of relevant values for this charging period.
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CdrDimensionDto)
  @Expose()
  dimensions: CdrDimensionDto[];

  /**
   * Unique identifier of the Tariff that is relevant for this Charging Period.
   * If not provided, no Tariff is relevant during this period.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'tariff_id' })
  tariffId?: string;
}
