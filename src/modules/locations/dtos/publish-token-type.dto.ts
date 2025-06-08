import { IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';
import { TokenType } from '../../tokens/enums/token-type.enum';

export class PublishTokenTypeDto {
  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  uid?: string;

  @ValidateIf((o: PublishTokenTypeDto) => o.uid !== undefined && o.uid !== null && o.uid !== '')
  @IsOptional()
  type?: TokenType;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  @Expose({ name: 'visual_number' })
  visualNumber?: string;

  @ValidateIf((o: PublishTokenTypeDto) => o.visualNumber !== undefined && o.visualNumber !== null && o.visualNumber !== '')
  @IsOptional()
  @IsString()
  @MaxLength(64)
  issuer?: string;

  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose({ name: 'group_id' })
  groupId?: string;
}