import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePageDto) {
    const data: Prisma.PageCreateInput = {
      title: dto.title,
      description: dto.description ?? null,
      property: dto.property ?? null,
      alias: dto.alias ?? null,
      content: dto.content ?? null,
      mainImage: dto.mainImage ?? null,
    };

    return await this.prisma.page.create({ data });
  }

  async findAll() {
    return await this.prisma.page.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.page.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdatePageDto) {
    const data: Prisma.PageUpdateInput = {
      title: dto.title,
      description: dto.description ?? null,
      property: dto.property ?? null,
      alias: dto.alias ?? null,
      content: dto.content ?? null,
      mainImage: dto.mainImage ?? null,
    };

    return await this.prisma.page.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prisma.page.delete({ where: { id } });
  }

  async findBySlug(slug: string) {
    return await this.prisma.page.findUnique({
      where: { alias: slug },
    });
  }

  async getPagesWithProperties(aliases: string[]) {
    const pages = await this.prisma.page.findMany({
      where: {
        alias: {
          in: aliases,
        },
      },
    });
  
    if (!pages.length) {
      throw new NotFoundException('Không tìm thấy các page yêu cầu');
    }
  
    const totalEvents = await this.prisma.event.count();
  
    return {
      listPage: pages,
      totalEvents,
    };
  }
}
