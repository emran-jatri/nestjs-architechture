import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/JwtStrategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({}),
		UsersModule,
	],
 	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
