import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// OCPI CiString (Case Insensitive String) validation
// Only printable ASCII characters allowed (32-126)
// Non-printable characters like carriage returns, tabs, line breaks are not allowed
const PRINTABLE_ASCII_REGEX = /^[\x20-\x7E]*$/;

export function IsOcpiCiString(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOcpiCiString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          // Check if the string contains only printable ASCII characters (32-126)
          // This excludes control characters like \n, \r, \t, etc.
          return PRINTABLE_ASCII_REGEX.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid OCPI CiString (only printable ASCII characters allowed)`;
        },
      },
    });
  };
}