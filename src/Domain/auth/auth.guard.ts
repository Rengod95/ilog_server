import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(ctx: ExecutionContext) {
    return super.canActivate(ctx);
  }

  handleRequest(err, user, info) {
    console.log('handle request 진입');

    console.log(err);
    console.log(user);
    console.log(info);

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
