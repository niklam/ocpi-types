import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import { ImageDto } from './image.dto';

export class BusinessDetailsDto {
  @IsString()
  @Length(1, 100)
  @Expose()
  name: string;

  @IsOptional()
  @IsUrl()
  @Expose()
  website?: string;

  @IsOptional()
  @Expose()
  logo?: ImageDto;
}
