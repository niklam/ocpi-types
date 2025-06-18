import { Expose } from 'class-transformer';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';

/**
 * Specifies one exceptional period for opening or access hours.
 */
export class ExceptionalPeriodDto {
  /**
   * Begin of the exception.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'period_begin' })
  periodBegin: string;

  /**
   * End of the exception.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'period_end' })
  periodEnd: string;
}
