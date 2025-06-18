import { validate, ValidationError } from 'class-validator';
import { IsOcpiDateTime } from './is-ocpi-datetime.decorator';

// Test DTO for the decorator
class OcpiDateTimeDto {
  @IsOcpiDateTime()
  dateTime: string;
}

describe('IsOcpiDateTime Decorator', () => {
  describe('Valid OCPI DateTime formats', () => {
    describe('Basic OCPI DateTime formats', () => {
      it('should accept UTC timestamp with Z', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2015-06-29T20:39:09Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept timestamp without timezone (implies UTC)', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2015-06-29T20:39:09';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept timestamp with single fractional digit and Z', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2016-12-29T17:45:09.2Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept timestamp with single fractional digit without Z', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2016-12-29T17:45:09.2';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept timestamp with three fractional digits and Z', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2018-01-01T01:08:01.123Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept timestamp with positive timezone offset', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2018-01-01T01:08:01+03:00';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept timestamp with negative timezone offset', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45-05:00';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept timestamp with fractional seconds and timezone', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2018-01-01T01:08:01.123Z'; // Fractions with Z only

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });

    describe('Fractional seconds variations', () => {
      it('should accept one fractional digit', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45.1Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept two fractional digits', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45.12Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept three fractional digits', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45.123Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });

    describe('Boundary date values', () => {
      it('should accept start of year', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-01-01T00:00:00Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept end of year', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-31T23:59:59Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept leap year February 29th', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2024-02-29T12:00:00Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept month with 30 days', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-04-30T12:00:00Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept month with 31 days', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-01-31T12:00:00Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });

    describe('Timezone boundary values', () => {
      it('should accept Z timezone designator', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept no timezone (implies UTC)', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept positive timezone offsets', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45+01:00';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept negative timezone offsets', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45-08:00';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept maximum positive timezone offset (+23:59)', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45+23:59';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept maximum negative timezone offset (-23:59)', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45-23:59';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });

    describe('Length validation (max 25 characters)', () => {
      it('should accept exactly 25 characters', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45+01:00'; // Exactly 25 chars

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept shorter valid formats', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45'; // 19 chars

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });
  });

  describe('Invalid OCPI DateTime formats', () => {
    describe('Format violations', () => {
      it('should reject timestamp longer than 25 characters', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45.1234+01:00'; // 26 chars

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject fractional seconds with timezone offset (OCPI rule)', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2018-01-01T01:08:01.123+03:00'; // Fractions + timezone offset not allowed

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject fractional seconds with negative timezone offset', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2018-01-01T01:08:01.12-05:00'; // Fractions + timezone offset not allowed

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject timestamp with more than 3 fractional digits', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45.1234Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject timestamp with invalid separator', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25 10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject timestamp with wrong date format', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '23-12-25T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject timestamp with single digit components', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-1-1T1:1:1Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });
    });

    describe('Invalid date values', () => {
      it('should reject invalid month', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-13-25T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject month 00', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-00-25T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject invalid day', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-32T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject day 00', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-00T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject February 30th', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-02-30T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject February 29th in non-leap year', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-02-29T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject April 31st', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-04-31T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });
    });

    describe('Invalid time values', () => {
      it('should reject invalid timezone hour (24)', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T24:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject invalid hour', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T25:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject invalid minute', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:60:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject invalid second', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:60Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });
    });

    describe('Invalid timezone values', () => {
      it('should reject invalid timezone hour (24)', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45+24:00';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject invalid timezone minute (60)', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45+01:60';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject malformed timezone offset', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45+1:00';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject invalid timezone designators', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45UTC';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });
    });

    describe('Type validation', () => {
      it('should reject number instead of string', async () => {
        const dto = new OcpiDateTimeDto();
        (dto as any).dateTime = 1703512245000;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject Date object', async () => {
        const dto = new OcpiDateTimeDto();
        (dto as any).dateTime = new Date();

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject null', async () => {
        const dto = new OcpiDateTimeDto();
        (dto as any).dateTime = null;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject undefined', async () => {
        const dto = new OcpiDateTimeDto();
        (dto as any).dateTime = undefined;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject boolean', async () => {
        const dto = new OcpiDateTimeDto();
        (dto as any).dateTime = true;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject object', async () => {
        const dto = new OcpiDateTimeDto();
        (dto as any).dateTime = { date: '2023-12-25', time: '10:30:45' };

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject array', async () => {
        const dto = new OcpiDateTimeDto();
        (dto as any).dateTime = ['2023-12-25T10:30:45Z'];

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });
    });

    describe('Edge cases and malformed strings', () => {
      it('should reject empty string', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject random string', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = 'not-a-timestamp';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject string with only date part', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject string with only time part', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject timestamp with extra characters', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45Z extra';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject timestamp with leading whitespace', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = ' 2023-12-25T10:30:45Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject timestamp with trailing whitespace', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45Z ';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject partial timestamp formats', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30Z';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject very long invalid string', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45Z'.repeat(10);

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });

      it('should reject string with special characters', async () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45@';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      });
    });
  });

  describe('Custom error message', () => {
    it('should provide appropriate error message for invalid timestamp', async () => {
      const dto = new OcpiDateTimeDto();
      dto.dateTime = 'invalid-timestamp';

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isOcpiDateTime');
      expect(errors[0].constraints?.isOcpiDateTime).toContain('must be a valid OCPI DateTime');
    });

    it('should provide appropriate error message for wrong type', async () => {
      const dto = new OcpiDateTimeDto();
      (dto as any).dateTime = 123;

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isOcpiDateTime');
      expect(errors[0].constraints?.isOcpiDateTime).toContain('must be a valid OCPI DateTime');
    });
  });

  describe('Real-world timestamp scenarios', () => {
    it('should accept epoch start', async () => {
      const dto = new OcpiDateTimeDto();
      dto.dateTime = '1970-01-01T00:00:00Z';

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should accept far future date', async () => {
      const dto = new OcpiDateTimeDto();
      dto.dateTime = '2099-12-31T23:59:59Z';

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should accept various OCPI DateTime formats', async () => {
      const timestamps = [
        '2015-06-29T20:39:09Z', // Example 1 from OCPI spec
        '2015-06-29T20:39:09', // Example 2 from OCPI spec
        '2016-12-29T17:45:09.2Z', // Example 3 from OCPI spec
        '2016-12-29T17:45:09.2', // Example 4 from OCPI spec
        '2018-01-01T01:08:01.123Z', // Example 5 from OCPI spec
        '2018-01-01T01:08:01.123', // Example 6 from OCPI spec
        '2018-01-01T01:08:01+03:00', // With timezone offset
        '2023-12-25T10:30:45-05:00', // Negative timezone
        '2023-12-25T10:30:45+00:00', // UTC as offset
      ];

      for (const timestamp of timestamps) {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = timestamp;

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      }
    });
  });

  describe('Performance and edge cases', () => {
    it('should handle validation of multiple instances', async () => {
      const dtos = Array.from({ length: 10 }, () => {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = '2023-12-25T10:30:45Z';
        return dto;
      });

      const results = await Promise.all(dtos.map((dto) => validate(dto)));
      results.forEach((errors) => {
        expect(errors).toHaveLength(0);
      });
    });

    it('should consistently reject the same invalid input', async () => {
      const invalidTimestamp = '2023-13-45T25:70:99Z';

      for (let i = 0; i < 5; i++) {
        const dto = new OcpiDateTimeDto();
        dto.dateTime = invalidTimestamp;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('dateTime');
      }
    });

    it('should handle extremely long year values', async () => {
      const dto = new OcpiDateTimeDto();
      dto.dateTime = '999999-12-25T10:30:45Z';

      const errors: ValidationError[] = await validate(dto);
      // This should be rejected due to invalid date parsing
      expect(errors.map((error) => error.property)).toContain('dateTime');
    });
  });
});
