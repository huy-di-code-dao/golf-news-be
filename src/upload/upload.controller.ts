import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('files')
  @ApiOperation({ summary: 'Upload nhiều file lên S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploadMultipleFiles(files);
  }
}
