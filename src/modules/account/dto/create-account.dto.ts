import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Name of the account',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Initial balance of the account',
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  balance: number;
}
