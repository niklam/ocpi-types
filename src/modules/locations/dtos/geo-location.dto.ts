import { IsLatitude, IsLongitude, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

/**
 * This class defines the geo location of the Charge Point.
 * The geodetic system to be used is WGS 84.
 *
 * Note: Five decimal places is seen as a minimum for GPS coordinates of the Charge Point
 * as this gives approximately 1 meter precision. More is always better.
 * Seven decimal places gives approximately 1cm precision.
 */
export class GeoLocationDto {
  /**
   * Latitude of the point in decimal degree.
   * Example: 50.770774.
   * Decimal separator: "."
   * Minimum 5 decimal places recommended (≈1m precision).
   * 7 decimal places preferred (≈1cm precision).
   */
  @IsString()
  @IsLatitude({
    message: 'latitude must be a valid latitude coordinate (e.g., 50.770774)',
  })
  @Expose()
  latitude: string;

  /**
   * Longitude of the point in decimal degree.
   * Example: -126.104965.
   * Decimal separator: "."
   * Minimum 5 decimal places recommended (≈1m precision).
   * 7 decimal places preferred (≈1cm precision).
   */
  @IsString()
  @IsLongitude({
    message: 'longitude must be a valid longitude coordinate (e.g., -126.104965)',
  })
  @Expose()
  longitude: string;
}
