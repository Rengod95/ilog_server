import { CreateUserDto } from './dto/CreateUserDto';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';

export interface AuthServiceInterface {
  createAccessToken?: (...args: any[]) => any;
  createRefreshToken?: (...args: any[]) => any;
}

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  public async createAccessToken(createUserDto: CreateUserDto) {
    const { userId, username } = createUserDto;
    // const user = this.userService.findOne();
    // console.log(user);
    console.log(userId);

    const generated = await this.jwtService.signAsync({ userId, username });
    console.log('auth service- create access token:', generated);
    return { access_token: generated };
  }
}
