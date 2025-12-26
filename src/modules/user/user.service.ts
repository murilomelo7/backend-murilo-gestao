import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class UserService {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(data: Prisma.UserCreateInput): Promise<User> {
    if (await this.findByEmail(data.email)) {
      throw new HttpException('Email já está sendo utilizado.', 400);
    }

    return await this.prismaService.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }
}
