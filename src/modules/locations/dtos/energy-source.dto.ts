import { IsNumber, Min, Max } from 'class-validator';
import { Expose } from 'class-transformer';

// Enum imports
import { EnergySourceCategory } from '../enums/energy-source-category.enum';

/**
 * Key-value pairs (enum + percentage) of energy sources.
 * All given values of all categories should add up to 100 percent.
 */
export class EnergySourceDto {
  /**
   * The type of energy source.
   */
  @Expose()
  source: EnergySourceCategory;

  /**
   * Percentage of this source (0-100) in the mix.
   */
  @IsNumber(
    {},
    {
      message: 'percentage must be a number',
    },
  )
  @Min(0, {
    message: 'percentage must be at least 0',
  })
  @Max(100, {
    message: 'percentage must be at most 100',
  })
  @Expose()
  percentage: number;
}
