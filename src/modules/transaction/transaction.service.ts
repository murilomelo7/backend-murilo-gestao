import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CategoryService } from 'src/modules/category/category.service';
import { AccountService } from 'src/modules/account/account.service';
import { TransactionType } from 'generated/prisma/enums';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
    private readonly accountService: AccountService,
  ) {}

  async create(dto: CreateTransactionDto, userId: string) {
    const [category, account] = await Promise.all([
      this.categoryService.findById(dto.categoryId, userId),
      this.accountService.findById(dto.accountId, userId),
    ]);

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    return await this.prismaService.$transaction(async (tx) => {
      const amount = new Prisma.Decimal(dto.amount);

      const transaction = await tx.transaction.create({
        data: {
          type: dto.type,
          description: dto.description,
          amount: amount,
          date: dto.date,
          user: { connect: { id: userId } },
          category: { connect: { id: dto.categoryId } },
          account: { connect: { id: dto.accountId } },
        },
      });

      const balanceChange =
        dto.type === TransactionType.INCOME ? amount : amount.neg();

      await tx.account.update({
        where: { id: dto.accountId },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });

      return transaction;
    });
  }

  async reverse(id: string, userId: string) {
    const original = await this.findById(id, userId);

    if (!original) {
      throw new NotFoundException('Transação original não encontrada');
    }

    const alreadyReversed = await this.findByReversedFromId(id, userId);
    if (alreadyReversed) {
      throw new NotFoundException('Transação já foi revertida');
    }

    return await this.prismaService.$transaction(async (tx) => {
      const reverseType =
        original.type === TransactionType.INCOME
          ? TransactionType.EXPENSE
          : TransactionType.INCOME;

      const reversedTransaction = await tx.transaction.create({
        data: {
          userId,
          accountId: original.accountId,
          categoryId: original.categoryId,
          type: reverseType,
          amount: original.amount,
          description: `Estorno: ${original.description ?? ''}`,
          date: new Date(),
          reversedFromId: original.id,
        },
      });

      const balanceChange =
        original.type === TransactionType.INCOME
          ? original.amount
          : original.amount.neg();

      await tx.account.update({
        where: { id: original.accountId, userId },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });

      return reversedTransaction;
    });
  }

  async findById(id: string, userId: string) {
    return await this.prismaService.transaction.findFirst({
      where: { id, userId },
    });
  }

  async findByReversedFromId(reversedFromId: string, userId: string) {
    return await this.prismaService.transaction.findFirst({
      where: { reversedFromId, userId },
    });
  }
}
