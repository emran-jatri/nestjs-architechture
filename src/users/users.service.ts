import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { PaginateModel } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserPagenateDto } from './dto/user-paginate.dto';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User.name) private userModel: PaginateModel<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
		const saltOrRounds = 10;
		createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
		const createdUser = new this.userModel(createUserDto);
		// return createdUser.save();
		const newUser: any = await createdUser.save();
		const {password, ...responseUser } = newUser._doc
		return responseUser
		
  }

	findAll(userPagenateDto) {
		// console.log(userPagenateDto, typeof userPagenateDto.page, typeof userPagenateDto.limit);
		
		const query = {}
		const options = { page: userPagenateDto.page, limit: userPagenateDto.limit, select: '-password'}
		return this.userModel.paginate(query, options);
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).select('-password')
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
