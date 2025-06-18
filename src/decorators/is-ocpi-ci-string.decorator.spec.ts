import { validate, ValidationError } from 'class-validator';
import { IsOcpiCiString } from './is-ocpi-ci-string.decorator';

// Test DTO for the decorator
class OcpiCiStringDto {
  @IsOcpiCiString()
  ciString: string;
}

describe('IsOcpiCiString Decorator', () => {
  describe('Valid OCPI CiString formats', () => {
    describe('Basic printable ASCII characters', () => {
      it('should accept empty string', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept simple text', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello World';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept lowercase letters', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'abcdefghijklmnopqrstuvwxyz';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept uppercase letters', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept mixed case letters', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'AbCdEfGhIjKlMnOpQrStUvWxYz';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept numbers', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '0123456789';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept alphanumeric text', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Test123ABC';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });

    describe('Special printable ASCII characters', () => {
      it('should accept space character', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello World';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept common punctuation', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '.,;:!?';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept mathematical symbols', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '+-*/=<>';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept brackets and parentheses', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '()[]{}';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept quotes and apostrophes', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '\'""`';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept special characters', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '@#$%^&*_-|\\~';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept forward slash and backslash', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '/\\';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });

    describe('Boundary printable ASCII characters', () => {
      it('should accept space (ASCII 32)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = ' ';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept tilde (ASCII 126)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '~';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept all printable ASCII characters (32-126)', async () => {
        const dto = new OcpiCiStringDto();
        // Generate string with all printable ASCII characters
        dto.ciString = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });

    describe('Real-world examples', () => {
      it('should accept email addresses', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'user@example.com';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept URLs', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'https://www.example.com/path?query=value';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept identifiers', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'CHARGE_POINT_ID_123';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept names with spaces', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'John Doe';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should accept addresses', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = '123 Main St, Suite 456';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });
  });

  describe('Invalid OCPI CiString formats', () => {
    describe('Non-printable ASCII characters', () => {
      it('should reject line break (\\n)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello\nWorld';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject carriage return (\\r)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello\rWorld';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject tab character (\\t)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello\tWorld';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject null character (\\0)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello\0World';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject vertical tab (\\v)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello\vWorld';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject form feed (\\f)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello\fWorld';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject backspace (\\b)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello\bWorld';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject bell character (\\a)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello' + String.fromCharCode(7) + 'World'; // ASCII 7 = bell

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });
    });

    describe('Control characters (ASCII 0-31)', () => {
      it('should reject ASCII control character 1', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello' + String.fromCharCode(1) + 'World';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject ASCII control character 31', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello' + String.fromCharCode(31) + 'World';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject multiple control characters', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = String.fromCharCode(1, 2, 3, 4, 5);

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });
    });

    describe('Extended ASCII characters (127+)', () => {
      it('should reject DEL character (ASCII 127)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello' + String.fromCharCode(127) + 'World';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject extended ASCII character (128)', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello' + String.fromCharCode(128) + 'World';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject Latin-1 characters', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Héllo Wörld'; // Contains é and ö

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject Unicode characters', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello 世界'; // Contains Chinese characters

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject emoji', async () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'Hello 😀 World';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });
    });

    describe('Type validation', () => {
      it('should reject number instead of string', async () => {
        const dto = new OcpiCiStringDto();
        (dto as any).ciString = 12345;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject boolean', async () => {
        const dto = new OcpiCiStringDto();
        (dto as any).ciString = true;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject null', async () => {
        const dto = new OcpiCiStringDto();
        (dto as any).ciString = null;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject undefined', async () => {
        const dto = new OcpiCiStringDto();
        (dto as any).ciString = undefined;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject object', async () => {
        const dto = new OcpiCiStringDto();
        (dto as any).ciString = { value: 'test' };

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });

      it('should reject array', async () => {
        const dto = new OcpiCiStringDto();
        (dto as any).ciString = ['test'];

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      });
    });
  });

  describe('Custom error message', () => {
    it('should provide appropriate error message for invalid characters', async () => {
      const dto = new OcpiCiStringDto();
      dto.ciString = 'Hello\nWorld';

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isOcpiCiString');
      expect(errors[0].constraints?.isOcpiCiString).toContain('must be a valid OCPI CiString');
      expect(errors[0].constraints?.isOcpiCiString).toContain('only printable ASCII characters allowed');
    });

    it('should provide appropriate error message for wrong type', async () => {
      const dto = new OcpiCiStringDto();
      (dto as any).ciString = 123;

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isOcpiCiString');
      expect(errors[0].constraints?.isOcpiCiString).toContain('must be a valid OCPI CiString');
    });
  });

  describe('Edge cases and boundary testing', () => {
    it('should handle very long valid strings', async () => {
      const dto = new OcpiCiStringDto();
      dto.ciString = 'A'.repeat(1000); // 1000 valid characters

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should handle strings with only spaces', async () => {
      const dto = new OcpiCiStringDto();
      dto.ciString = '     '; // Only spaces (valid)

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should handle strings with repeated special characters', async () => {
      const dto = new OcpiCiStringDto();
      dto.ciString = '!@#$%^&*()'.repeat(10);

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should handle mixed valid and one invalid character', async () => {
      const dto = new OcpiCiStringDto();
      dto.ciString = 'ValidText' + String.fromCharCode(1) + 'MoreValidText';

      const errors: ValidationError[] = await validate(dto);
      expect(errors.map((error) => error.property)).toContain('ciString');
    });
  });

  describe('Performance and consistency', () => {
    it('should handle validation of multiple instances', async () => {
      const dtos = Array.from({ length: 10 }, () => {
        const dto = new OcpiCiStringDto();
        dto.ciString = 'ValidString';
        return dto;
      });

      const results = await Promise.all(dtos.map((dto) => validate(dto)));
      results.forEach((errors) => {
        expect(errors).toHaveLength(0);
      });
    });

    it('should consistently reject the same invalid input', async () => {
      const invalidString = 'Invalid\nString';

      for (let i = 0; i < 5; i++) {
        const dto = new OcpiCiStringDto();
        dto.ciString = invalidString;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('ciString');
      }
    });
  });
});
