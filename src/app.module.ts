import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserTypeGuard, JwtAuthGuard } from 'src/common/guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
	ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRoot('mongodb://localhost/nest'),
		UsersModule,
		AuthModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: UserTypeGuard,
		},
	],
})
export class AppModule {}
