import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { AccountModule } from 'src/modules/account/account.module';
import { CategoryModule } from 'src/modules/category/category.module';

@Module({
  imports: [PrismaModule, AccountModule, CategoryModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
