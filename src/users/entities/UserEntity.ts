import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { UserType } from 'src/common/enums/UserType';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({trim: true, required: true})
	firstName: string

	@Prop({trim: true, required: true})
	lastName: string

	@Prop({trim: true, required: true})
	username: string

	@Prop({trim: true, required: true})
	password: string

	@Prop()
	email: string

	@Prop()
	phone: string

	@Prop({trim: true, required: true})
	userType: UserType

	@Prop()
	permissions: number[]
}

const schema = SchemaFactory.createForClass(User);
schema.plugin(mongoosePaginate)
export const UserSchema = schema