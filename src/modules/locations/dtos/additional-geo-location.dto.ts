import { IsLatitude, IsLongitude, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DisplayTextDto } from '../../../dtos/display-text.dto';
import { Type } from 'class-transformer';

/**
 * This class defines an additional geolocation that is relevant for the Charge Point.
 * The geodetic system to be used is WGS 84.
 */
export class AdditionalGeoLocationDto {
  /**
   * Latitude of the point in decimal degree.
   * Example: 50.770774.
   * Decimal separator: "."
   */
  @IsString()
  @IsLatitude({
    message: 'latitude must be a valid latitude coordinate (e.g., 50.770774)',
  })
  latitude: string;

  /**
   * Longitude of the point in decimal degree.
   * Example: -126.104965.
   * Decimal separator: "."
   */
  @IsString()
  @IsLongitude({
    message: 'longitude must be a valid longitude coordinate (e.g., -126.104965)',
  })
  longitude: string;

  /**
   * Name of the point in local language or as written at the location.
   * For example the street name of a parking lot entrance or it's number.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => DisplayTextDto)
  name?: DisplayTextDto;
}