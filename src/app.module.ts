import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { RecurringTransactionModule } from './recurring-transaction/recurring-transaction.module';
import { InstallmentModule } from './installment/installment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    AccountModule,
    CategoryModule,
    TransactionModule,
    RecurringTransactionModule,
    InstallmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
