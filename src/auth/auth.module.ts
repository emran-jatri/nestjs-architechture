import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/UsersModule';
import { AuthControllerV1 } from './controllers/AuthControllerV1';
import { AuthService } from './services/AuthServiceV1';
import { JwtStrategy } from './strategies/JwtStrategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({}),
		UsersModule,
	],
 	controllers: [AuthControllerV1],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
