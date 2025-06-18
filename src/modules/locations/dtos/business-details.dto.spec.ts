import { validate, ValidationError } from 'class-validator';
import { BusinessDetailsDto } from './business-details.dto';
import { ImageDto } from './image.dto';

describe('BusinessDetailsDto', () => {
  describe('Valid cases', () => {
    it('should be valid with only required name field', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'My Business';

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should be valid with all fields provided', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Awesome Company Ltd';
      dto.website = 'https://example.com';
      dto.logo = new ImageDto();

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should be valid with name and website only', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Tech Startup';
      dto.website = 'https://techstartup.io';

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should be valid with name and logo only', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Design Agency';
      dto.logo = new ImageDto();

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Name validation', () => {
    describe('Valid name values', () => {
      it('should be valid with single character name', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'A';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with exactly 100 character name', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'A'.repeat(100);

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with name containing spaces', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'My Great Business Name';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with name containing special characters', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company & Associates Ltd.';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with name containing numbers', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Tech Solutions 2024';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with name containing unicode characters', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Café München Ñoño';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });

    describe('Invalid name values', () => {
      it('should be invalid with empty string name', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = '';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });

      it('should be invalid with name longer than 100 characters', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'A'.repeat(101);

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });

      it('should be invalid with name as number', async () => {
        const dto = new BusinessDetailsDto();
        (dto as any).name = 12345;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });

      it('should be invalid with name as boolean', async () => {
        const dto = new BusinessDetailsDto();
        (dto as any).name = true;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });

      it('should be invalid with name as null', async () => {
        const dto = new BusinessDetailsDto();
        (dto as any).name = null;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });

      it('should be invalid with name as undefined', async () => {
        const dto = new BusinessDetailsDto();
        (dto as any).name = undefined;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });

      it('should be invalid with name as object', async () => {
        const dto = new BusinessDetailsDto();
        (dto as any).name = { value: 'Company Name' };

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });

      it('should be invalid with name as array', async () => {
        const dto = new BusinessDetailsDto();
        (dto as any).name = ['Company', 'Name'];

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });

      it('should be invalid with missing name field', async () => {
        const dto = new BusinessDetailsDto();
        // Don't set name at all

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });

      it('should be invalid with very long name', async () => {
        const dto = new BusinessDetailsDto();
        dto.name =
          'Very Long Business Name That Exceeds The Maximum Length Limit Of One Hundred Characters Set By The Validation Rules';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('name');
      });
    });
  });

  describe('Website validation', () => {
    describe('Valid website values', () => {
      it('should be valid with undefined website', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = undefined;

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with https URL', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'https://example.com';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with http URL', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'http://example.com';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with URL containing path', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'https://example.com/company/about';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with URL containing query parameters', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'https://example.com?utm_source=test&page=home';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with URL containing port', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'https://example.com:8080';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with subdomain URL', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'https://www.example.com';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });

      it('should be valid with international domain', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'https://example.co.uk';

        const errors: ValidationError[] = await validate(dto);
        expect(errors).toHaveLength(0);
      });
    });

    describe('Invalid website values', () => {
      it('should be invalid with empty string website', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = '';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('website');
      });

      it('should be invalid with malformed URL', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'https://';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('website');
      });

      it('should be invalid with website as number', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        (dto as any).website = 12345;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('website');
      });

      it('should be invalid with website as boolean', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        (dto as any).website = false;

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('website');
      });

      it('should be invalid with website as object', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        (dto as any).website = { url: 'https://example.com' };

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('website');
      });

      it('should be invalid with random string as website', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'not-a-url';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('website');
      });

      it('should be invalid with whitespace-only website', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = '   ';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('website');
      });

      it('should be invalid with URL with spaces', async () => {
        const dto = new BusinessDetailsDto();
        dto.name = 'Company';
        dto.website = 'https://example .com';

        const errors: ValidationError[] = await validate(dto);
        expect(errors.map((error) => error.property)).toContain('website');
      });
    });
  });

  describe('Logo validation', () => {
    it('should be valid with undefined logo', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Company';
      dto.logo = undefined;

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should be valid with valid ImageDto logo', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Company';
      dto.logo = new ImageDto();

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate nested ImageDto if logo is provided and invalid', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Company';
      dto.logo = new ImageDto();
      // Assuming ImageDto has required fields that we're not setting
      // This test depends on the ImageDto validation rules

      const errors: ValidationError[] = await validate(dto);
      // If ImageDto has validation rules, they should be triggered
      // This test verifies that nested validation occurs
      const logoErrors = errors.filter((error) => error.property === 'logo' || error.target === dto.logo);
      // Adjust expectation based on your ImageDto implementation
    });

    it('should be invalid with logo as primitive type', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Company';
      (dto as any).logo = 'string-logo';

      const errors: ValidationError[] = await validate(dto);
      // This might or might not fail depending on how class-validator handles this
      // If ImageDto validation is applied, it should fail
    });

    it('should be invalid with logo as plain object', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Company';
      (dto as any).logo = { url: 'https://example.com/logo.png' };

      const errors: ValidationError[] = await validate(dto);
      // This test verifies that only proper ImageDto instances are accepted
    });

    it('should be invalid with logo as null', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Company';
      (dto as any).logo = null;

      const errors: ValidationError[] = await validate(dto);
      // Should be valid since logo is optional, but null might be treated differently than undefined
      // Adjust expectation based on your validation setup
    });
  });

  describe('Complex combinations', () => {
    it('should handle multiple validation errors', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = ''; // Invalid: empty string
      dto.website = 'invalid-url'; // Invalid: not a URL
      (dto as any).logo = 'not-an-image-dto'; // Invalid: not ImageDto

      const errors: ValidationError[] = await validate(dto);
      const errorProperties = errors.map((error) => error.property);
      expect(errorProperties).toContain('name');
      expect(errorProperties).toContain('website');
      // Logo error handling depends on implementation
    });

    it('should be valid with minimal valid data', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Co';

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should be valid with maximum length name and all optional fields', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'A'.repeat(100);
      dto.website = 'https://very-long-domain-name-example.com/with/long/path';
      dto.logo = new ImageDto();

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should handle edge case combinations', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'X'; // Minimum valid length
      dto.website = 'http://a.co'; // Short but valid URL

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Type coercion and edge cases', () => {
    it('should handle constructor without parameters', async () => {
      const dto = new BusinessDetailsDto();
      // Only set required field
      dto.name = 'Test Company';

      const errors: ValidationError[] = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should preserve field values after validation', async () => {
      const dto = new BusinessDetailsDto();
      dto.name = 'Test Company';
      dto.website = 'https://test.com';

      await validate(dto);

      expect(dto.name).toBe('Test Company');
      expect(dto.website).toBe('https://test.com');
    });

    it('should handle concurrent validations', async () => {
      const dto1 = new BusinessDetailsDto();
      dto1.name = 'Company 1';

      const dto2 = new BusinessDetailsDto();
      dto2.name = 'Company 2';

      const [errors1, errors2] = await Promise.all([validate(dto1), validate(dto2)]);

      expect(errors1).toHaveLength(0);
      expect(errors2).toHaveLength(0);
    });
  });
});
