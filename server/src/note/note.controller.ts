import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ExpressRequest } from 'src/middleware/auth.middleware';
import { Authenticate } from 'src/utils/Authenticate.decorator';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  // Authenticate Decorator is made with assumption that first args in method is of type request
  @Authenticate()
  create(
    @Request() request: ExpressRequest,
    @Body(ValidationPipe) createNoteDto: CreateNoteDto,
  ) {
    const userId = request.user._id;
    return this.noteService.create(userId, createNoteDto);
  }

  // Find All is used to fetch all notes of current user
  @Get()
  @Authenticate()
  findAll(@Request() request: ExpressRequest) {
    const userId = request.user._id;
    return this.noteService.findAll(userId);
  }

  @Get(':id')
  @Authenticate()
  findOne(@Request() request: ExpressRequest, @Param('id') id: string) {
    const userId = request.user._id;
    return this.noteService.findOne(id, userId);
  }

  @Patch(':id')
  @Authenticate()
  update(
    @Request() request: ExpressRequest,
    @Param('id') id: string,
    @Body(ValidationPipe) updateNoteDto: UpdateNoteDto,
  ) {
    const userId = request.user._id;
    return this.noteService.update(id, userId, updateNoteDto);
  }

  @Delete(':id')
  @Authenticate()
  remove(@Request() request: ExpressRequest, @Param('id') id: string) {
    const userId = request.user._id;
    return this.noteService.remove(id, userId);
  }
}
