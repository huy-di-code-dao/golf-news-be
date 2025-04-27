import { Injectable } from '@nestjs/common';
import { PaginationFilterService } from 'src/common/services/pagination-filter.service';
import { paginationAndFilter } from 'src/common/utils/paginationAndFilter';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    private paginationFilterService: PaginationFilterService,
  ) {}
  private include = {};

  async create(createAlbumDto: CreateAlbumDto) {
    const { videos, images, ...rest } = createAlbumDto;

    return this.prisma.album.create({
      data: {
        ...rest,
        videos: videos ? JSON.stringify(videos) : undefined,
        images: images ? JSON.stringify(images) : undefined,
      },
    });
  }

  async findAll(query) {
    const { pagination, filter, language, keyword } =
      paginationAndFilter(query);
    const where: any = {};

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    const albums = await this.paginationFilterService.applyPaginationAndFilter({
      model: this.prisma.event,
      pagination,
      filter,
      where,
      include: this.include,
    });

    albums.data.map((album) => ({
      ...album,
      videos: album.videos ? JSON.parse(album.videos) : [],
      images: album.images ? JSON.parse(album.images) : [],
    }));

    return albums;
  }

  async findAllAdmin(query: any) {
    const { pagination, filter, language, keyword } =
      paginationAndFilter(query);
    const where: any = {};

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    const albums = await this.paginationFilterService.applyPaginationAndFilter({
      model: this.prisma.event,
      pagination,
      filter,
      where,
      include: this.include,
    });

    albums.data.map((album) => ({
      ...album,
      videos: album.videos ? JSON.parse(album.videos) : [],
      images: album.images ? JSON.parse(album.images) : [],
    }));

    return albums;
  }

  async findOne(id: number) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) return null;

    return {
      ...album,
      videos: album.videos ? JSON.parse(album.videos) : [],
      images: album.images ? JSON.parse(album.images) : [],
    };
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const { videos, images, ...rest } = updateAlbumDto;

    return this.prisma.album.update({
      where: { id },
      data: {
        ...rest,
        videos: videos ? JSON.stringify(videos) : undefined,
        images: images ? JSON.stringify(images) : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.album.delete({ where: { id } });
  }
}
