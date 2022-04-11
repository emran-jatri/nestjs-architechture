import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { response } from 'express';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User.name) private userModel: PaginateModel<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
		const saltOrRounds = 10;
		createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
		const createdUser = new this.userModel(createUserDto);
		const newUser: any = await createdUser.save();
		const {password, ...responseUser } = newUser._doc
		
		return responseUser
		
  }

  findAll() {
		return this.userModel.paginate({page: 1, limit: 10});
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
