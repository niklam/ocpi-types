import { ArrayMinSize, IsArray, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';

// DTO imports
import { ConnectorDto } from './connector.dto';
import { DisplayTextDto } from '../../../dtos/display-text.dto';
import { StatusScheduleDto } from './status-schedule.dto';
import { GeoLocationDto } from './geo-location.dto';
import { ImageDto } from './image.dto';

// Enum imports
import { Status } from '../enums/status.enum';
import { Capability } from '../enums/capability.enum';
import { ParkingRestriction } from '../enums/parking-restriction.enum';

export class EVSEDto {
  @IsOcpiCiString()
  @MaxLength(36)
  @Expose()
  uid: string;

  @IsOptional()
  @IsOcpiCiString()
  @MaxLength(48)
  @Expose({ name: 'evse_id' })
  evseId?: string;

  @IsOptional()
  @Expose()
  status: Status;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatusScheduleDto)
  @Expose({ name: 'status_schedule' })
  statusSchedule?: StatusScheduleDto[];

  @IsOptional()
  @IsArray()
  @Expose()
  capabilities?: Capability[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ConnectorDto)
  @Expose()
  connectors: ConnectorDto[];

  @IsOptional()
  @IsString()
  @MaxLength(4)
  @Expose({ name: 'floor_level' })
  floorLevel?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => GeoLocationDto)
  @Expose()
  coordinates?: GeoLocationDto;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  @Expose({ name: 'physical_reference' })
  physicalReference?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DisplayTextDto)
  @Expose()
  directions?: DisplayTextDto[];

  @IsOptional()
  @IsArray()
  @Expose({ name: 'parking_restrictions' })
  parkingRestrictions?: ParkingRestriction[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  @Expose()
  images?: ImageDto[];

  @IsOcpiDateTime()
  @Expose({ name: 'last_updated' })
  lastUpdated: string;
}
