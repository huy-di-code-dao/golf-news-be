// activity.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Prisma } from '@prisma/client';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() data: Prisma.ActivityCreateInput) {
    return this.activityService.create(data);
  }

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ActivityUpdateInput) {
    return this.activityService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(Number(id));
  }
}