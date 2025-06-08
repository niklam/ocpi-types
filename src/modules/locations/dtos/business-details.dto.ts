import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { ImageDto } from './image.dto';

export class BusinessDetailsDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  logo?: ImageDto;
}
