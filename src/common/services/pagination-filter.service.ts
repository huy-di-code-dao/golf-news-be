// src/common/services/pagination-filter.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterDto } from '../dto/filter.dto';
import { PaginationDto } from '../dto/pagination.dto';

interface PaginationFilterArgs {
  model: any;
  pagination: PaginationDto;
  filter: FilterDto;
  include?: any;
  where?: any;
}

@Injectable()
export class PaginationFilterService {
  constructor(private prisma: PrismaService) {}

  async applyPaginationAndFilter({
    model,
    pagination,
    filter,
    include,
    where,
  }: PaginationFilterArgs) {
    const { page = 1, perPage = 20 } = pagination;
    const { sortBy, order, filters } = filter;

    // Xây dựng phần điều kiện WHERE cho Prisma
    const whereFilter: any = {};
    // biome-ignore lint/complexity/noForEach: <explanation>
    filters.forEach((f) => {
      if (f.operator === 'contains') {
        whereFilter[f.field] = { contains: f.value, mode: 'insensitive' }; // Sử dụng 'contains' cho tìm kiếm
      } else if (f.operator === 'equals') {
        whereFilter[f.field] = f.value; // Sử dụng 'equals' cho so sánh chính xác
      } else {
        whereFilter[f.field] = f.value; // Mặc định sử dụng 'equals'
      }
    });

    // Truy vấn dữ liệu với pagination và filter
    const data = await model.findMany({
      where: {
        ...whereFilter,
        ...where,
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        [sortBy]: order, // Sắp xếp theo trường `sortBy` với thứ tự `order`
      },
      include,
    });

    const total = await model.count({
      where: {
        ...whereFilter,
        ...where,
      },
    });

    return {
      data,
      meta: {
        currentPage: page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}
