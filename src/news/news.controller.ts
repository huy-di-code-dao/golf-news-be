import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from '@prisma/client';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo bài viết mới' })
  @ApiBody({ type: CreateNewsDto })
  @ApiResponse({ status: 201, description: 'Bài viết đã được tạo', type: CreateNewsDto })
  create(@Body() data: CreateNewsDto): Promise<News> {
    return this.newsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả bài viết' })
  @ApiResponse({ status: 200, description: 'Danh sách bài viết', type: [CreateNewsDto] })
  findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết bài viết theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Chi tiết bài viết', type: CreateNewsDto })
  findOne(@Param('id') id: string): Promise<News> {
    return this.newsService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật bài viết' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateNewsDto })
  @ApiResponse({ status: 200, description: 'Bài viết đã được cập nhật' })
  update(@Param('id') id: string, @Body() data: UpdateNewsDto): Promise<News> {
    return this.newsService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá bài viết' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Bài viết đã bị xoá' })
  remove(@Param('id') id: string): Promise<News> {
    return this.newsService.remove(Number(id));
  }
}
