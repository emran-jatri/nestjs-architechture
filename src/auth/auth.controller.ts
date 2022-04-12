import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UsePipes(new ValidationPipe({ whitelist: true}))
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
