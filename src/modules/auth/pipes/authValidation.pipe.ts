import { ValidationPipe, BadRequestException, ValidationError } from '@nestjs/common';

export class AuthValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const err = Object.values(errors?.[0]?.constraints ?? {})?.[0]
        return new BadRequestException({
          statusCode: 400,
          message: err,
        });
      },
    });
  }
}