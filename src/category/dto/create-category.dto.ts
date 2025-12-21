import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionType } from 'src/common/enum/transaction.enum';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}
