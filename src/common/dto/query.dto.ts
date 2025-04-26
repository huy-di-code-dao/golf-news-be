import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'vi', description: 'Ngôn ngữ album' })
  language?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'summer', description: 'Từ khóa tìm kiếm' })
  keyword?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, example: 1, description: 'Trang hiện tại' })
  page?: number = 1; // default là 1

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: false, example: 10, description: 'Số lượng mỗi trang' })
  perPage?: number = 10; // default là 10
}
