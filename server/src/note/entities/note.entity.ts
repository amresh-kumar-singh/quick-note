import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, now } from 'mongoose';

export type NoteDocument = NoteEntity & Document;

@Schema({ timestamps: true })
export class NoteEntity {
  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const NoteEntitySchema = SchemaFactory.createForClass(NoteEntity);
