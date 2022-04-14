import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './../common/guards/JwtAuthGuard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPagenateDto } from './dto/user-paginate.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

	// @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
		const user = await this.usersService.create(createUserDto);
		return user
  }

	@UseGuards(AuthGuard('jwt'))
	@Get()
	// @UsePipes(new ValidationPipe({ whitelist: false}))
	findAll(@Req() req, @Query() userPagenateDto: UserPagenateDto) {
		console.log('----------->', userPagenateDto);
		console.log('req.user ----------->', req.user);

    return this.usersService.findAll(userPagenateDto);
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
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
