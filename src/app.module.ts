import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from './modules/account/account.module';
import { CategoryModule } from './modules/category/category.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { RecurringTransactionModule } from './modules/recurring-transaction/recurring-transaction.module';
import { InstallmentModule } from './modules/installment/installment.module';

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
