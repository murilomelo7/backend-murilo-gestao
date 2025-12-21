import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from 'generated/prisma/client';
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    const data: Prisma.CategoryCreateInput = {
      name: createCategoryDto.name,
      type: createCategoryDto.type,
      user: { connect: { id: userId } },
    };
    return this.prismaService.category.create({ data });
  }
}
