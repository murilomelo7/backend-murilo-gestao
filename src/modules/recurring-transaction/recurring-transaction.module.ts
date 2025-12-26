import { Module } from '@nestjs/common';
import { RecurringTransactionService } from './recurring-transaction.service';
import { RecurringTransactionController } from './recurring-transaction.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RecurringTransactionService],
  controllers: [RecurringTransactionController],
  exports: [RecurringTransactionService],
})
export class RecurringTransactionModule {}
