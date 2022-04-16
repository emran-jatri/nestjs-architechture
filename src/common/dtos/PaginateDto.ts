
import { ApiProperty } from '@nestjs/swagger';

export class PagenateDto{
	@ApiProperty({default: 1})
// @ApiQuery({default: 1})
	// @Type(() => Number)
	page: number

	@ApiProperty({required: false, default: 10})
	// @Type(() => Number)
	limit: number
}