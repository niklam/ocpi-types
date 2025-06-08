import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

// Decorator imports
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

/**
 * The UnlockConnector object.
 */
export class UnlockConnectorDto {
  /**
   * URL that the CommandResult POST should be sent to. This URL might contain a unique ID to be able to distinguish between UnlockConnector requests.
   */
  @IsString()
  @Expose({ name: 'response_url' })
  responseUrl: string;

  /**
   * Location.id of the Location (belonging to the CPO this request is sent to) of which it is requested to unlock the connector.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'location_id' })
  locationId: string;

  /**
   * EVSE.uid of the EVSE of this Location of which it is requested to unlock the connector.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'evse_uid' })
  evseUid: string;

  /**
   * Connector.id of the Connector of this Location of which it is requested to unlock.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'connector_id' })
  connectorId: string;
}