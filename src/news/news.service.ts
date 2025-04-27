import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationFilterService } from 'src/common/services/pagination-filter.service';
import { paginationAndFilter } from 'src/common/utils/paginationAndFilter';
import { PrismaService } from 'src/prisma/prisma.service'; // Giả sử bạn có PrismaService

@Injectable()
export class NewsService {
  constructor(
    private readonly prisma: PrismaService,
    private paginationFilterService: PaginationFilterService,
  ) {}
  private include = {};

  async create(data: Prisma.NewsCreateInput) {
    return await this.prisma.news.create({ data });
  }

  async findAll(query: any) {
    const { pagination, filter, language, keyword } =
      paginationAndFilter(query);
    const where: any = { language };

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ];
    }
    return this.paginationFilterService.applyPaginationAndFilter({
      model: this.prisma.news,
      pagination,
      filter,
      where,
      include: this.include,
    });
  }

  async findAllAdmin(query: any) {
    const { pagination, filter, language, keyword } =
      paginationAndFilter(query);
    const where: any = { language };

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ];
    }
    return this.paginationFilterService.applyPaginationAndFilter({
      model: this.prisma.news,
      pagination,
      filter,
      where,
      include: this.include,
    });
  }

  async findOne(id: number) {
    return await this.prisma.news.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return await this.prisma.news.findUnique({
      where: { alias: slug },
    });
  }

  async update(id: number, data: Prisma.NewsUpdateInput) {
    return await this.prisma.news.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.news.delete({
      where: { id },
    });
  }
}
