import { MiddlewareConsumer, Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { ApiKeyMiddleware } from 'src/middlewares/api-key.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('notes');
  }
}
