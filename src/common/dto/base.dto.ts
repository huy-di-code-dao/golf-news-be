import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class BaseDto {
  @ApiProperty({ description: 'Ngày tạo', example: new Date().toISOString() })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'Ngày cập nhật', example: new Date().toISOString() })
  @IsDate()
  updatedAt: Date;
}
