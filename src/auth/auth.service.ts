import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async login(loginDto) {

		const user: User = await this.usersService.findByUsername(loginDto.username)

		if (!user) {
			throw new UnauthorizedException("Invalid credentials!")
		}

		const validUser: boolean =  await bcrypt.compare(loginDto.password, user.password)

		if (!validUser) {
			throw new UnauthorizedException("Invalid credentials!")
		}

		delete user.password
		

		const [access_token, refresh_token] = await Promise.all([
			this.jwtService.signAsync(user,{secret: 'access_token', expiresIn: '1d'}),
			this.jwtService.signAsync(user,{secret: "refresh_token", expiresIn: '7d'})
		])
    return {
      access_token,
      refresh_token,
    };
  }
}
