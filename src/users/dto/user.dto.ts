import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform } from "class-transformer";
import { IsOptional, IsString } from 'class-validator';
import { UserType } from 'src/enums/usertype';

export class UserDto {
	
	@Expose()
	@ApiProperty()
	@IsString()
	firstName: string
	
	@Expose()
	@ApiProperty()
	@IsString()
	lastName: string
	
	@Expose()
	@ApiProperty()
	@IsString()
	username: string

	@Exclude()
	@ApiProperty()
	@IsString()
	password: string

	@Expose()
	@ApiProperty()
	@IsString()
	@IsOptional()
	email: string

	@Expose()
	@ApiProperty()
	@IsString()
	@IsOptional()
	phone: string

	@Expose()
	@ApiProperty()
	@IsString()
	userType: UserType

}
