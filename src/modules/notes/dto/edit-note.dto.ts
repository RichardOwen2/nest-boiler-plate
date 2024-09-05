import { IsNotEmpty } from "class-validator";


export class EditNoteDto {
  @IsNotEmpty()
  title: string;

  content?: string;
}
