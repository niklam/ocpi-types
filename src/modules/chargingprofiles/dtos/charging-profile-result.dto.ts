// Enum imports
import { ChargingProfileResultType } from '../enums/charging-profile-result-type.enum';

/**
 * The ChargingProfileResult object is send by the CPO to the given response_url in a POST request.
 * It contains the result of the PUT (SetChargingProfile) request send by the eMSP.
 */
export class ChargingProfileResultDto {
  /**
   * The EVSE will indicate if it was able to process the new/updated charging profile.
   */
  result: ChargingProfileResultType;
}