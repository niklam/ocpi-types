import { IsArray, IsBoolean, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

// DTO imports
import { EnergySourceDto } from './energy-source.dto';
import { EnvironmentalImpactDto } from './environmental-impact.dto';

/**
 * This type is used to specify the energy mix and environmental impact of the supplied energy at a location or in a tariff.
 */
export class EnergyMixDto {
  /**
   * True if 100% from regenerative sources. (CO2 and nuclear waste is zero)
   */
  @IsBoolean()
  @Expose({ name: 'is_green_energy' })
  isGreenEnergy: boolean;

  /**
   * Key-value pairs (enum + percentage) of energy sources of this location's tariff.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnergySourceDto)
  @Expose({ name: 'energy_sources' })
  energySources?: EnergySourceDto[];

  /**
   * Key-value pairs (enum + percentage) of nuclear waste and CO2 exhaust of this location's tariff.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnvironmentalImpactDto)
  @Expose({ name: 'environ_impact' })
  environImpact?: EnvironmentalImpactDto[];

  /**
   * Name of the energy supplier, delivering the energy for this location or tariff.
   * These fields can be used to look up energy qualification or to show it directly to the customer
   * (for well-known brands like Greenpeace Energy, etc.)
   */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  @Expose({ name: 'supplier_name' })
  supplierName?: string;

  /**
   * Name of the energy suppliers product/tariff plan used at this location.
   * These fields can be used to look up energy qualification or to show it directly to the customer
   * (for well-known brands like Greenpeace Energy, etc.)
   */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  @Expose({ name: 'energy_product_name' })
  energyProductName?: string;
}