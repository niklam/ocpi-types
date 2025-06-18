import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EVSEDto } from './EVSEDto';
import { GeoLocationDto } from './geo-location.dto';
import { DisplayTextDto } from '../../../dtos/display-text.dto';
import { ImageDto } from './image.dto';
import { Status } from '../enums/status.enum';
import { Capability } from '../enums/capability.enum';
import { ParkingRestriction } from '../enums/parking-restriction.enum';
import { ConnectorType } from '../enums/connector-type.enum';
import { ConnectorFormat } from '../enums/connector-format.enum';
import { PowerType } from '../enums/power-type.enum';

describe('EVSEDto', () => {
  const createValidConnector = (): any => ({
    id: 'CONN001',
    standard: ConnectorType.IEC_62196_T2,
    format: ConnectorFormat.SOCKET,
    power_type: PowerType.AC_3_PHASE,
    max_voltage: 400,
    max_amperage: 32,
    last_updated: '2023-12-07T10:30:00Z',
  });

  describe('Valid cases', () => {
    it('should validate with all required properties', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.uid).toBe('EVSE001');
      expect(dto.connectors).toHaveLength(1);
      expect(dto.lastUpdated).toBe('2023-12-07T10:30:00Z');
    });

    it('should validate with all properties including optional ones', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        evse_id: 'DE*GEF*E123456*1',
        status: Status.AVAILABLE,
        status_schedule: [
          { period_begin: '2023-12-07T00:00:00Z', period_end: '2023-12-07T23:59:59Z', status: Status.AVAILABLE },
        ],
        capabilities: [Capability.CHARGING_PROFILE_CAPABLE, Capability.REMOTE_START_STOP_CAPABLE],
        connectors: [createValidConnector()],
        floor_level: 'P1',
        coordinates: { latitude: '52.520008', longitude: '13.404954' },
        physical_reference: 'Bay 1',
        directions: [{ language: 'en', text: 'Enter from main entrance' }],
        parking_restrictions: [ParkingRestriction.EV_ONLY],
        images: [
          {
            url: 'https://example.com/image.jpg',
            category: 'CHARGER',
            type: 'jpeg',
            thumbnail: 'https://example.com/thumb.jpg',
            width: 800,
            height: 600,
          },
        ],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.evseId).toBe('DE*GEF*E123456*1');
      expect(dto.status).toBe(Status.AVAILABLE);
      expect(dto.statusSchedule).toHaveLength(1);
      expect(dto.capabilities).toHaveLength(2);
      expect(dto.floorLevel).toBe('P1');
      expect(dto.physicalReference).toBe('Bay 1');
      expect(dto.parkingRestrictions).toHaveLength(1);
    });

    it('should validate with multiple connectors', async () => {
      const connector1 = createValidConnector();
      const connector2 = { ...createValidConnector(), id: 'CONN002' };

      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [connector1, connector2],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.connectors).toHaveLength(2);
    });
  });

  describe('UID validation', () => {
    it('should fail when uid is missing', async () => {
      const dto = plainToInstance(EVSEDto, {
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const uidError = errors.find((e) => e.property === 'uid');
      expect(uidError).toBeDefined();
    });

    it('should fail when uid exceeds maximum length (36 characters)', async () => {
      const longUid = 'A'.repeat(37); // 37 characters
      const dto = plainToInstance(EVSEDto, {
        uid: longUid,
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const uidError = errors.find((e) => e.property === 'uid');
      expect(uidError).toBeDefined();
      expect(uidError?.constraints?.maxLength).toBeDefined();
    });

    it('should validate with maximum allowed uid length', async () => {
      const maxLengthUid = 'A'.repeat(36); // Exactly 36 characters
      const dto = plainToInstance(EVSEDto, {
        uid: maxLengthUid,
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Optional evseId validation', () => {
    it('should validate when evseId is not provided', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.evseId).toBeUndefined();
    });

    it('should fail when evseId exceeds maximum length (48 characters)', async () => {
      const longEvseId = 'A'.repeat(49); // 49 characters
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        evse_id: longEvseId,
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const evseIdError = errors.find((e) => e.property === 'evseId');
      expect(evseIdError).toBeDefined();
      expect(evseIdError?.constraints?.maxLength).toBeDefined();
    });

    it('should validate with maximum allowed evseId length', async () => {
      const maxLengthEvseId = 'A'.repeat(48); // Exactly 48 characters
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        evse_id: maxLengthEvseId,
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Connectors validation', () => {
    it('should fail when connectors array is empty', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const connectorsError = errors.find((e) => e.property === 'connectors');
      expect(connectorsError).toBeDefined();
      expect(connectorsError?.constraints?.arrayMinSize).toBeDefined();
    });

    it('should fail when connectors is missing', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const connectorsError = errors.find((e) => e.property === 'connectors');
      expect(connectorsError).toBeDefined();
    });

    it('should fail when connectors contains invalid ConnectorDto', async () => {
      const invalidConnector = {
        // Missing required fields
        id: '',
        max_voltage: 0, // Invalid
        max_amperage: 0, // Invalid
      };

      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [invalidConnector],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const connectorsError = errors.find((e) => e.property === 'connectors');
      expect(connectorsError).toBeDefined();
    });

    it('should fail when connectors is not an array', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: 'not-an-array',
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const connectorsError = errors.find((e) => e.property === 'connectors');
      expect(connectorsError).toBeDefined();
      expect(connectorsError?.constraints?.isArray).toBeDefined();
    });
  });

  describe('Optional floorLevel validation', () => {
    it('should validate when floorLevel is not provided', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.floorLevel).toBeUndefined();
    });

    it('should fail when floorLevel exceeds maximum length (4 characters)', async () => {
      const longFloorLevel = 'FLOOR'; // 5 characters
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        floor_level: longFloorLevel,
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const floorError = errors.find((e) => e.property === 'floorLevel');
      expect(floorError).toBeDefined();
      expect(floorError?.constraints?.maxLength).toBeDefined();
    });

    it('should validate with maximum allowed floorLevel length', async () => {
      const maxLengthFloor = 'P123'; // Exactly 4 characters
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        floor_level: maxLengthFloor,
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail when floorLevel is not a string', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        floor_level: 123,
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const floorError = errors.find((e) => e.property === 'floorLevel');
      expect(floorError).toBeDefined();
      expect(floorError?.constraints?.isString).toBeDefined();
    });
  });

  describe('Optional physicalReference validation', () => {
    it('should validate when physicalReference is not provided', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.physicalReference).toBeUndefined();
    });

    it('should fail when physicalReference exceeds maximum length (16 characters)', async () => {
      const longPhysicalRef = 'A'.repeat(17); // 17 characters
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        physical_reference: longPhysicalRef,
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const physicalRefError = errors.find((e) => e.property === 'physicalReference');
      expect(physicalRefError).toBeDefined();
      expect(physicalRefError?.constraints?.maxLength).toBeDefined();
    });

    it('should validate with maximum allowed physicalReference length', async () => {
      const maxLengthRef = 'A'.repeat(16); // Exactly 16 characters
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        physical_reference: maxLengthRef,
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Optional coordinates validation', () => {
    it('should validate when coordinates is not provided', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.coordinates).toBeUndefined();
    });

    it('should validate with valid GeoLocationDto', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        coordinates: { latitude: '52.520008', longitude: '13.404954' },
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.coordinates).toBeInstanceOf(GeoLocationDto);
    });

    it('should fail when coordinates has invalid GeoLocationDto structure', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        coordinates: { latitude: 'invalid', longitude: 'invalid' },
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const coordinatesError = errors.find((e) => e.property === 'coordinates');
      expect(coordinatesError).toBeDefined();
    });
  });

  describe('Optional directions validation', () => {
    it('should validate when directions is not provided', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.directions).toBeUndefined();
    });

    it('should validate with valid DisplayTextDto array', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        directions: [
          { language: 'en', text: 'Enter from main entrance' },
          { language: 'de', text: 'Eingang vom Haupteingang' },
        ],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.directions).toHaveLength(2);
      expect(dto.directions?.[0]).toBeInstanceOf(DisplayTextDto);
    });

    it('should fail when directions contains invalid DisplayTextDto', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        directions: [{ language: 'en', text: 'Valid direction' }, { invalidProperty: 'invalid' }],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const directionsError = errors.find((e) => e.property === 'directions');
      expect(directionsError).toBeDefined();
    });

    it('should fail when directions is not an array', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        directions: 'not-an-array',
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const directionsError = errors.find((e) => e.property === 'directions');
      expect(directionsError).toBeDefined();
      expect(directionsError?.constraints?.isArray).toBeDefined();
    });
  });

  describe('Optional images validation', () => {
    it('should validate when images is not provided', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.images).toBeUndefined();
    });

    it('should validate with valid ImageDto array', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        images: [
          {
            url: 'https://example.com/image1.jpg',
            category: 'CHARGER',
            type: 'jpeg',
            thumbnail: 'https://example.com/thumb1.jpg',
            width: 800,
            height: 600,
          },
        ],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.images).toHaveLength(1);
      expect(dto.images?.[0]).toBeInstanceOf(ImageDto);
    });

    it('should fail when images contains invalid ImageDto', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
        images: [{ invalidProperty: 'invalid' }],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const imagesError = errors.find((e) => e.property === 'images');
      expect(imagesError).toBeDefined();
    });
  });

  describe('lastUpdated validation', () => {
    it('should fail when lastUpdated is missing', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        connectors: [createValidConnector()],
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const lastUpdatedError = errors.find((e) => e.property === 'lastUpdated');
      expect(lastUpdatedError).toBeDefined();
    });

    it('should fail with invalid OCPI DateTime format', async () => {
      const invalidDateTimes = ['invalid-date', '2023-12-07', '10:30:00', '2023/12/07 10:30:00', ''];

      for (const dateTime of invalidDateTimes) {
        const dto = plainToInstance(EVSEDto, {
          uid: 'EVSE001',
          connectors: [createValidConnector()],
          last_updated: dateTime,
        });

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        const dateTimeError = errors.find((e) => e.property === 'lastUpdated');
        expect(dateTimeError).toBeDefined();
      }
    });
  });

  describe('Class transformation (@Expose decorator)', () => {
    it('should properly transform all exposed properties', () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        evse_id: 'DE*GEF*E123456*1',
        status_schedule: [],
        floor_level: 'P1',
        physical_reference: 'Bay 1',
        parking_restrictions: [ParkingRestriction.EV_ONLY],
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      expect(dto.evseId).toBe('DE*GEF*E123456*1');
      expect(dto.statusSchedule).toEqual([]);
      expect(dto.floorLevel).toBe('P1');
      expect(dto.physicalReference).toBe('Bay 1');
      expect(dto.parkingRestrictions).toEqual([ParkingRestriction.EV_ONLY]);
      expect(dto.lastUpdated).toBe('2023-12-07T10:30:00Z');
    });
  });

  describe('Multiple validation errors', () => {
    it('should return multiple errors when multiple fields are invalid', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'foobar',
        evse_id: 'A'.repeat(50), // Too long
        connectors: [], // Empty array
        floor_level: 'TOOLONG', // Too long
        physical_reference: 'A'.repeat(20), // Too long
        last_updated: 'invalid-date',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);

      const properties = errors.map((error) => error.property);
      expect(properties).toContain('evseId');
      expect(properties).toContain('connectors');
      expect(properties).toContain('floorLevel');
      expect(properties).toContain('physicalReference');
      expect(properties).toContain('lastUpdated');
    });

    it('should return all errors when all required fields are missing', async () => {
      const dto = plainToInstance(EVSEDto, {});

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);

      const properties = errors.map((error) => error.property);
      expect(properties).toContain('uid');
      expect(properties).toContain('connectors');
      expect(properties).toContain('lastUpdated');
    });
  });

  describe('Edge cases', () => {
    it('should validate with minimum required data', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'E',
        connectors: [createValidConnector()],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate with maximum allowed field lengths', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'A'.repeat(36),
        evse_id: 'B'.repeat(48),
        connectors: [createValidConnector()],
        floor_level: 'C'.repeat(4),
        physical_reference: 'D'.repeat(16),
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate complex EVSE with all optional features', async () => {
      const dto = plainToInstance(EVSEDto, {
        uid: 'EVSE001',
        evse_id: 'DE*GEF*E123456*1',
        status: Status.AVAILABLE,
        status_schedule: [
          { period_begin: '2023-12-07T00:00:00Z', period_end: '2023-12-07T23:59:59Z', status: Status.AVAILABLE },
        ],
        capabilities: [
          Capability.CHARGING_PROFILE_CAPABLE,
          Capability.REMOTE_START_STOP_CAPABLE,
          Capability.RFID_READER,
        ],
        connectors: [createValidConnector(), { ...createValidConnector(), id: 'CONN002' }],
        floor_level: 'P1',
        coordinates: { latitude: '52.520008', longitude: '13.404954' },
        physical_reference: 'Bay 1',
        directions: [
          { language: 'en', text: 'Enter from main entrance, turn left' },
          { language: 'de', text: 'Eingang vom Haupteingang, links abbiegen' },
        ],
        parking_restrictions: [ParkingRestriction.EV_ONLY, ParkingRestriction.PLUGGED],
        images: [
          {
            url: 'https://example.com/charger.jpg',
            category: 'CHARGER',
            type: 'jpeg',
            thumbnail: 'https://example.com/charger-thumb.jpg',
            width: 1024,
            height: 768,
          },
          {
            url: 'https://example.com/location.jpg',
            category: 'LOCATION',
            type: 'jpeg',
            thumbnail: 'https://example.com/location-thumb.jpg',
            width: 800,
            height: 600,
          },
        ],
        last_updated: '2023-12-07T10:30:00Z',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.capabilities).toHaveLength(3);
      expect(dto.connectors).toHaveLength(2);
      expect(dto.directions).toHaveLength(2);
      expect(dto.parkingRestrictions).toHaveLength(2);
      expect(dto.images).toHaveLength(2);
    });
  });
});
