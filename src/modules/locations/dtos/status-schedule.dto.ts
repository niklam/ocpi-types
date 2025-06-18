import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';

// Enum imports
import { Status } from '../enums/status.enum';

/**
 * This type is used to schedule status periods in the future.
 * The eMSP can provide this information to the EV user for trip planning purposes.
 * A period MAY have no end.
 * Example: "This station will be running as of tomorrow. Today it is still planned and under construction."
 */
export class StatusScheduleDto {
  /**
   * Begin of the scheduled period.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'period_begin' })
  periodBegin: string;

  /**
   * End of the scheduled period, if known.
   */
  @IsOptional()
  @IsOcpiDateTime()
  @Expose({ name: 'period_end' })
  periodEnd?: string;

  /**
   * Status value during the scheduled period.
   */
  @Expose()
  status: Status;
}
