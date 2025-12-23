import { Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateAccountDto, userId: string): Promise<Account> {
    return this.prismaService.account.create({
      data: {
        name: dto.name,
        balance: dto.balance,
        userId: userId,
      },
    });
  }

  async update(id: string, dto: UpdateAccountDto, userId: string) {
    return await this.prismaService.account.updateMany({
      where: { id, userId },
      data: {
        name: dto.name,
      },
    });
  }

  async findById(id: string, userId: string): Promise<Account | null> {
    return this.prismaService.account.findUnique({ where: { id, userId } });
  }

  async findAll(userId: string): Promise<Account[]> {
    return this.prismaService.account.findMany({ where: { userId } });
  }
}
