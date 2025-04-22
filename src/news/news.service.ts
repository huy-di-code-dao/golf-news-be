import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Giả sử bạn có PrismaService
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.NewsCreateInput) {
    return await this.prisma.news.create({ data });
  }

  async findAll() {
    return await this.prisma.news.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.news.findUnique({
      where: { id },
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
