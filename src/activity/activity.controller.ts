import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from '@prisma/client';

@ApiTags('Activity')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo hoạt động mới' })
  @ApiBody({ type: CreateActivityDto })
  @ApiResponse({ status: 201, description: 'Hoạt động được tạo', type: CreateActivityDto })
  create(@Body() data: CreateActivityDto): Promise<Activity> {
    return this.activityService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả hoạt động' })
  @ApiResponse({ status: 200, description: 'Danh sách hoạt động', type: [CreateActivityDto] })
  findAll(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết hoạt động theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Chi tiết hoạt động', type: CreateActivityDto })
  findOne(@Param('id') id: string): Promise<Activity> {
    return this.activityService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật hoạt động' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateActivityDto })
  @ApiResponse({ status: 200, description: 'Hoạt động đã được cập nhật' })
  update(@Param('id') id: string, @Body() data: UpdateActivityDto): Promise<Activity> {
    return this.activityService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá hoạt động' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Hoạt động đã bị xoá' })
  remove(@Param('id') id: string): Promise<Activity> {
    return this.activityService.remove(Number(id));
  }
}
