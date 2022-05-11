import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { LoginDto } from '../dtos/LoginDto';
import { RefreshTokenDto } from '../dtos/RefreshTokenDto';
import { AuthService } from '../services/AuthServiceV1';

@Public()
@Controller('auth')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe({ whitelist: true}))
	@Post('login')
  login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@UsePipes(new ValidationPipe({ whitelist: true}))
	@Post('refresh-token')
	refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
		return this.authService.refreshToken(refreshTokenDto);
	}

}
