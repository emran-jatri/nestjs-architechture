import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permissions } from 'src/common/constants';
import { HasPermission, Public } from 'src/common/decorators';
import { PagenateDto } from 'src/common/dtos';
import { UserType } from 'src/common/enums/UserType';
import { IsType } from '../common/decorators/UserTypeDecorator';
import { CreateUserDto, UpdateUserDto } from './dtos';

import { UsersService } from './UsersService';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

	@Public()
	// @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
		const user = await this.usersService.create(createUserDto);
		return user
  }


	@IsType(UserType.ADMIN)
	@HasPermission(Permissions.Admin.USER_WRITE)
	@Get()
	// @UsePipes(new ValidationPipe({ whitelist: false}))
	findAll(@Req() req, @Query() pagenateDto: PagenateDto) {
    return this.usersService.findAll(pagenateDto);
  }

	// @MongooseClassSerializerInterceptor( UserDto )
  @Get(':id')
  async findOne(@Param('id') id: string) {
		const user = await this.usersService.findOne(id);
		if (!user) {
			throw new NotFoundException()
		}
		return user
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
