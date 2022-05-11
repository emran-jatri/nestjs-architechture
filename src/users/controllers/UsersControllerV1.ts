import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, Version } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permissions } from 'src/common/constants';
import { HasPermission, Public } from 'src/common/decorators';
import { PagenateDto } from 'src/common/dtos';
import { UserType } from 'src/common/enums/UserType';
import { IsType } from '../../common/decorators/UserTypeDecorator';
import { CreateUserDto, UpdateUserDto } from '../dtos';

import { UsersServiceV1 } from '../services';

@ApiBearerAuth()
@Controller({
	path: 'users',
  // version: '1',
})
export class UsersControllerV1 {
	constructor(private readonly usersServiceV1: UsersServiceV1) {}
	
	@Public()
	// @Version('2')
	// @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
		const user = await this.usersServiceV1.create(createUserDto);
		return user
  }


	@IsType(UserType.ADMIN)
	@HasPermission(Permissions.Admin.USER_WRITE)
	@Get()
	// @UsePipes(new ValidationPipe({ whitelist: false}))
	findAll(@Req() req, @Query() pagenateDto: PagenateDto) {
    return this.usersServiceV1.findAll(pagenateDto);
  }

	// @MongooseClassSerializerInterceptor( UserDto )
  @Get(':id')
  async findOne(@Param('id') id: string) {
		const user = await this.usersServiceV1.findOne(id);
		if (!user) {
			throw new NotFoundException()
		}
		return user
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersServiceV1.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersServiceV1.remove(id);
  }
}
