import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { TransactionType } from 'src/common/enum/transaction.enum';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: TransactionType,
    description: 'Type of transaction: INCOME or EXPENSE',
  })
  @IsIn(Object.values(TransactionType))
  @IsNotEmpty()
  type: TransactionType;
}
