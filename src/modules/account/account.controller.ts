import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import type { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { AccountService } from './account.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() dto: CreateAccountDto, @CurrentUser() user: JwtPayload) {
    return await this.accountService.create(dto, user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAccountDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return await this.accountService.update(id, dto, user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @Get('all')
  async findAll(@CurrentUser() user: JwtPayload) {
    return await this.accountService.findAll(user.sub);
  }
}
