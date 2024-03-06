import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteEntity, NoteEntitySchema } from './entities/note.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: NoteEntity.name, schema: NoteEntitySchema },
    ]),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
