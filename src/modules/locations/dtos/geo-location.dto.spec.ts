import { validate, ValidationError } from 'class-validator';
import { GeoLocationDto } from './geo-location.dto';

describe('GeoLocationDto', () => {
  it('should be valid with correct latitude and longitude', async () => {
    const dto = new GeoLocationDto();
    dto.latitude = '60.169521';
    dto.longitude = '24.935450';

    const errors: ValidationError[] = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should be invalid with bad latitude', async () => {
    const dto = new GeoLocationDto();
    dto.latitude = 'not-a-latitude';
    dto.longitude = '24.935450';

    const errors: ValidationError[] = await validate(dto);
    expect(errors.map((error) => error.property)).toContain('latitude');
  });

  it('should be invalid with bad longitude', async () => {
    const dto = new GeoLocationDto();
    dto.latitude = '60.169521';
    dto.longitude = 'invalid';

    const errors: ValidationError[] = await validate(dto);
    expect(errors.map((error) => error.property)).toContain('longitude');
  });

  it('should be invalid when latitude and longitude are missing', async () => {
    const dto = new GeoLocationDto();

    const errors: ValidationError[] = await validate(dto);
    expect(errors.map((error) => error.property)).toEqual(expect.arrayContaining(['latitude', 'longitude']));
  });

  it('should be invalid with latitude above 90', async () => {
    const dto = new GeoLocationDto();
    dto.latitude = '91.0';
    dto.longitude = '24.935450';

    const errors: ValidationError[] = await validate(dto);
    expect(errors.map((error) => error.property)).toContain('latitude');
  });

  it('should be invalid with latitude below -90', async () => {
    const dto = new GeoLocationDto();
    dto.latitude = '-91.0';
    dto.longitude = '24.935450';

    const errors: ValidationError[] = await validate(dto);
    expect(errors.map((error) => error.property)).toContain('latitude');
  });

  it('should be invalid with longitude above 180', async () => {
    const dto = new GeoLocationDto();
    dto.latitude = '60.169521';
    dto.longitude = '181.0';

    const errors: ValidationError[] = await validate(dto);
    expect(errors.map((error) => error.property)).toContain('longitude');
  });

  it('should be invalid with longitude below -180', async () => {
    const dto = new GeoLocationDto();
    dto.latitude = '60.169521';
    dto.longitude = '-181.0';

    const errors: ValidationError[] = await validate(dto);
    expect(errors.map((error) => error.property)).toContain('longitude');
  });

  it('should be valid at boundary values', async () => {
    const dto1 = new GeoLocationDto();
    dto1.latitude = '90.0';
    dto1.longitude = '180.0';

    const errors1: ValidationError[] = await validate(dto1);
    expect(errors1).toHaveLength(0);

    const dto2 = new GeoLocationDto();
    dto2.latitude = '-90.0';
    dto2.longitude = '-180.0';

    const errors2: ValidationError[] = await validate(dto2);
    expect(errors2).toHaveLength(0);
  });
});
