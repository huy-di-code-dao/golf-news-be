import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreateNewsDto extends BaseDto {
  @ApiProperty({ description: 'Tiêu đề bài viết' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Mô tả ngắn gọn bài viết' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Đường dẫn (alias) thân thiện với SEO' })
  @IsOptional()
  @IsString()
  alias?: string;

  @ApiPropertyOptional({ description: 'Nội dung chi tiết của bài viết' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'Ảnh chính của bài viết' })
  @IsOptional()
  @IsString()
  mainImage?: string;
}
