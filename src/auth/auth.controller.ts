import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshTokenDto';
import { JwtAuthGuard } from './../common/guards/JwtAuthGuard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe({ whitelist: true}))
	@Post('login')
  login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@UseGuards(AuthGuard('jwt'))
	@UsePipes(new ValidationPipe({ whitelist: true}))
	@Post('refresh-token')
	refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
		return this.authService.refreshToken(refreshTokenDto);
	}

}
