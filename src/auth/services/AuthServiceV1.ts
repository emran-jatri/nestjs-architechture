import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from 'src/users/entities/UserEntity';
import { UsersServiceV1 } from '../../users/services';
import { JwtConstants } from 'src/common/constants';

@Injectable()
export class AuthService {
	constructor(
    private usersServiceV1: UsersServiceV1,
    private jwtService: JwtService
  ) {}


	async login(loginDto) {
		const user: any = await this.usersServiceV1.findByUsername(loginDto.username)

		if (!user) {
			throw new UnauthorizedException("Invalid credentials!")
		}

		// const validUser: boolean =  await bcrypt.compare(loginDto.password, user.password)
		const validUser: boolean = await argon2.verify(user.password, loginDto.password)
		
		if (!validUser) {
			throw new UnauthorizedException("Invalid credentials!")
		}

		delete user.password

		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(user, {
				secret: JwtConstants.ACCESS_TOKEN_SECRET,
				expiresIn: JwtConstants.ACCESS_TOKEN_EXPIRE_IN
			}),
			this.jwtService.signAsync({_id: user._id}, {
				secret: JwtConstants.REFRESH_TOKEN_SECRET,
				expiresIn: JwtConstants.REFRESH_TOKEN_EXPIRE_IN
			})
		])

		const responsePayload = {
			statusCode: HttpStatus.OK,
			message:"Login Successfully!",
      accessToken,
      refreshToken,
		}

		return responsePayload;
	}

	async refreshToken(refreshTokenDto) {

		const userData = await this.jwtService.verifyAsync(refreshTokenDto.token, {secret:JwtConstants.REFRESH_TOKEN_SECRET})

		const user: any = await this.usersServiceV1.findById(userData._id)

		if (!user) {
			throw new UnauthorizedException("Invalid credentials!")
		}

		delete user.password

    const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(user, {
				secret: JwtConstants.ACCESS_TOKEN_SECRET,
				expiresIn: JwtConstants.ACCESS_TOKEN_EXPIRE_IN
			}),
			this.jwtService.signAsync({_id: user._id}, {
				secret: JwtConstants.REFRESH_TOKEN_SECRET,
				expiresIn: JwtConstants.REFRESH_TOKEN_EXPIRE_IN
			})
		])

		const responsePayload = {
			statusCode: HttpStatus.OK,
			message:"Token refresh Successfully!",
      accessToken,
      refreshToken,
		}

		return responsePayload;
	}

}
