import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersControllerV1 } from './controllers/UsersControllerV1';
import { User, UserSchema } from './entities/UserEntity';
import { UsersServiceV1 } from './services/UsersServiceV1';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
	],
  controllers: [UsersControllerV1],
  providers: [UsersServiceV1],
  exports: [UsersServiceV1]
})
export class UsersModule {}
