import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ActivityCreateInput) {
    return await this.prisma.activity.create({ data });
  }

  async findAll() {
    return await this.prisma.activity.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.activity.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.ActivityUpdateInput) {
    return await this.prisma.activity.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.activity.delete({
      where: { id },
    });
  }
}
