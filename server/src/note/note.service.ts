import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel, ModelDefinition } from '@nestjs/mongoose';
import { NoteEntity } from './entities/note.entity';
import { Model } from 'mongoose';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(NoteEntity.name) private noteModel: Model<NoteEntity>,
  ) {}

  async create(
    userId: string,
    createNoteDto: CreateNoteDto,
  ): Promise<NoteEntity> {
    const note = new this.noteModel(createNoteDto);
    note.userId = userId;
    return note.save();
  }

  async findAll(userId: string): Promise<NoteEntity[]> {
    return this.noteModel.find({ userId });
  }

  async findOne(id: string, userId: string): Promise<NoteEntity> {
    return this.noteModel.findOne({ _id: id, userId });
  }

  async update(id: string, userId: string, updateNoteDto: UpdateNoteDto) {
    const ack = await this.noteModel.updateOne(
      { _id: id, userId },
      { ...updateNoteDto },
    );

    if (ack.modifiedCount) return await this.noteModel.findById(id);
    throw new HttpException('No note found!', HttpStatus.BAD_REQUEST);
  }

  async remove(id: string, userId: string) {
    return this.noteModel.deleteOne({ _id: id, userId });
  }
}
