import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

// Regex that properly validates 24-hour time format
// Hours: 00-23, Minutes: 00-59
const TIME_REGEX = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

export function IsTime(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTime',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return typeof value === 'string' && TIME_REGEX.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid time in HH:MM format (00:00-23:59)`;
        },
      },
    });
  };
}