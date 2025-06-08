import { IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

// DTO imports
import { TokenDto } from '../../tokens/dtos/token.dto';

// Decorator imports
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

/**
 * The ReserveNow object.
 *
 * The evse_uid is optional. If no EVSE is specified, the Charge Point should keep one EVSE available for the EV Driver identified by the given Token.
 * (This might not be supported by all Charge Points). A reservation can be replaced/updated by sending a RESERVE_NOW request with the same Location (Charge Point) and the same reservation_id.
 *
 * A successful reservation will result in a new Session object being created by the CPO.
 * An unused Reservation of a Charge Point/EVSE MAY result in cost being made, thus also a CDR.
 *
 * The eMSP provides a Token that has to be used by the Charge Point. The Token provided by the eMSP for the ReserveNow SHALL be authorized by the eMSP before sending it to the CPO.
 * Therefor the CPO SHALL NOT check the validity of the Token provided before sending the request to the Charge Point.
 */
export class ReserveNowDto {
  /**
   * URL that the CommandResult POST should be sent to. This URL might contain a unique ID to be able to distinguish between ReserveNow requests.
   */
  @IsString()
  @Expose({ name: 'response_url' })
  responseUrl: string;

  /**
   * Token object for how to reserve this Charge Point (and specific EVSE).
   */
  @ValidateNested()
  @Type(() => TokenDto)
  token: TokenDto;

  /**
   * The Date/Time when this reservation ends, in UTC.
   */
  @IsOcpiDateTime()
  @Expose({ name: 'expiry_date' })
  expiryDate: Date;

  /**
   * Reservation id, unique for this reservation. If the Receiver (typically CPO) Point already has a reservation that matches this reservationId for that Location it will replace the reservation.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'reservation_id' })
  reservationId: string;

  /**
   * Location.id of the Location (belonging to the CPO this request is sent to) for which to reserve an EVSE.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'location_id' })
  locationId: string;

  /**
   * Optional EVSE.uid of the EVSE of this Location if a specific EVSE has to be reserved.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'evse_uid' })
  evseUid?: string;

  /**
   * Reference to the authorization given by the eMSP, when given, this reference will be provided in the relevant Session and/or CDR.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'authorization_reference' })
  authorizationReference?: string;
}