import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from 'src/enums/usertype';

export class CreateUserDto {
	
	@ApiProperty()
	@IsString()
	firstName: string
	
	@ApiProperty()
	@IsString()
	lastName: string
	
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	password: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	email: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	phone: string

	@ApiProperty()
	@IsString()
	@IsEnum(UserType)
	userType: UserType

}
