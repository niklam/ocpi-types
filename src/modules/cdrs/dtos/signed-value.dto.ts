import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

/**
 * This class contains the signed and the plain/unsigned data. By decoding the data, the receiver can check if the content has not been altered.
 */
export class SignedValueDto {
  /**
   * Nature of the value, in other words, the event this value belongs to.
   * Possible values at moment of writing:
   * - Start (value at the start of the Session)
   * - End (signed value at the end of the Session)
   * - Intermediate (signed values take during the Session, after Start, before End)
   * Others might be added later.
   */
  @IsOcpiCiString()
  @MaxLength(32)
  @Expose()
  nature: string;

  /**
   * The un-encoded string of data. The format of the content depends on the EncodingMethod field.
   */
  @IsString()
  @MaxLength(512)
  @Expose({ name: 'plain_data' })
  plainData: string;

  /**
   * Blob of signed data, base64 encoded. The format of the content depends on the EncodingMethod field.
   */
  @IsString()
  @MaxLength(5000)
  @Expose({ name: 'signed_data' })
  signedData: string;
}
