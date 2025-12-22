import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionType } from 'src/common/enum/transaction.enum';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}


// export class CreateCategoryDto {
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsIn(Object.values(TransactionType))
//   @IsNotEmpty()
//   type: TransactionType;
// }
