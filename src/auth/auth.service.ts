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
		

		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(user,{secret: 'accessToken', expiresIn: '1d'}),
			this.jwtService.signAsync(user,{secret: "refreshToken", expiresIn: '7d'})
		])
    return {
      accessToken,
      refreshToken,
    };
	}

	async refreshToken(refreshTokenDto) {

		const userData = await this.jwtService.verifyAsync(refreshTokenDto.token, {secret:"refreshToken"})		

		const user: User = await this.usersService.findByUsername(userData.username)

		if (!user) {
			throw new UnauthorizedException("Invalid credentials!")
		}

		delete user.password
		

		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(user,{secret: 'accessToken', expiresIn: '1d'}),
			this.jwtService.signAsync(user,{secret: "refreshToken", expiresIn: '7d'})
		])
    return {
      accessToken,
      refreshToken,
    };
	}
	
}
