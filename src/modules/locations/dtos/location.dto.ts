import { IsArray, IsBoolean, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// DTO imports
import { PublishTokenTypeDto } from './publish-token-type.dto';
import { GeoLocationDto } from './geo-location.dto';
import { AdditionalGeoLocationDto } from './additional-geo-location.dto';
import { EVSEDto } from './EVSEDto';
import { DisplayTextDto } from '../../../dtos/display-text.dto';
import { BusinessDetailsDto } from './business-details.dto';
import { HoursDto } from './hours.dto';
import { ImageDto } from './image.dto';
import { EnergyMixDto } from './energy-mix.dto';

// Enum imports
import { ParkingType } from '../enums/parking-type.enum';
import { Facility } from '../enums/facility.enum';

export class LocationDto {
  @IsOcpiCiString()
  @MinLength(2)
  @MaxLength(2)
  @Expose({ name: 'country_code' })
  countryCode: string;

  @IsOcpiCiString()
  @MinLength(3)
  @MaxLength(3)
  @Expose({ name: 'party_id' })
  partyId: string;

  @IsOcpiCiString()
  @MaxLength(36)
  id: string;

  @IsBoolean()
  publish: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PublishTokenTypeDto)
  @Expose({ name: 'publish_allowed_to' })
  publishAllowedTo?: PublishTokenTypeDto[];

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsString()
  @MaxLength(45)
  address: string;

  @IsString()
  @MaxLength(45)
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  @Expose({ name: 'postal_code' })
  postalCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  state?: string;

  @IsString()
  @MaxLength(3)
  country: string;

  @ValidateNested()
  @Type(() => GeoLocationDto)
  coordinates: GeoLocationDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalGeoLocationDto)
  @Expose({ name: 'related_locations' })
  relatedLocations?: AdditionalGeoLocationDto[];

  @IsOptional()
  @Expose({ name: 'parking_type' })
  parkingType?: ParkingType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EVSEDto)
  evses?: EVSEDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DisplayTextDto)
  directions?: DisplayTextDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => BusinessDetailsDto)
  operator?: BusinessDetailsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BusinessDetailsDto)
  suboperator?: BusinessDetailsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BusinessDetailsDto)
  owner?: BusinessDetailsDto;

  @IsOptional()
  @IsArray()
  facilities?: Facility[];

  @IsString()
  @MaxLength(255)
  @Expose({ name: 'time_zone' })
  timeZone: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HoursDto)
  @Expose({ name: 'opening_times' })
  openingTimes?: HoursDto;

  @IsOptional()
  @IsBoolean()
  @Expose({ name: 'charging_when_closed' })
  chargingWhenClosed?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => EnergyMixDto)
  @Expose({ name: 'energy_mix' })
  energyMix?: EnergyMixDto;

  @IsOcpiDateTime()
  @Expose({ name: 'last_updated' })
  lastUpdated: string;
}