import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageModule } from './page/page.module';
import { PrismaService } from './prisma/prisma.service';
import { UploadModule } from './upload/upload.module';
import { NewsModule } from './news/news.module';
import { ActivityModule } from './event/event.module';

@Module({
  imports: [UploadModule, PageModule, NewsModule, ActivityModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
