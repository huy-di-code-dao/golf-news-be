import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AlbumDto } from 'src/common/dto/query.dto';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

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
  findAll(@Query() query: AlbumDto) {
    return this.albumService.findAll(query);
  }

  @Get('admin')
  @ApiOperation({ summary: 'Danh sách album' })
  findAllTour(@Query() query: AlbumDto) {
    return this.albumService.findAllAdmin(query);
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
