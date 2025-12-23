import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
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

  async findAll(userId: string): Promise<Category[]> {
    return this.prismaService.category.findMany({ where: { userId } });
  }

  async findById(id: string, userId: string): Promise<Category | null> {
    return this.prismaService.category.findUnique({ where: { id, userId } });
  }
}
