import { IsNumber, Min } from 'class-validator';

// Enum imports
import { EnvironmentalImpactCategory } from '../enums/environmental-impact-category.enum';

/**
 * Amount of waste produced/emitted per kWh.
 */
export class EnvironmentalImpactDto {
  /**
   * The environmental impact category of this value.
   */
  category: EnvironmentalImpactCategory;

  /**
   * Amount of this portion in g/kWh.
   */
  @IsNumber({}, {
    message: 'amount must be a number'
  })
  @Min(0, {
    message: 'amount must be at least 0 g/kWh'
  })
  amount: number;
}