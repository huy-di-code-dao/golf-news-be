import { IsOptional, IsString, IsArray, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Summer Trip Album', description: 'Tiêu đề của album' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Album các chuyến đi mùa hè', required: false, description: 'Mô tả ngắn cho album' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://domain.com/cover.jpg', required: false, description: 'URL ảnh bìa của album' })
  @IsOptional()
  @IsString()
  coverPhoto?: string;

  @ApiProperty({ 
    example: ['https://domain.com/video1.mp4', 'https://domain.com/video2.mp4'], 
    required: false,
    description: 'Danh sách URL các video'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videos?: string[];

  @ApiProperty({ 
    example: ['https://domain.com/image1.jpg', 'https://domain.com/image2.jpg'], 
    required: false,
    description: 'Danh sách URL các hình ảnh'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}