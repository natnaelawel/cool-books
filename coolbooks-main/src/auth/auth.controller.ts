import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { SigninDto } from './dto/signin.dto';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  auth() {
    return { message: 'auth endpoint', status: 'success' };
  }

  @Post('signup')
  @ApiCreatedResponse({
    description: 'User successfully signed up.',
  })
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }
}
