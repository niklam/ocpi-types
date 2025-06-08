import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

/**
 * Information about a energy contract that belongs to a Token so a driver could use his/her own energy contract when charging at a Charge Point.
 */
export class EnergyContractDto {
  /**
   * Name of the energy supplier for this token.
   */
  @IsString()
  @MaxLength(64)
  @Expose({ name: 'supplier_name' })
  supplierName: string;

  /**
   * Contract ID at the energy supplier, that belongs to the owner of this token.
   */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  @Expose({ name: 'contract_id' })
  contractId?: string;
}