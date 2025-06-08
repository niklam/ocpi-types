import { IsNumber, IsOptional, Min } from 'class-validator';
import { Expose } from 'class-transformer';

/**
 * Price class for OCPI.
 */
export class PriceDto {
  /**
   * Price/Cost excluding VAT.
   */
  @IsNumber({}, {
    message: 'exclVat must be a number',
  })
  @Min(0, {
    message: 'exclVat must be at least 0',
  })
  @Expose({ name: 'excl_vat' })
  exclVat: number;

  /**
   * Price/Cost including VAT.
   */
  @IsOptional()
  @IsNumber({}, {
    message: 'inclVat must be a number',
  })
  @Min(0, {
    message: 'inclVat must be at least 0',
  })
  @Expose({ name: 'incl_vat' })
  inclVat?: number;
}