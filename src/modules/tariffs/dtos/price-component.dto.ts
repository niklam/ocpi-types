import { IsNumber, IsOptional, IsInt, Min } from 'class-validator';
import { Expose } from 'class-transformer';

// Enum imports
import { TariffDimensionType } from '../enums/tariff-dimension-type.enum';

/**
 * A Price Component describes how a certain amount of a certain dimension being consumed translates into an amount of money owed.
 */
export class PriceComponentDto {
  /**
   * The dimension that is being priced.
   */
  @Expose()
  type: TariffDimensionType;

  /**
   * Price per unit (excl. VAT) for this dimension.
   */
  @IsNumber(
    {},
    {
      message: 'price must be a number',
    },
  )
  @Min(0, {
    message: 'price must be at least 0',
  })
  @Expose()
  price: number;

  /**
   * Applicable VAT percentage for this tariff dimension. If omitted, no VAT is applicable.
   * Not providing a VAT is different from 0% VAT, which would be a value of 0.0 here.
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'vat must be a number',
    },
  )
  @Min(0, {
    message: 'vat must be at least 0',
  })
  @Expose()
  vat?: number;

  /**
   * Minimum amount to be billed. That is, the dimension will be billed in this step_size blocks.
   * Consumed amounts are rounded up to the smallest multiple of step_size that is greater than the consumed amount.
   * For example: if type is TIME and step_size has a value of 300, then time will be billed in blocks of 5 minutes.
   * If 6 minutes were consumed, 10 minutes (2 blocks of step_size) will be billed.
   */
  @IsInt({
    message: 'stepSize must be an integer',
  })
  @Min(1, {
    message: 'stepSize must be at least 1',
  })
  @Expose({ name: 'step_size' })
  stepSize: number;
}
