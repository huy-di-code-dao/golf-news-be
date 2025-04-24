// src/page/dto/create-page.dto.ts
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreatePageDto extends BaseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @ApiPropertyOptional({ description: 'Mô tả ngắn gọn Trang Page/Introduction' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @ApiPropertyOptional({ description: 'Lưu các thuộc tính của trang: các link,...' })
  @IsString()
  @IsOptional()
  property?: string;

  @ApiProperty({ required: false })
  @ApiPropertyOptional({ description: 'Em define 2 slug page là `home` và `introduction`, anh lưu home page thì anh gửi giúp em cái slug page lên nhé.' })
  @IsString()
  @IsOptional()
  alias?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mainImage?: string;
}
