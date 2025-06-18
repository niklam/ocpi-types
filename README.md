# OCPI Types

[![npm version](https://badge.fury.io/js/ocpi-types.svg)](https://www.npmjs.com/package/ocpi-types)
[![OCPI Version](https://img.shields.io/badge/OCPI-2.2.1-blue.svg)](https://github.com/ocpi/ocpi)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TypeScript DTOs (Data Transfer Objects) and enums for the **OCPI 2.2.1** (Open Charge Point Interface) specification. Perfect for building EV charging applications with type safety and validation.

## ✨ Features

- 🎯 **Complete OCPI 2.2.1 coverage** - All DTOs and enums from the specification
- 🛡️ **Type-safe** - Full TypeScript support with strict typing
- ✅ **Validation ready** - Built with class-validator decorators
- 🔄 **Consistent serialization** - Explicit @Expose() decorators on all fields
- 🏗️ **Enhanced response system** - Class-based response types for better instantiation
- 🏗️ **NestJS compatible** - Works seamlessly with NestJS applications
- 📚 **Well documented** - Comprehensive JSDoc comments
- 🧪 **Thoroughly tested** - Extensive test coverage
- 🚀 **Tree-shakeable** - Import only what you need

## 📦 Installation

```bash
npm install ocpi-types
```

**Peer dependencies:**
```bash
npm install class-validator class-transformer reflect-metadata
```

## 🚀 Quick Start

**Important: Import reflect-metadata first!**

```typescript
import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LocationDto, ConnectorType, Status } from 'ocpi-types/locations';

// Create and validate a location
const locationData = {
  country_code: 'DE',
  party_id: 'GEF',
  id: 'LOC001',
  publish: true,
  name: 'Charging Station Downtown',
  address: 'Main Street 1',
  city: 'Berlin',
  postal_code: '10115',
  country: 'DEU',
  time_zone: 'Europe/Berlin',
  coordinates: {
    latitude: '52.520008',
    longitude: '13.404954'
  },
  last_updated: '2023-12-07T10:30:00Z'
};

const location = plainToInstance(LocationDto, locationData);
const errors = await validate(location);

if (errors.length === 0) {
  console.log('✅ Valid OCPI location!');
} else {
  console.log('❌ Validation errors:', errors);
}
```

## 📋 Available Modules

### 🏢 Locations
```typescript
import {
  LocationDto,
  EVSEDto,
  ConnectorDto,
  GeoLocationDto,
  BusinessDetailsDto,
  EnergyMixDto,
  EnergySourceDto,
  EnvironmentalImpactDto,
  AdditionalGeoLocationDto,
  StatusScheduleDto,
  RegularHoursDto,
  ImageDto,
  PublishTokenTypeDto,
  HoursDto,
  ExceptionalPeriodDto,
  ConnectorType,
  ConnectorFormat,
  Status,
  Capability,
  PowerType,
  EnergySourceCategory,
  Facility,
  EnvironmentalImpactCategory,
  ParkingType,
  ImageCategory,
  ParkingRestriction
} from 'ocpi-types/locations';
```

### 💰 Tariffs
```typescript
import { 
  TariffDto, 
  TariffElementDto,
  PriceComponentDto,
  TariffRestrictionsDto,
  TariffType,
  TariffDimensionType,
  DayOfWeekEnum,
  ReservationRestrictionTypeEnum
} from 'ocpi-types/tariffs';
```

### 📊 Sessions & CDRs
```typescript
// Sessions
import { 
  SessionDto,
  ChargingPreferencesDto,
  SessionStatus,
  ProfileType,
  ChargingPreferencesResponse
} from 'ocpi-types/sessions';

// CDRs
import { 
  CdrDto,
  ChargingPeriodDto,
  SignedValueDto,
  CdrLocationDto,
  SignedDataDto,
  CdrDimensionDto,
  CdrTokenDto,
  AuthMethod,
  CdrDimensionType
} from 'ocpi-types/cdrs';
```

### 🎫 Tokens
```typescript
import { 
  TokenDto,
  AuthorizationInfoDto,
  LocationReferencesDto,
  EnergyContractDto,
  TokenType,
  AllowedType,
  WhitelistType
} from 'ocpi-types/tokens';
```

### ⚡ Commands
```typescript
import { 
  StartSessionDto,
  StopSessionDto,
  ReserveNowDto,
  UnlockConnectorDto,
  CancelReservationDto,
  CommandResultDto,
  CommandResponseDto,
  CommandType,
  CommandResultType,
  CommandResponseType
} from 'ocpi-types/commands';
```

### 🔧 Charging Profiles
```typescript
import { 
  ChargingProfileDto,
  ChargingProfilePeriodDto,
  ActiveChargingProfileDto,
  ActiveChargingProfileResultDto,
  ChargingProfileResponseDto,
  ChargingProfileResultDto,
  ClearProfileResultDto,
  SetChargingProfileDto,
  ChargingRateUnit,
  ChargingProfileResponseType,
  ChargingProfileResultType
} from 'ocpi-types/charging-profiles';
```

### 🌐 Versions & Hub Client Info
```typescript
// Versions
import {
  EndpointDto,
  VersionNumber,
  ModuleId,
  InterfaceRole
} from 'ocpi-types/versions';

// Hub Client Info
import {
  ClientInfoDto,
  ConnectionStatus
} from 'ocpi-types/hubclientinfo';
```

### 🔑 Credentials
```typescript
import {
  CredentialsDto,
  CredentialsRoleDto
} from 'ocpi-types/credentials';
```

### 🛠️ Common DTOs & Enums
```typescript
// Common DTOs
import {
  DisplayTextDto,
  PriceDto
} from 'ocpi-types';

// Common Enums
import {
  Role
} from 'ocpi-types';
```

### 📤 OCPI Response System
```typescript
// Response classes (v2.0.0+)
import {
  OcpiResponse,
  OcpiSingleResponse,
  OcpiListResponse,
  OcpiEmptyResponse,
  OcpiErrorResponse,
  OcpiResponseBuilder
} from 'ocpi-types';

// Create responses using the builder (recommended)
const successResponse = OcpiResponseBuilder.success(data, 'Operation successful');
const emptyResponse = OcpiResponseBuilder.successEmpty('No content');
const errorResponse = OcpiResponseBuilder.error(2001, 'Invalid parameters');

// Or instantiate classes directly
const customResponse = new OcpiResponse<LocationDto>();
customResponse.data = locationData;
customResponse.statusCode = 1000;
customResponse.timestamp = new Date().toISOString();
```

### 🎨 Custom Decorators
```typescript
import {
  IsOcpiDateTime,
  IsOcpiCiString,
  IsTime
} from 'ocpi-types/decorators';
```

## 🎯 Usage Examples

### NestJS Controller with OCPI Responses
```typescript
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LocationDto } from 'ocpi-types/locations';
import { OcpiResponseBuilder, OcpiSingleResponse, OcpiListResponse } from 'ocpi-types';

@Controller('ocpi/2.2.1/locations')
export class LocationsController {
  @Post()
  async createLocation(@Body() locationDto: LocationDto): Promise<OcpiSingleResponse<LocationDto>> {
    try {
      const location = await this.locationsService.create(locationDto);
      return OcpiResponseBuilder.success(location, 'Location created successfully');
    } catch (error) {
      return OcpiResponseBuilder.error(2001, 'Failed to create location');
    }
  }

  @Get()
  async getLocations(): Promise<OcpiListResponse<LocationDto>> {
    const locations = await this.locationsService.findAll();
    return OcpiResponseBuilder.success(locations, 'Locations retrieved successfully');
  }
}
```

### Manual Validation
```typescript
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ConnectorDto, ConnectorType, ConnectorFormat, PowerType } from 'ocpi-types/locations';

const connectorData = {
  id: 'CONN001',
  standard: ConnectorType.IEC_62196_T2,
  format: ConnectorFormat.SOCKET,
  power_type: PowerType.AC_3_PHASE,
  max_voltage: 400,
  max_amperage: 32,
  last_updated: '2023-12-07T10:30:00Z'
};

const connector = plainToInstance(ConnectorDto, connectorData);
const errors = await validate(connector);

if (errors.length === 0) {
  console.log('Valid connector:', connector);
}
```

### Working with Enums
```typescript
import { Status, ConnectorType } from 'ocpi-types/locations';
import { TariffType } from 'ocpi-types/tariff';

// Type-safe enum usage
const connectorType: ConnectorType = ConnectorType.IEC_62196_T2;
const status: Status = Status.AVAILABLE;
const tariffType: TariffType = TariffType.REGULAR;

// Get all available values
console.log('Available connector types:', Object.values(ConnectorType));
```

## 🏗️ Custom Decorators

This library includes custom validation decorators for OCPI-specific formats:

### @IsOcpiDateTime()
Validates OCPI datetime format (ISO 8601 with timezone).

```typescript
import { IsOcpiDateTime } from 'ocpi-types/decorators';

class MyDto {
  @IsOcpiDateTime()
  lastUpdated: string; // Must be: 2023-12-07T10:30:00Z
}
```

### @IsOcpiCiString()
Validates OCPI case-insensitive string format.

```typescript
import { IsOcpiCiString } from 'ocpi-types/decorators';

class MyDto {
  @IsOcpiCiString()
  id: string; // Alphanumeric, no spaces or special chars
}
```

### @IsTime()
Validates 24-hour time format (HH:MM).

```typescript
import { IsTime } from 'ocpi-types/decorators';

class MyDto {
  @IsTime()
  startTime: string; // Must be: 09:30, 23:59, etc.
}
```

### Consistent Serialization (v2.0.0+)
```typescript
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { LocationDto } from 'ocpi-types/locations';

// All DTOs now have explicit @Expose() decorators
// Serialization is consistent regardless of configuration
const locationData = {
  country_code: 'DE',
  party_id: 'GEF',
  id: 'LOC001',
  // ... other fields
};

const location = plainToInstance(LocationDto, locationData);
const serialized = instanceToPlain(location);

// Always produces consistent snake_case output:
// {
//   "country_code": "DE",
//   "party_id": "GEF",
//   "id": "LOC001",
//   ...
// }
```

## 🔄 Migration from v1.x to v2.0.0

### Breaking Changes
**OcpiResponse is now a class** (was interface):
```typescript
// ❌ v1.x - Interface usage
const response: OcpiResponse<Data> = {
  data: myData,
  status_code: 1000,
  timestamp: new Date().toISOString()
};

// ✅ v2.0.0 - Class usage (recommended)
const response = OcpiResponseBuilder.success(myData);

// ✅ v2.0.0 - Direct instantiation
const response = new OcpiResponse<Data>();
response.data = myData;
response.statusCode = 1000;
response.timestamp = new Date().toISOString();
```

**Response types are now classes** (were type aliases):
```typescript
// ❌ v1.x - Plain object
const errorResponse: OcpiErrorResponse = {
  status_code: 2001,
  status_message: 'Invalid data',
  timestamp: new Date().toISOString()
};

// ✅ v2.0.0 - Class instantiation
const errorResponse = new OcpiErrorResponse();
// OR (recommended)
const errorResponse = OcpiResponseBuilder.error(2001, 'Invalid data');
```

### No Action Required For:
- ✅ **DTO usage** - All DTOs work exactly the same
- ✅ **Validation** - All validation decorators unchanged
- ✅ **Serialization** - Output format is identical (now more consistent)
- ✅ **Imports** - All import paths remain the same

## 🔧 Configuration

### Jest Testing Setup
Add to your `jest.config.js` or `package.json`:

```json
{
  "jest": {
    "setupFiles": ["reflect-metadata/Reflect"]
  }
}
```

### TypeScript Configuration
Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "nodenext",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 📖 OCPI Specification

This library implements the **OCPI 2.2.1** specification. For detailed information about the protocol, visit:

- 📄 [Official OCPI Documentation](https://github.com/ocpi/ocpi)
- 🔗 [OCPI 2.2.1 Specification](https://github.com/ocpi/ocpi/releases/tag/2.2.1)

### Supported OCPI Modules

| Module | Status | Description |
|--------|--------|-------------|
| ✅ Locations | Complete | Charge point locations and their details |
| ✅ Sessions | Complete | Charging session information |
| ✅ CDRs | Complete | Charge detail records |
| ✅ Tariffs | Complete | Pricing information |
| ✅ Tokens | Complete | Authentication tokens |
| ✅ Commands | Complete | Remote commands (start/stop/reserve) |
| ✅ Charging Profiles | Complete | Smart charging profiles |
| ✅ Hub Client Info | Complete | Hub connection information |
| ✅ Credentials | Complete | Platform credentials |
| ✅ Versions | Complete | Supported OCPI versions |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/niklam/ocpi-types.git
cd ocpi-types

# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Run linting
npm run lint
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🆘 Support

- 📖 [Documentation](https://github.com/niklam/ocpi-types/wiki)
- 🐛 [Report Issues](https://github.com/niklam/ocpi-types/issues)

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OCPI Forum](https://ocpi-forum.org/) for the excellent specification
- [class-validator](https://github.com/typestack/class-validator) for validation framework
- [class-transformer](https://github.com/typestack/class-transformer) for transformation utilities

---

**Made with ❤️ for the EV charging community**

*If this library helps your project, please consider giving it a ⭐ on GitHub!*