
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

export class UserPagenateDto{
	@ApiProperty({default: 1})
	// @Type(() => Number)
	page: number

	@ApiProperty({required: false, default: 10})
	// @Type(() => Number)
	limit: number
}