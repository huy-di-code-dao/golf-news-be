import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAlbumDto) {
    const { libraries, ...albumData } = dto;
  
    const album = await this.prisma.album.create({
      data: {
        ...albumData,
        libraries: libraries
          ? {
              create: libraries.map((lib) => ({
                path: lib.path,
              })),
            }
          : undefined,
      },
      include: {
        libraries: true,
      },
    });
  
    return album;
  }
  
  async findAll() {
    return await this.prisma.album.findMany({
      include: {
        libraries: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.album.findUnique({
      where: { id },
      include: {
        libraries: true,
      },
    });
  }

  async update(id: number, dto: UpdateAlbumDto) {
    const { libraries, ...albumData } = dto;
  
    // Bước 1: Xóa những Library không còn
    if (libraries) {
      const existing = await this.prisma.library.findMany({
        where: { albumId: id },
      });
  
      const incomingIds = libraries.filter((lib) => lib.id).map((lib) => lib.id);
      const toDelete = existing.filter((lib) => !incomingIds.includes(lib.id));
  
      await this.prisma.library.deleteMany({
        where: { id: { in: toDelete.map((lib) => lib.id) } },
      });
  
      // Bước 2: Cập nhật hoặc tạo mới
      for (const lib of libraries) {
        if (lib.id) {
          await this.prisma.library.update({
            where: { id: lib.id },
            data: {
              path: lib.path,
            },
          });
        } else {
          await this.prisma.library.create({
            data: {
              path: lib.path,
              albumId: id,
            },
          });
        }
      }
    }
  
    // Bước 3: Cập nhật Album chính
    const album = await this.prisma.album.update({
      where: { id },
      data: albumData,
      include: {
        libraries: true,
      },
    });
  
    return album;
  }

  async remove(id: number) {
    return await this.prisma.album.delete({
      where: { id },
    });
  }
}
