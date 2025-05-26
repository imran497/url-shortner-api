import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '@/modules/prisma/prisma.service';
import { LoginDTO } from '@/modules/auth/dto/login.dto';
import { SignUpDTO } from '@/modules/auth/dto/signup.dto';
import { plainToInstance } from 'class-transformer';
import { UserResDTO } from './dto/user.dto';
import { generateId } from '@/utils/id-generator';
import { formatResponse } from '@/utils/formatResponse';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(data: SignUpDTO) {
    const pwdHash = await bcrypt.hash(data.pwd, 12);

    try {
      const user = await this.prisma.user.create({
        data: {
          id: generateId('user'),
          email: data.email,
          passwordHash: pwdHash,
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
        },
      });

      // Return signed token
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }

  async login(data: LoginDTO) {
    try {
      // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    
    if (!user) throw new ForbiddenException('Invalid credentials');             // If user doesn't exist, throw exception

    const passwordMatch = await bcrypt.compare(data.pwd, user.passwordHash);    // Validate Password

    if (!passwordMatch) throw new ForbiddenException('Invalid credentials');    // If password incorrect, throw exception

    // Update lastLoggedIn timestamp
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoggedIn: new Date() },
    });

    const tkn = await this.signToken(user.id, user.email);

    return formatResponse(plainToInstance(UserResDTO, user), 200, { tkn });
    
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: string, email: string): Promise<string> {
    const payload = { userId, email };
    
    const token = await this.jwt.signAsync(payload);

    return token;
  }
}