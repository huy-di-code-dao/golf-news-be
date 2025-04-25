import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './event/event.module';
import { NewsModule } from './news/news.module';
import { PageModule } from './page/page.module';
import { PrismaService } from './prisma/prisma.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UploadModule, PageModule, NewsModule, ActivityModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
