import { IsArray, ValidateNested, ArrayMinSize, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';

// DTO imports
import { PriceComponentDto } from './price-component.dto';
import { TariffRestrictionsDto } from './tariff-restrictions.dto';

/**
 * A Tariff Element is a group of Price Components that share a set of restrictions under which they apply.
 *
 * That the Price Components share the same restrictions does not mean that at any time, they either all apply or all do not apply.
 * The reason is that applicable Price Components are looked up separately for each dimension, as described under the Tariff object.
 * Therefore it is possible that a Price Component for one dimension is found in a Tariff Element that occurs earlier in the list of Tariff Elements than for another dimension.
 */
export class TariffElementDto {
  /**
   * List of Price Components that each describe how a certain dimension is priced.
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PriceComponentDto)
  @Expose({ name: 'price_components' })
  priceComponents: PriceComponentDto[];

  /**
   * Restrictions that describe under which circumstances the Price Components of this Tariff Element apply.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TariffRestrictionsDto)
  restrictions?: TariffRestrictionsDto;
}