import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginDTO } from '@/modules/auth/dto/login.dto';
import { SignUpDTO } from '@/modules/auth/dto/signup.dto';
import { AuthValidationPipe } from './pipes/authValidation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new AuthValidationPipe())
  signup(@Body() dto: SignUpDTO) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @UsePipes(new AuthValidationPipe())
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }
}
