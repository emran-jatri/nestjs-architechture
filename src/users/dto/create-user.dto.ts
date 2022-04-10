import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	age: number;

	@ApiProperty()
	phone: number

}
