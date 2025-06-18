import { Expose } from 'class-transformer';

// Enum imports
import { ChargingProfileResultType } from '../enums/charging-profile-result-type.enum';

/**
 * The ClearProfileResult object is send by the CPO to the given response_url in a POST request.
 * It contains the result of the DELETE (ClearProfile) request send by the eMSP.
 */
export class ClearProfileResultDto {
  /**
   * The EVSE will indicate if it was able to process the removal of the charging profile (ClearChargingProfile).
   */
  @Expose()
  result: ChargingProfileResultType;
}
