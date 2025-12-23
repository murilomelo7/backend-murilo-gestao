import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { type JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(
    @Body() dto: CreateTransactionDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return await this.transactionService.create(dto, user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id/reverse')
  async reverse(@Body('id') id: string, @CurrentUser() user: JwtPayload) {
    return await this.transactionService.reverse(id, user.sub);
  }
}
