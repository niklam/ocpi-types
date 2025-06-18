import { IsArray, IsOptional, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

/**
 * References to location details.
 */
export class LocationReferencesDto {
  /**
   * Unique identifier for the location.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'location_id' })
  locationId: string;

  /**
   * Unique identifiers for EVSEs within the CPO's platform for the EVSE within the given location.
   */
  @IsOptional()
  @IsArray()
  @IsOcpiCiString({ each: true })
  @Expose({ name: 'evse_uids' })
  evseUids?: string[];
}
