
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class GetListPagesDto {
  @ApiProperty({
    type: [String],
    example: ['introduce', 'about-us', 'contact'],
    description: 'Danh sách alias cần lấy thông tin',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  aliases: string[];
}
