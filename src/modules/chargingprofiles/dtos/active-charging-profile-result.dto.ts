import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// DTO imports
import { ActiveChargingProfileDto } from './active-charging-profile.dto';

// Enum imports
import { ChargingProfileResultType } from '../enums/charging-profile-result-type.enum';

/**
 * The ActiveChargingProfileResult object is send by the CPO to the given response_url in a POST request.
 * It contains the result of the GET (ActiveChargingProfile) request send by the eMSP.
 */
export class ActiveChargingProfileResultDto {
  /**
   * The EVSE will indicate if it was able to process the request for the ActiveChargingProfile
   */
  result: ChargingProfileResultType;

  /**
   * The requested ActiveChargingProfile, if the result field is set to: ACCEPTED
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => ActiveChargingProfileDto)
  profile?: ActiveChargingProfileDto;
}