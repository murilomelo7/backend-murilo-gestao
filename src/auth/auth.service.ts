import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  async signUp(data: Prisma.UserCreateInput) {
    return await this.userService.create(data);
  }
}
