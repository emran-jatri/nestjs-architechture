import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from "argon2";
import { PaginateModel } from 'mongoose';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { User, UserDocument } from '../entities/UserEntity';

@Injectable()
export class UsersServiceV1 {

	constructor(@InjectModel(User.name) private userModel: PaginateModel<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
		try {
			
			// const saltOrRounds = 10;
			// createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
			createUserDto.password = await argon2.hash(createUserDto.password);
	
			const createdUser = new this.userModel(createUserDto);
			return createdUser.save();
		} catch (error) {
			throw new HttpException(error ? error.message : "Something went wrong!", HttpStatus.INTERNAL_SERVER_ERROR)
		}

  }

	findAll(userPagenateDto) {
		const query = {}
		const options = { page: userPagenateDto.page, limit: userPagenateDto.limit}
		return this.userModel.paginate(query, options);
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findById(id)
	}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username}).lean()
	}

	async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).lean()
	}


	async update(id: string, updateUserDto: UpdateUserDto) {
		try {
			if (updateUserDto.password) {
				updateUserDto.password = await argon2.hash(updateUserDto.password);
			}
			return this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true, runValidators: true, select: '-password' });
			
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
  }

	async remove(id: string) {
		const user = await this.userModel.findByIdAndDelete(id);
		if (!user) {
			throw new HttpException("User not found!", HttpStatus.NOT_FOUND)
		}
			
		return user
	}
}
