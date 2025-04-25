import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreateActivityDto extends BaseDto {
    @ApiProperty({ example: 'Hoạt động 1', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ example: 'Mô tả hoạt động', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 'hoat-dong-1', required: false })
    @IsOptional()
    @IsString()
    alias?: string;

    @ApiProperty({ example: 'Nội dung hoạt động', required: false })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty({ example: 'https://domain.com/image.jpg', required: false })
    @IsOptional()
    @IsString()
    mainImage?: string;
}
