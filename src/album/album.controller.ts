import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Albums')
@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo album mới' })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách album' })
  findAll(
    @Query('keyword') keyword?: string,
  ) {
    return this.albumService.findAll(keyword);
  }

  @Get('admin')
  @ApiOperation({ summary: 'Danh sách album' })
  findAllAdmin(
    @Query('keyword') keyword?: string,
  ) {
    return this.albumService.findAllAdmin(keyword);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết album' })
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật album' })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa album' })
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
