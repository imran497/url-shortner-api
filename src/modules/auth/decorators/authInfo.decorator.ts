import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.authInfo; // Extracts the user object added by JwtStrategy
  },
);