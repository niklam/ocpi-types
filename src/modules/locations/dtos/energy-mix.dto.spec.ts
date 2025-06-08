import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnergyMixDto } from './energy-mix.dto';
import { EnergySourceDto } from './energy-source.dto';
import { EnvironmentalImpactDto } from './environmental-impact.dto';
import { EnergySourceCategory } from '../enums/energy-source-category.enum';
import { EnvironmentalImpactCategory } from '../enums/environmental-impact-category.enum';

describe('EnergyMixDto', () => {
  describe('Valid cases', () => {
    it('should validate with only required isGreenEnergy property', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.isGreenEnergy).toBe(true);
    });

    it('should validate with all properties provided', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: false,
        energy_sources: [
          { source: EnergySourceCategory.SOLAR, percentage: 60 },
          { source: EnergySourceCategory.WIND, percentage: 40 },
        ],
        environ_impact: [
          { category: EnvironmentalImpactCategory.CARBON_DIOXIDE, amount: 50.5 },
          { category: EnvironmentalImpactCategory.NUCLEAR_WASTE, amount: 0.1 },
        ],
        supplier_name: 'Green Energy Corp',
        energy_product_name: 'Eco Power Plan',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.isGreenEnergy).toBe(false);
      expect(dto.energySources).toHaveLength(2);
      expect(dto.environImpact).toHaveLength(2);
      expect(dto.supplierName).toBe('Green Energy Corp');
      expect(dto.energyProductName).toBe('Eco Power Plan');
    });

    it('should validate with green energy true and no impact data', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        energy_sources: [
          { source: EnergySourceCategory.SOLAR, percentage: 100 },
        ],
        supplier_name: 'Solar Power Inc',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  describe('isGreenEnergy validation', () => {
    it('should fail when isGreenEnergy is missing', async () => {
      const dto = plainToInstance(EnergyMixDto, {});

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('isGreenEnergy');
      expect(errors[0].constraints?.isBoolean).toBeDefined();
    });

    it('should fail when isGreenEnergy is not a boolean', async () => {
      const invalidValues = ['true', 'false', 1, 0, 'yes', 'no'];

      for (const value of invalidValues) {
        const dto = plainToInstance(EnergyMixDto, {
          is_green_energy: value,
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('isGreenEnergy');
        expect(errors[0].constraints?.isBoolean).toBeDefined();
      }
    });
  });

  describe('energySources validation (optional)', () => {
    it('should validate when energySources is not provided', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.energySources).toBeUndefined();
    });

    it('should validate with valid energy sources array', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: false,
        energy_sources: [
          { source: EnergySourceCategory.SOLAR, percentage: 30 },
          { source: EnergySourceCategory.WIND, percentage: 25 },
          { source: EnergySourceCategory.NUCLEAR, percentage: 45 },
        ],
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.energySources).toHaveLength(3);
      expect(dto.energySources?.[0]).toBeInstanceOf(EnergySourceDto);
    });

    it('should fail when energySources contains invalid EnergySourceDto', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: false,
        energy_sources: [
          { source: EnergySourceCategory.SOLAR, percentage: 30 },
          { source: 'INVALID_SOURCE', percentage: 101 }, // Invalid
          { invalidProperty: 'test' }, // Invalid structure
        ],
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const energySourcesError = errors.find(e => e.property === 'energySources');
      expect(energySourcesError).toBeDefined();
    });

    it('should fail when energySources is not an array', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: false,
        energy_sources: 'not-an-array',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('energySources');
      expect(errors[0].constraints?.isArray).toBeDefined();
    });

    it('should validate with empty energy sources array', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        energy_sources: [],
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.energySources).toEqual([]);
    });
  });

  describe('environImpact validation (optional)', () => {
    it('should validate when environImpact is not provided', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.environImpact).toBeUndefined();
    });

    it('should validate with valid environmental impact array', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: false,
        environ_impact: [
          { category: EnvironmentalImpactCategory.CARBON_DIOXIDE, amount: 50.5 },
          { category: EnvironmentalImpactCategory.NUCLEAR_WASTE, amount: 0.1 },
        ],
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.environImpact).toHaveLength(2);
      expect(dto.environImpact?.[0]).toBeInstanceOf(EnvironmentalImpactDto);
    });

    it('should fail when environImpact contains invalid EnvironmentalImpactDto', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: false,
        environ_impact: [
          { category: EnvironmentalImpactCategory.CARBON_DIOXIDE, amount: 50.5 },
          { category: 'INVALID_CATEGORY', amount: -1 }, // Invalid
          { invalidProperty: 'test' }, // Invalid structure
        ],
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const environImpactError = errors.find(e => e.property === 'environImpact');
      expect(environImpactError).toBeDefined();
    });

    it('should fail when environImpact is not an array', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: false,
        environ_impact: 'not-an-array',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('environImpact');
      expect(errors[0].constraints?.isArray).toBeDefined();
    });
  });

  describe('supplierName validation (optional)', () => {
    it('should validate when supplierName is not provided', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.supplierName).toBeUndefined();
    });

    it('should validate with valid supplier name', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        supplier_name: 'Green Energy Corp',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.supplierName).toBe('Green Energy Corp');
    });

    it('should fail when supplierName is not a string', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        supplier_name: 12345,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('supplierName');
      expect(errors[0].constraints?.isString).toBeDefined();
    });

    it('should fail when supplierName exceeds maximum length', async () => {
      const longName = 'A'.repeat(65); // 65 characters, max is 64
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        supplier_name: longName,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('supplierName');
      expect(errors[0].constraints?.maxLength).toBeDefined();
    });

    it('should validate with maximum allowed length', async () => {
      const maxLengthName = 'A'.repeat(64); // Exactly 64 characters
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        supplier_name: maxLengthName,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  describe('energyProductName validation (optional)', () => {
    it('should validate when energyProductName is not provided', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.energyProductName).toBeUndefined();
    });

    it('should validate with valid energy product name', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        energy_product_name: 'Eco Power Plan',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.energyProductName).toBe('Eco Power Plan');
    });

    it('should fail when energyProductName is not a string', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        energy_product_name: 98765,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('energyProductName');
      expect(errors[0].constraints?.isString).toBeDefined();
    });

    it('should fail when energyProductName exceeds maximum length', async () => {
      const longProductName = 'B'.repeat(65); // 65 characters, max is 64
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        energy_product_name: longProductName,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('energyProductName');
      expect(errors[0].constraints?.maxLength).toBeDefined();
    });

    it('should validate with maximum allowed length', async () => {
      const maxLengthProductName = 'B'.repeat(64); // Exactly 64 characters
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        energy_product_name: maxLengthProductName,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Class transformation (@Expose decorator)', () => {
    it('should properly transform all exposed properties', () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: false,
        energy_sources: [
          { source: EnergySourceCategory.SOLAR, percentage: 60 },
        ],
        environ_impact: [
          { category: EnvironmentalImpactCategory.CARBON_DIOXIDE, amount: 50.5 },
        ],
        supplier_name: 'Green Energy Corp',
        energy_product_name: 'Eco Power Plan',
      });

      expect(dto.isGreenEnergy).toBe(false);
      expect(dto.energySources).toBeDefined();
      expect(dto.environImpact).toBeDefined();
      expect(dto.supplierName).toBe('Green Energy Corp');
      expect(dto.energyProductName).toBe('Eco Power Plan');
    });
  });

  describe('Multiple validation errors', () => {
    it('should return multiple errors when multiple fields are invalid', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: 'not-boolean',
        energy_sources: 'not-array',
        environ_impact: 'not-array',
        supplier_name: 12345,
        energy_product_name: 67890,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(5);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('isGreenEnergy');
      expect(properties).toContain('energySources');
      expect(properties).toContain('environImpact');
      expect(properties).toContain('supplierName');
      expect(properties).toContain('energyProductName');
    });

    it('should handle mixed valid and invalid fields', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true, // valid
        energy_sources: 'invalid', // invalid
        supplier_name: 'Valid Name', // valid
        energy_product_name: 'A'.repeat(65), // invalid - too long
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(2);

      const properties = errors.map(error => error.property);
      expect(properties).toContain('energySources');
      expect(properties).toContain('energyProductName');
      expect(properties).not.toContain('isGreenEnergy');
      expect(properties).not.toContain('supplierName');
    });
  });

  describe('Edge cases', () => {
    it('should validate with empty strings for optional string fields', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: true,
        supplier_name: '',
        energy_product_name: '',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate complex energy mix scenario', async () => {
      const dto = plainToInstance(EnergyMixDto, {
        is_green_energy: false,
        energy_sources: [
          { source: EnergySourceCategory.SOLAR, percentage: 25 },
          { source: EnergySourceCategory.WIND, percentage: 25 },
          { source: EnergySourceCategory.COAL, percentage: 20 },
          { source: EnergySourceCategory.NUCLEAR, percentage: 30 },
        ],
        environ_impact: [
          { category: EnvironmentalImpactCategory.CARBON_DIOXIDE, amount: 120.5 },
          { category: EnvironmentalImpactCategory.NUCLEAR_WASTE, amount: 2.1 },
        ],
        supplier_name: 'Mixed Energy Solutions Ltd',
        energy_product_name: 'Balanced Energy Mix 2024',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.energySources).toHaveLength(4);
      expect(dto.environImpact).toHaveLength(2);
    });
  });
});