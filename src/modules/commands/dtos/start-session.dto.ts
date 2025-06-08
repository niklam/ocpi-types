import { IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

// DTO imports
import { TokenDto } from '../../tokens/dtos/token.dto';

// Decorator imports
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

/**
 * The StartSession object.
 *
 * The evse_uid is optional. If no EVSE is specified, the Charge Point can itself decide on which EVSE to start a new session.
 * (this might not be supported by all Charge Points).
 *
 * The eMSP provides a Token that has to be used by the Charge Point. The Token provided by the eMSP for the StartSession SHALL be authorized by the eMSP before sending it to the CPO.
 * Therefor the CPO SHALL NOT check the validity of the Token provided before sending the request to the Charge Point.
 *
 * Note: In case of an OCPP 1.x Charge Point, the EVSE ID should be mapped to the connector ID of a Charge Point. OCPP 1.x does not have good support for Charge Points that have multiple connectors per EVSE.
 * To make StartSession over OCPI work, the CPO SHOULD present the different connectors of an EVSE as separate EVSE, as is also written by the OCA in the application note: "Multiple Connectors per EVSE in a OCPP 1.x implementation".
 */
export class StartSessionDto {
  /**
   * URL that the CommandResult POST should be sent to. This URL might contain a unique ID to be able to distinguish between StartSession requests.
   */
  @IsString()
  @Expose({ name: 'response_url' })
  responseUrl: string;

  /**
   * Token object the Charge Point has to use to start a new session. The Token provided in this request is authorized by the eMSP.
   */
  @ValidateNested()
  @Type(() => TokenDto)
  token: TokenDto;

  /**
   * Location.id of the Location (belonging to the CPO this request is sent to) on which a session is to be started.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'location_id' })
  locationId: string;

  /**
   * Optional EVSE.uid of the EVSE of this Location on which a session is to be started. Required when connector_id is set.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'evse_uid' })
  evseUid?: string;

  /**
   * Optional Connector.id of the Connector of the EVSE on which a session is to be started. This field is required when the capability: START_SESSION_CONNECTOR_REQUIRED is set on the EVSE.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'connector_id' })
  connectorId?: string;

  /**
   * Reference to the authorization given by the eMSP, when given, this reference will be provided in the relevant Session and/or CDR.
   */
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'authorization_reference' })
  authorizationReference?: string;
}