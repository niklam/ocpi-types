import { IsNumber, Min } from 'class-validator';
import { Expose } from 'class-transformer';

// Enum imports
import { CdrDimensionType } from '../enums/cdr-dimension-type.enum';

/**
 * A CDR Dimension represents one dimension of the usage of the charge point.
 */
export class CdrDimensionDto {
  /**
   * Type of CDR dimension.
   */
  @Expose()
  type: CdrDimensionType;

  /**
   * Volume of the dimension consumed, measured according to the dimension type.
   */
  @IsNumber(
    {},
    {
      message: 'volume must be a number',
    },
  )
  @Min(0, {
    message: 'volume must be at least 0',
  })
  @Expose()
  volume: number;
}
