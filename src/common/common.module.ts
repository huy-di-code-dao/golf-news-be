// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { PaginationFilterService } from './services/pagination-filter.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PaginationFilterService, PrismaService],
  exports: [PaginationFilterService], // Export service để sử dụng ở các module khác
})
export class CommonModule {}
