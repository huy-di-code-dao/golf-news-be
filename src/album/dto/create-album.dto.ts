import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LibraryInputDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ example: 'image1.jpg' })
  @IsOptional()
  @IsString()
  path?: string;
}

export class CreateAlbumDto {
  @ApiProperty({ example: 'Album A' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Ảnh sinh nhật' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'folder/album-a/' })
  @IsOptional()
  @IsString()
  path?: string;

  @ApiPropertyOptional({ example: 'image' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    type: [LibraryInputDto],
    example: [
      { path: 'image1.jpg' },
      { path: 'image2.jpg' }
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LibraryInputDto)
  libraries?: LibraryInputDto[];
}

export class UpdateAlbumDto extends CreateAlbumDto {
  @ApiPropertyOptional({
    type: [LibraryInputDto],
    example: [
      { id: 1, path: 'image1_updated.jpg' },
      { path: 'new_image.jpg' }
    ],
  })
  libraries?: LibraryInputDto[];
}
