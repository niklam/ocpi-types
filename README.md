# OCPI Types 2.2.1

[![npm version](https://badge.fury.io/js/ocpi-types-2.2.1.svg)](https://www.npmjs.com/package/ocpi-types-2.2.1)
[![OCPI Version](https://img.shields.io/badge/OCPI-2.2.1-blue.svg)](https://github.com/ocpi/ocpi)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TypeScript DTOs (Data Transfer Objects) and enums for the **OCPI 2.2.1** (Open Charge Point Interface) specification. Perfect for building EV charging applications with type safety and validation.

## ✨ Features

- 🎯 **Complete OCPI 2.2.1 coverage** - All DTOs and enums from the specification
- 🛡️ **Type-safe** - Full TypeScript support with strict typing
- ✅ **Validation ready** - Built with class-validator decorators
- 🔄 **Transformation support** - class-transformer decorators for JSON mapping
- 🏗️ **NestJS compatible** - Works seamlessly with NestJS applications
- 📚 **Well documented** - Comprehensive JSDoc comments
- 🧪 **Thoroughly tested** - Extensive test coverage
- 🚀 **Tree-shakeable** - Import only what you need

## 📦 Installation

```bash
npm install ocpi-types-2.2.1
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
import { LocationDto, ConnectorType, Status } from 'ocpi-types-2.2.1';

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
  ConnectorType,
  ConnectorFormat,
  Status,
  Capability 
} from 'ocpi-types-2.2.1/locations';
```

### 💰 Tariffs
```typescript
import { 
  TariffDto, 
  TariffElementDto,
  PriceComponentDto,
  TariffType,
  TariffDimensionType 
} from 'ocpi-types-2.2.1/tariffs';
```

### 📊 Sessions & CDRs
```typescript
import { 
  SessionDto,
  CdrDto,
  ChargingPeriodDto,
  SessionStatus,
  AuthMethod 
} from 'ocpi-types-2.2.1/sessions';
```

### 🎫 Tokens
```typescript
import { 
  TokenDto,
  AuthorizationInfoDto,
  TokenType,
  AllowedType,
  WhitelistType 
} from 'ocpi-types-2.2.1/tokens';
```

### ⚡ Commands
```typescript
import { 
  StartSessionDto,
  StopSessionDto,
  ReserveNowDto,
  CommandResponseDto,
  CommandType,
  CommandResponseType 
} from 'ocpi-types-2.2.1/commands';
```

### 🔧 Charging Profiles
```typescript
import { 
  ChargingProfileDto,
  ChargingProfilePeriodDto,
  ActiveChargingProfileDto,
  ChargingRateUnit,
  ChargingProfileResponseType 
} from 'ocpi-types-2.2.1/charging-profiles';
```

## 🎯 Usage Examples

### NestJS Controller
```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { LocationDto } from 'ocpi-types-2.2.1';

@Controller('ocpi/2.2.1/locations')
export class LocationsController {
  @Post()
  async createLocation(@Body() locationDto: LocationDto) {
    // locationDto is automatically validated and transformed
    return this.locationsService.create(locationDto);
  }
}
```

### Manual Validation
```typescript
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ConnectorDto, ConnectorType, ConnectorFormat, PowerType } from 'ocpi-types-2.2.1';

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
import { Status, ConnectorType, TariffType } from 'ocpi-types-2.2.1';

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
import { IsOcpiDateTime } from 'ocpi-types-2.2.1/decorators';

class MyDto {
  @IsOcpiDateTime()
  lastUpdated: string; // Must be: 2023-12-07T10:30:00Z
}
```

### @IsOcpiCiString()
Validates OCPI case-insensitive string format.

```typescript
import { IsOcpiCiString } from 'ocpi-types-2.2.1/decorators';

class MyDto {
  @IsOcpiCiString()
  id: string; // Alphanumeric, no spaces or special chars
}
```

### @IsTime()
Validates 24-hour time format (HH:MM).

```typescript
import { IsTime } from 'ocpi-types-2.2.1/decorators';

class MyDto {
  @IsTime()
  startTime: string; // Must be: 09:30, 23:59, etc.
}
```

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
git clone https://github.com/niklam/ocpi-types-2.2.1.git
cd ocpi-types-2.2.1

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

## 📝 Examples & Recipes

Check out our [examples directory](./examples) for common usage patterns:

- 🏢 [Building a Location Service](./examples/location-service.ts)
- 💰 [Tariff Management](./examples/tariff-management.ts)
- 🔌 [Session Handling](./examples/session-handling.ts)
- 🎫 [Token Validation](./examples/token-validation.ts)

## 🆘 Support

- 📖 [Documentation](https://github.com/yourusername/ocpi-types-2.2.1/wiki)
- 🐛 [Report Issues](https://github.com/yourusername/ocpi-types-2.2.1/issues)
- 💬 [Discussions](https://github.com/yourusername/ocpi-types-2.2.1/discussions)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OCPI Forum](https://ocpi-forum.org/) for the excellent specification
- [class-validator](https://github.com/typestack/class-validator) for validation framework
- [class-transformer](https://github.com/typestack/class-transformer) for transformation utilities

---

**Made with ❤️ for the EV charging community**

*If this library helps your project, please consider giving it a ⭐ on GitHub!*