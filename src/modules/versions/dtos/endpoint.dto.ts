import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

// Enum imports
import { ModuleID } from '../enums/module-id.enum';
import { InterfaceRole } from '../enums/interface-role.enum';

/**
 * Endpoint class
 *
 * Note: for the credentials module, the value of the role property is not relevant as this module is the same for all roles.
 * It is advised to send "SENDER" as the InterfaceRole for one's own credentials endpoint and to disregard the value of the role property of the Endpoint object for other platforms' credentials modules.
 */
export class EndpointDto {
  /**
   * Endpoint identifier.
   */
  @Expose()
  identifier: ModuleID;

  /**
   * Interface role this endpoint implements.
   */
  @Expose()
  role: InterfaceRole;

  /**
   * URL to the endpoint.
   */
  @IsString()
  @Expose()
  url: string;
}
