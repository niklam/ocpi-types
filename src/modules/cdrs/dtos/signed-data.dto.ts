import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// DTO imports
import { SignedValueDto } from './signed-value.dto';

/**
 * This class contains all the information of the signed data. Which encoding method is used, if needed, the public key and a list of signed values.
 */
export class SignedDataDto {
  /**
   * The name of the encoding used in the SignedData field. This is the name given to the encoding by a company or group of companies.
   */
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'encoding_method' })
  encodingMethod: string;

  /**
   * Version of the EncodingMethod (when applicable).
   */
  @IsOptional()
  @IsInt({
    message: 'encodingMethodVersion must be an integer',
  })
  @Expose({ name: 'encoding_method_version' })
  encodingMethodVersion?: number;

  /**
   * Public key used to sign the data, base64 encoded.
   */
  @IsOptional()
  @IsString()
  @MaxLength(512)
  @Expose({ name: 'public_key' })
  publicKey?: string;

  /**
   * One or more signed values.
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SignedValueDto)
  @Expose({ name: 'signed_values' })
  signedValues: SignedValueDto[];

  /**
   * URL that can be shown to an EV driver. This URL gives the EV driver the possibility to check the signed data from a charging session.
   */
  @IsOptional()
  @IsString()
  @MaxLength(512)
  @Expose()
  url?: string;
}
