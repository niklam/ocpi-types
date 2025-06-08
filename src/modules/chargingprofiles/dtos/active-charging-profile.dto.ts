import { ValidateNested } from 'class-validator';
import { Type, Expose } from 'class-transformer';

// DTO imports
import { ChargingProfileDto } from './charging-profile.dto';

// Decorator imports
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';

/**
 * ActiveChargingProfile class
 */
export class ActiveChargingProfileDto {
  /**
   * Date and time at which the Charge Point has calculated this ActiveChargingProfile. All time measurements within the profile are relative to this timestamp.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'start_date_time' })
  startDateTime: Date;

  /**
   * Charging profile structure defines a list of charging periods.
   */
  @ValidateNested()
  @Type(() => ChargingProfileDto)
  @Expose({ name: 'charging_profile' })
  chargingProfile: ChargingProfileDto;
}