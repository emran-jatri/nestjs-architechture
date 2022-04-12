import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { PaginateModel } from 'mongoose';

@Injectable()
export class AuthService {

	constructor(@InjectModel(User.name) private userModel: PaginateModel<UserDocument>) {}


  login(loginDto) {
    return loginDto
  }
}
