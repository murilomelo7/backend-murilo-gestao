import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import type { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@UseGuards(AuthGuard, RolesGuard)
@Controller('account')
export class AccountController {
  constructor() {}
}
