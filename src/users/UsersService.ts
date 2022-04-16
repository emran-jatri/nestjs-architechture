import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from "argon2";
import { PaginateModel } from 'mongoose';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { User, UserDocument } from './entities/UserEntity';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User.name) private userModel: PaginateModel<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
		const saltOrRounds = 10;
		// createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
		createUserDto.password = await argon2.hash(createUserDto.password);
		console.log('------>', createUserDto);

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
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username}).lean()
	}


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
