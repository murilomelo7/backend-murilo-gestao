import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({
    description: 'Name of the account',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
