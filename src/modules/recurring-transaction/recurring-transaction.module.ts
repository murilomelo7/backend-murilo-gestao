import { Module } from '@nestjs/common';
import { RecurringTransactionService } from './recurring-transaction.service';
import { RecurringTransactionController } from './recurring-transaction.controller';

@Module({
  providers: [RecurringTransactionService],
  controllers: [RecurringTransactionController]
})
export class RecurringTransactionModule {}
