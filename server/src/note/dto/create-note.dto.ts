import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  content: string;
}
