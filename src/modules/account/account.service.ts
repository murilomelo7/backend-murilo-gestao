import { Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string, userId: string): Promise<Account | null> {
    return this.prismaService.account.findUnique({ where: { id, userId } });
  }
}
