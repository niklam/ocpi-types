import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// DTO imports
import { DisplayTextDto } from '../../../dtos/display-text.dto';
import { PriceDto } from '../../../dtos/price.dto';
import { TariffElementDto } from './tariff-element.dto';
import { EnergyMixDto } from '../../locations/dtos/energy-mix.dto';

// Enum imports
import { TariffType } from '../enums/tariff-type.enum';

/**
 * A Tariff object consists of a list of one or more Tariff Elements, which in turn consist of Price Components.
 *
 * A Tariff Element is a group of Price Components that apply under the same conditions.
 * The rules for the conditions under which a Tariff Element applies are known as its "restrictions".
 *
 * A Price Component describes how the usage of a particular dimension (time, energy, etcetera) is mapped to an amount of money owed.
 */
export class TariffDto {
  /**
   * ISO-3166 alpha-2 country code of the CPO that owns this Tariff.
   */
  @IsOcpiCiString()
  @MinLength(2)
  @MaxLength(2)
  @Expose({ name: 'country_code' })
  countryCode: string;

  /**
   * ID of the CPO that 'owns' this Tariff (following the ISO-15118 standard).
   */
  @IsOcpiCiString()
  @MinLength(3)
  @MaxLength(3)
  @Expose({ name: 'party_id' })
  partyId: string;

  /**
   * Uniquely identifies the tariff within the CPO's platform (and suboperator platforms).
   */
  @IsOcpiCiString()
  @MaxLength(36)
  id: string;

  /**
   * ISO-4217 code of the currency of this tariff.
   */
  @IsString()
  @MaxLength(3)
  currency: string;

  /**
   * Defines the type of the tariff. This allows for distinction in case of given Charging Preferences.
   * When omitted, this tariff is valid for all sessions.
   */
  @IsOptional()
  type?: TariffType;

  /**
   * List of multi-language alternative tariff info texts.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DisplayTextDto)
  @Expose({ name: 'tariff_alt_text' })
  tariffAltText?: DisplayTextDto[];

  /**
   * URL to a web page that contains an explanation of the tariff information in human readable form.
   */
  @IsOptional()
  @IsUrl({}, {
    message: 'tariffAltUrl must be a valid URL',
  })
  @Expose({ name: 'tariff_alt_url' })
  tariffAltUrl?: string;

  /**
   * When this field is set, a Charging Session with this tariff will at least cost this amount.
   * This is different from a FLAT fee (Start Tariff, Transaction Fee), as a FLAT fee is a fixed amount that has to be paid for any Charging Session.
   * A minimum price indicates that when the cost of a Charging Session is lower than this amount, the cost of the Session will be equal to this amount.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  @Expose({ name: 'min_price' })
  minPrice?: PriceDto;

  /**
   * When this field is set, a Charging Session with this tariff will NOT cost more than this amount.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  @Expose({ name: 'max_price' })
  maxPrice?: PriceDto;

  /**
   * List of Tariff Elements.
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TariffElementDto)
  elements: TariffElementDto[];

  /**
   * The time when this tariff becomes active, in UTC, time_zone field of the Location can be used to convert to local time.
   * Typically used for a new tariff that is already given with the location, before it becomes active.
   */
  @IsOptional()
  @IsOcpiDateTime()
  @Expose({ name: 'start_date_time' })
  startDateTime?: string;

  /**
   * The time after which this tariff is no longer valid, in UTC, time_zone field if the Location can be used to convert to local time.
   * Typically used when this tariff is going to be replaced with a different tariff in the near future.
   */
  @IsOptional()
  @IsOcpiDateTime()
  @Expose({ name: 'end_date_time' })
  endDateTime?: string;

  /**
   * Details on the energy supplied with this tariff.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => EnergyMixDto)
  @Expose({ name: 'energy_mix' })
  energyMix?: EnergyMixDto;

  /**
   * Timestamp when this Tariff was last updated (or created).
   */
  @IsOcpiDateTime()
  @Expose({ name: 'last_updated' })
  lastUpdated: string;
}