import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AdditionalGeoLocationDto } from './additional-geo-location.dto';
import { DisplayTextDto } from '../../../dtos/display-text.dto';

describe('AdditionalGeoLocationDto', () => {
  describe('Valid cases', () => {
    it('should validate with all valid required properties', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.770774',
        longitude: '-126.104965',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.latitude).toBe('50.770774');
      expect(dto.longitude).toBe('-126.104965');
    });

    it('should validate with valid properties including optional name', async () => {
      const nameDto = new DisplayTextDto();
      nameDto.language = 'en';
      nameDto.text = 'Main Entrance';

      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.770774',
        longitude: '-126.104965',
        name: nameDto,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.name).toBeDefined();
    });

    it('should validate with boundary latitude values', async () => {
      const validLatitudes = ['90', '-90', '0', '45.123456', '-45.123456'];

      for (const lat of validLatitudes) {
        const dto = plainToInstance(AdditionalGeoLocationDto, {
          latitude: lat,
          longitude: '0',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(0);
      }
    });

    it('should validate with boundary longitude values', async () => {
      const validLongitudes = ['180', '-180', '0', '90.123456', '-90.123456'];

      for (const lng of validLongitudes) {
        const dto = plainToInstance(AdditionalGeoLocationDto, {
          latitude: '0',
          longitude: lng,
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(0);
      }
    });
  });

  describe('Latitude validation', () => {
    it('should fail when latitude is not a string', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: 50.770774,
        longitude: '-126.104965',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('latitude');
      expect(errors[0].constraints?.isString).toBeDefined();
    });

    it('should fail when latitude is missing', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        longitude: '-126.104965',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('latitude');
    });

    it('should fail with invalid latitude values', async () => {
      const invalidLatitudes = ['91', '-91', '180', 'invalid', '', 'abc'];

      for (const lat of invalidLatitudes) {
        const dto = plainToInstance(AdditionalGeoLocationDto, {
          latitude: lat,
          longitude: '0',
        });

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        const latError = errors.find(e => e.property === 'latitude');
        expect(latError).toBeDefined();
        expect(latError?.constraints?.isLatitude).toBe('latitude must be a valid latitude coordinate (e.g., 50.770774)');
      }
    });
  });

  describe('Longitude validation', () => {
    it('should fail when longitude is not a string', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.770774',
        longitude: -126.104965,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('longitude');
      expect(errors[0].constraints?.isString).toBeDefined();
    });

    it('should fail when longitude is missing', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.770774',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('longitude');
    });

    it('should fail with invalid longitude values', async () => {
      const invalidLongitudes = ['181', '-181', '360', 'invalid', '', 'xyz'];

      for (const lng of invalidLongitudes) {
        const dto = plainToInstance(AdditionalGeoLocationDto, {
          latitude: '0',
          longitude: lng,
        });

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        const lngError = errors.find(e => e.property === 'longitude');
        expect(lngError).toBeDefined();
        expect(lngError?.constraints?.isLongitude).toBe('longitude must be a valid longitude coordinate (e.g., -126.104965)');
      }
    });
  });

  describe('Name validation (optional field)', () => {
    it('should validate when name is not provided', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.770774',
        longitude: '-126.104965',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.name).toBeUndefined();
    });

    it('should validate when name is null', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.770774',
        longitude: '-126.104965',
        name: null,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate with valid DisplayTextDto name', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.770774',
        longitude: '-126.104965',
        name: {
          language: 'en',
          text: 'Parking Entrance A',
        },
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.name).toBeInstanceOf(DisplayTextDto);
    });

    it('should fail when name has invalid DisplayTextDto structure', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.770774',
        longitude: '-126.104965',
        name: {
          invalidProperty: 'invalid',
        },
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const nameError = errors.find(e => e.property === 'name');
      expect(nameError).toBeDefined();
    });
  });

  describe('Multiple validation errors', () => {
    it('should return errors for multiple invalid fields', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: 'invalid',
        longitude: 'invalid',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(2);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('latitude');
      expect(properties).toContain('longitude');
    });

    it('should return errors when all required fields are missing', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {});

      const errors = await validate(dto);
      expect(errors).toHaveLength(2);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('latitude');
      expect(properties).toContain('longitude');
    });

    it('should handle mixed valid and invalid fields', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.770774', // valid
        longitude: 'invalid',   // invalid
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('longitude');
    });
  });

  describe('Edge cases', () => {
    it('should validate with very precise coordinates', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '50.7707740123456789',
        longitude: '-126.1049650987654321',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate with zero coordinates', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: '0.0',
        longitude: '0.0',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail with non-string number-like values', async () => {
      const dto = plainToInstance(AdditionalGeoLocationDto, {
        latitude: 0,
        longitude: 0,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(2);

      const latError = errors.find(e => e.property === 'latitude');
      const lngError = errors.find(e => e.property === 'longitude');
      expect(latError?.constraints?.isString).toBeDefined();
      expect(lngError?.constraints?.isString).toBeDefined();
    });
  });
});