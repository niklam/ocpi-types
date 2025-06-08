import { ValidateNested, IsString } from 'class-validator';
import { Type, Expose } from 'class-transformer';

// DTO imports
import { ChargingProfileDto } from './charging-profile.dto';

/**
 * Object set to a CPO to set a Charging Profile.
 */
export class SetChargingProfileDto {
  /**
   * Contains limits for the available power or current over time.
   */
  @ValidateNested()
  @Type(() => ChargingProfileDto)
  @Expose({ name: 'charging_profile' })
  chargingProfile: ChargingProfileDto;

  /**
   * URL that the ChargingProfileResult POST should be sent to. This URL might contain a unique ID to be able to distinguish between GET ActiveChargingProfile requests.
   */
  @IsString()
  @Expose({ name: 'response_url' })
  responseUrl: string;
}