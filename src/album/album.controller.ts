import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('api/albums')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới Album' })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách Album kèm Library' })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết Album theo ID (gồm thư viện)' })
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật Album' })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa Album' })
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
