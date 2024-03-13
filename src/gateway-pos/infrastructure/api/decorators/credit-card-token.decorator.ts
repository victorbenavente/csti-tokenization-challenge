import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const decorator = (_data: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  return req.headers.token;
};

export const CreditCardToken = createParamDecorator(decorator);
