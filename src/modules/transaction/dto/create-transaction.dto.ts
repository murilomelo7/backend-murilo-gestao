import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from 'generated/prisma/enums';

export class CreateTransactionDto {
  @ApiProperty({
    enum: TransactionType,
    description: 'Type of transaction: INCOME or EXPENSE',
  })
  @IsIn(Object.values(TransactionType))
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({
    description: 'Description of the transaction',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Amount of the transaction',
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @ApiProperty({
    description: 'Date of the transaction',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Category ID of the transaction',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    description: 'Account ID of the transaction',
  })
  @IsUUID()
  @IsNotEmpty()
  accountId: string;
}
