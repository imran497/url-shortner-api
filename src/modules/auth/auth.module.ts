import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from '@/modules/prisma/prisma.module';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { JWTModule } from '@/modules/jwt/jwt.module';

@Module({
  imports: [PrismaModule, PassportModule, JWTModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
