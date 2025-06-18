import { IsUrl, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

/**
 * With CancelReservation the Sender can request the Cancel of an existing Reservation.
 * The CancelReservation needs to contain the reservation_id that was given by the Sender to the ReserveNow.
 *
 * As there might be cost involved for a Reservation, canceling a reservation might still result in a CDR being send for the reservation.
 */
export class CancelReservationDto {
  /**
   * URL that the CommandResult POST should be sent to. This URL might contain a unique ID to be able to distinguish between CancelReservation requests.
   */
  @IsUrl(
    {},
    {
      message: 'responseUrl must be a valid URL',
    },
  )
  @Expose({ name: 'response_url' })
  responseUrl: string;

  /**
   * Reservation id, unique for this reservation. If the Charge Point already has a reservation that matches this reservationId the Charge Point will replace the reservation.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'reservation_id' })
  reservationId: string;
}
