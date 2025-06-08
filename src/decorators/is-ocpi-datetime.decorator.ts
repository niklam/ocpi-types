import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

// OCPI DateTime regex based on RFC 3339 with OCPI-specific limitations
// Two patterns:
// 1. With fractional seconds: YYYY-MM-DDTHH:mm:ss.fff[Z] (no timezone offset allowed)
// 2. Without fractional seconds: YYYY-MM-DDTHH:mm:ss[Z|±HH:mm]
// Max length: 25 characters
const OCPI_DATETIME_WITH_FRACTIONS =
  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d{1,3}(Z)?$/;

const OCPI_DATETIME_WITHOUT_FRACTIONS =
  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(Z|[+-]([01]\d|2[0-3]):[0-5]\d)?$/;

export function IsOcpiDateTime(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOcpiDateTime',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          // Check max length (OCPI spec: max 25 characters)
          if (value.length > 25) {
            return false;
          }

          // First check regex format
          if (!OCPI_DATETIME_WITH_FRACTIONS.test(value) && !OCPI_DATETIME_WITHOUT_FRACTIONS.test(value)) {
            return false;
          }

          // Additional validation: check if it's a valid date
          // Extract date components from the string for strict validation
          try {
            const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
            if (!match) return false;

            const [, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr] = match;
            const year = parseInt(yearStr, 10);
            const month = parseInt(monthStr, 10);
            const day = parseInt(dayStr, 10);
            const hour = parseInt(hourStr, 10);
            const minute = parseInt(minuteStr, 10);
            const second = parseInt(secondStr, 10);

            // Create a date and check if the components match exactly
            // This catches invalid dates like Feb 30th
            const date = new Date(year, month - 1, day, hour, minute, second);

            return (
              !isNaN(date.getTime()) &&
              date.getFullYear() === year &&
              date.getMonth() === month - 1 &&
              date.getDate() === day &&
              date.getHours() === hour &&
              date.getMinutes() === minute &&
              date.getSeconds() === second
            );
          } catch {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid OCPI DateTime (max 25 chars: YYYY-MM-DDTHH:mm:ss[.fff][Z] or YYYY-MM-DDTHH:mm:ss[Z|±HH:mm])`;
        },
      },
    });
  };
}