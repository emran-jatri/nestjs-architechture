import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshTokenDto';

@Public()
@Controller('auth')
export class AuthController {
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
