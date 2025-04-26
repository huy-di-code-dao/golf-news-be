import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from '@prisma/client';
import { QueryDto } from 'src/common/dto/query.dto';

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
  findAll(@Query() query: QueryDto) {
    return this.newsService.findAll(query);
  }

  
  @Get('admin')
  @ApiOperation({ summary: 'Lấy danh sách tất cả bài viết by admin' })
  @ApiResponse({ status: 200, description: 'Danh sách bài viết', type: [CreateNewsDto] })
  findAllAdmin(@Query() query: QueryDto) {
    return this.newsService.findAllAdmin(query);
  }

  @Get(':identifier')
  @ApiOperation({ summary: 'Lấy thông tin bài viết theo ID hoặc Alias' })
  @ApiParam({ name: 'identifier', description: 'ID hoặc Alias của bài viết', type: String })
  findOne(@Param('identifier') identifier: string) {
    const id = parseInt(identifier, 10);
  
    // Nếu là số, tìm theo ID; nếu không, tìm theo slug
    if (!isNaN(id)) {
      return this.newsService.findOne(id);
    } else {
      return this.newsService.findBySlug(identifier);
    }
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
