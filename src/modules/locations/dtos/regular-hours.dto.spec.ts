import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RegularHoursDto } from './regular-hours.dto';

describe('RegularHoursDto', () => {
  describe('Valid cases', () => {
    it('should validate with all valid properties', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1,
        period_begin: '09:00',
        period_end: '17:30',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.weekday).toBe(1);
      expect(dto.periodBegin).toBe('09:00');
      expect(dto.periodEnd).toBe('17:30');
    });

    it('should validate with Monday (1)', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1,
        period_begin: '08:00',
        period_end: '18:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate with Sunday (7)', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 7,
        period_begin: '10:00',
        period_end: '16:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate with midnight times', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 3,
        period_begin: '00:00',
        period_end: '23:59',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate with same hour different minutes', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 2,
        period_begin: '14:15',
        period_end: '14:45',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Weekday validation', () => {
    it('should fail validation when weekday is 0', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 0,
        period_begin: '09:00',
        period_end: '17:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('weekday');
      expect(errors[0].constraints?.min).toBe('weekday must be at least 1 (Monday)');
    });

    it('should fail validation when weekday is 8', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 8,
        period_begin: '09:00',
        period_end: '17:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('weekday');
      expect(errors[0].constraints?.max).toBe('weekday must be at most 7 (Sunday)');
    });

    it('should fail validation when weekday is negative', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: -1,
        period_begin: '09:00',
        period_end: '17:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('weekday');
      expect(errors[0].constraints?.min).toBe('weekday must be at least 1 (Monday)');
    });

    it('should fail validation when weekday is not an integer', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1.5,
        period_begin: '09:00',
        period_end: '17:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('weekday');
      expect(errors[0].constraints?.isInt).toBe('weekday must be an integer');
    });

    it('should fail validation when weekday is a string', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 'Monday',
        period_begin: '09:00',
        period_end: '17:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('weekday');
      expect(errors[0].constraints?.isInt).toBe('weekday must be an integer');
    });

    it('should fail validation when weekday is missing', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        period_begin: '09:00',
        period_end: '17:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('weekday');
      expect(errors[0].constraints?.isInt).toBe('weekday must be an integer');
    });
  });

  describe('Time format validation', () => {
    describe('periodBegin validation', () => {
      it('should fail with invalid time format - single digit hour', async () => {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: 1,
          period_begin: '9:00',
          period_end: '17:00',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('periodBegin');
      });

      it('should fail with invalid time format - no colon', async () => {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: 1,
          period_begin: '0900',
          period_end: '17:00',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('periodBegin');
      });

      it('should fail with invalid hour - 24', async () => {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: 1,
          period_begin: '24:00',
          period_end: '17:00',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('periodBegin');
      });

      it('should fail with invalid minute - 60', async () => {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: 1,
          period_begin: '09:60',
          period_end: '17:00',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('periodBegin');
      });

      it('should fail with negative hour', async () => {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: 1,
          period_begin: '-1:00',
          period_end: '17:00',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('periodBegin');
      });

      it('should fail when periodBegin is missing', async () => {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: 1,
          period_end: '17:00',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('periodBegin');
      });
    });

    describe('periodEnd validation', () => {
      it('should fail with invalid time format - single digit minute', async () => {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: 1,
          period_begin: '09:00',
          period_end: '17:5',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('periodEnd');
      });

      it('should fail with letters in time', async () => {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: 1,
          period_begin: '09:00',
          period_end: '17:3a',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('periodEnd');
      });

      it('should fail when periodEnd is missing', async () => {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: 1,
          period_begin: '09:00',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('periodEnd');
      });
    });
  });

  describe('Required field validation', () => {
    it('should fail validation when weekday is missing', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        period_begin: '09:00',
        period_end: '17:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('weekday');
      expect(errors[0].constraints?.isInt).toBe('weekday must be an integer');
    });

    it('should fail validation when periodBegin is missing', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1,
        period_end: '17:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('periodBegin');
      expect(errors[0].constraints).toHaveProperty('isTime');
    });

    it('should fail validation when periodEnd is missing', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1,
        period_begin: '09:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('periodEnd');
      expect(errors[0].constraints).toHaveProperty('isTime');
    });

    it('should fail validation when only weekday is provided', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(2);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('periodBegin');
      expect(properties).toContain('periodEnd');
    });

    it('should fail validation when only periodBegin is provided', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        period_begin: '09:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(2);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('weekday');
      expect(properties).toContain('periodEnd');
    });

    it('should fail validation when only periodEnd is provided', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        period_end: '17:00',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(2);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('weekday');
      expect(properties).toContain('periodBegin');
    });

    it('should return all errors when all fields are completely missing', async () => {
      const dto = plainToInstance(RegularHoursDto, {});

      const errors = await validate(dto);
      expect(errors).toHaveLength(3);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('weekday');
      expect(properties).toContain('periodBegin');
      expect(properties).toContain('periodEnd');
    });

    it('should return all errors when passed an empty object explicitly', async () => {
      const dto = plainToInstance(RegularHoursDto, Object.create(null));

      const errors = await validate(dto);
      expect(errors).toHaveLength(3);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('weekday');
      expect(properties).toContain('periodBegin');
      expect(properties).toContain('periodEnd');
    });
  });

  describe('Multiple validation errors', () => {
    it('should return multiple errors when multiple fields are invalid', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 0,
        period_begin: '25:00',
        period_end: '9:60',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(3);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('weekday');
      expect(properties).toContain('periodBegin');
      expect(properties).toContain('periodEnd');
    });

    it('should handle mixed missing and invalid fields', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 25, // invalid
        period_begin: 'invalid-time', // invalid format
        // period_end missing
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(3);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('weekday');
      expect(properties).toContain('periodBegin');
      expect(properties).toContain('periodEnd');
    });

    it('should handle partial data with some valid and some invalid fields', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1, // valid
        period_begin: 'not-a-time', // invalid
        period_end: '25:99', // invalid
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(2);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('periodBegin');
      expect(properties).toContain('periodEnd');
      expect(properties).not.toContain('weekday');
    });
  });

  describe('Class transformation (@Expose decorator)', () => {
    it('should properly transform period_begin to periodBegin', () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1,
        period_begin: '09:00',
        period_end: '17:00',
      });

      expect(dto.periodBegin).toBe('09:00');
    });

    it('should properly transform period_end to periodEnd', () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1,
        period_begin: '09:00',
        period_end: '17:00',
      });

      expect(dto.periodEnd).toBe('17:00');
    });
  });

  describe('Edge cases', () => {
    it('should validate boundary values for weekday', async () => {
      // Test all valid weekdays
      for (let day = 1; day <= 7; day++) {
        const dto = plainToInstance(RegularHoursDto, {
          weekday: day,
          period_begin: '09:00',
          period_end: '17:00',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(0);
      }
    });

    it('should validate boundary time values', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1,
        period_begin: '00:00',
        period_end: '23:59',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate with very close time periods', async () => {
      const dto = plainToInstance(RegularHoursDto, {
        weekday: 1,
        period_begin: '12:00',
        period_end: '12:01',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });
});