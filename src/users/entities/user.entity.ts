import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { UserType } from 'src/enums/usertype';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
	firstName: string
	
	@Prop()
	lastName: string
	
	@Prop()
	username: string

	@Prop()
	password: string

	@Prop()
	email: string

	@Prop()
	phone: string

	@Prop()
	userType: UserType
}

const schema = SchemaFactory.createForClass(User);
schema.plugin(mongoosePaginate)
export const UserSchema = schema