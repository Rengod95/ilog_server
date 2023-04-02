import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [ImagesModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
