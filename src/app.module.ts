import { Module } from '@nestjs/common';
import { UsersModule } from './users/UsersModule';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserTypeGuard, JwtAuthGuard, HasPermissionGuard } from 'src/common/guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
	ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRoot('mongodb://localhost/nest',{autoIndex: true}),
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
		{
			provide: APP_GUARD,
			useClass: HasPermissionGuard,
		},
	],
})
export class AppModule {}
