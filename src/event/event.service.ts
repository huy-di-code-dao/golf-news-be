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

  async findAll(query: any) {
    const { pagination, filter } = paginationAndFilter(query);
    const where = {};
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
