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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from 'generated/prisma/client';
import type { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(
    @Body() dto: CreateCategoryDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Category> {
    return this.categoryService.create(dto, user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @Get('find-all')
  async findAll(@CurrentUser() user: JwtPayload): Promise<Category[]> {
    return this.categoryService.findAll(user.sub);
  }
}
