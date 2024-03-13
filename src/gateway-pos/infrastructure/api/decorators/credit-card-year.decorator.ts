import { isNumberString, max, min, registerDecorator } from 'class-validator';

export const buildDecorator = (registerDecoratorFunction, validateFunction) => {
  return () => {
    return function (object: any, propertyName: string) {
      registerDecoratorFunction({
        name: 'IsCreditCardYear',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: {
          message: 'Invalid credit card year',
        },
        validator: validateFunction,
      });
    };
  };
};

export const validateObjectFunction = {
  validate(year: string) {
    const currentYear = new Date().getFullYear();
    return (
      isNumberString(year) &&
      min(Number(year), currentYear) &&
      max(Number(year), currentYear + 5)
    );
  },
};

export const IsCreditCardYear = buildDecorator(
  registerDecorator,
  validateObjectFunction,
);
