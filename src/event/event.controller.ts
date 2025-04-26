import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateActivityDto } from './dto/create-event.dto';
import { UpdateActivityDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { QueryDto } from 'src/common/dto/query.dto';

@ApiTags('Activity')
@Controller('activities')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo hoạt động mới' })
  @ApiBody({ type: CreateActivityDto })
  @ApiResponse({ status: 201, description: 'Hoạt động được tạo', type: CreateActivityDto })
  create(@Body() data: CreateActivityDto): Promise<Event> {
    return this.eventService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả hoạt động' })
  @ApiResponse({ status: 200, description: 'Danh sách hoạt động', type: [CreateActivityDto] })
  findAll(@Query() query: QueryDto) {
    return this.eventService.findAll(query);
  }

  @Get('admin')
  @ApiOperation({ summary: 'Lấy tất cả hoạt động by admin' })
  @ApiResponse({ status: 200, description: 'Danh sách hoạt động', type: [CreateActivityDto] })
  findAllTour(@Query() query: QueryDto) {
    return this.eventService.findAllAdmin(query);
  }

  @Get(':identifier')
  @ApiOperation({ summary: 'Lấy thông tin bài viết theo ID hoặc slug' })
  @ApiParam({ name: 'identifier', description: 'ID hoặc slug của bài viết', type: String })
  findOne(@Param('identifier') identifier: string) {
    const id = parseInt(identifier, 10);
  
    // Nếu là số, tìm theo ID; nếu không, tìm theo slug
    if (!isNaN(id)) {
      return this.eventService.findOne(id);
    } else {
      return this.eventService.findBySlug(identifier);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật hoạt động' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateActivityDto })
  @ApiResponse({ status: 200, description: 'Hoạt động đã được cập nhật' })
  update(@Param('id') id: string, @Body() data: UpdateActivityDto): Promise<Event> {
    return this.eventService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá hoạt động' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Hoạt động đã bị xoá' })
  remove(@Param('id') id: string): Promise<Event> {
    return this.eventService.remove(Number(id));
  }
}
