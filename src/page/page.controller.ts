// src/page/page.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PageService } from './page.service';

@Controller('Page')
@ApiTags('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo bài viết mới' })
  create(@Body() dto: CreatePageDto) {
    return this.pageService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả bài viết' })
  findAll() {
    return this.pageService.findAll();
  }
  
  @Get(':identifier')
  @ApiOperation({ summary: 'Lấy thông tin bài viết theo ID hoặc Alias' })
  @ApiParam({ name: 'identifier', description: 'ID hoặc Alias của bài viết', type: String })
  findOne(@Param('identifier') identifier: string) {
    const id = parseInt(identifier, 10);
  
    // Nếu là số, tìm theo ID; nếu không, tìm theo slug
    if (!isNaN(id)) {
      return this.pageService.findOne(id);
    } else {
      return this.pageService.findBySlug(identifier);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật bài viết' })
  update(@Param('id') id: string, @Body() dto: UpdatePageDto) {
    return this.pageService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa bài viết' })
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }
}
