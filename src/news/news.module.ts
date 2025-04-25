// news.module.ts
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [NewsController],
  providers: [NewsService, PrismaService],
})
export class NewsModule {}
