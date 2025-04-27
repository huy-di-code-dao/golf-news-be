import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationFilterService } from 'src/common/services/pagination-filter.service';
import { paginationAndFilter } from 'src/common/utils/paginationAndFilter';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private paginationFilterService: PaginationFilterService,
  ) {}
  private include = {};

  async create(data: Prisma.EventCreateInput) {
    return await this.prisma.event.create({ data });
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
      model: this.prisma.event,
      pagination,
      filter,
      where,
      include: this.include,
    });
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
      model: this.prisma.event,
      pagination,
      filter,
      where,
      include: this.include,
    });
  }

  async findOne(id: number) {
    return await this.prisma.event.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return await this.prisma.event.findUnique({
      where: { alias: slug },
    });
  }

  async update(id: number, data: Prisma.EventUpdateInput) {
    return await this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.event.delete({
      where: { id },
    });
  }
}
